import type {Context} from '$lib/trpc/context';
import {initTRPC} from '@trpc/server';
import {z} from "zod";
import {store} from "$lib/db/store";
import {InsertProjectSchema, InsertTaskSchema, SelectProjectSchema} from "$lib/db/schema";

export const t = initTRPC.context<Context>().create();

export const router = t.router({
    getProjects: t.procedure
        .query(async () => {
            return await store.getProjects();
        }),

    createProject: t.procedure
        .input(InsertProjectSchema)
        .mutation(async ({input}) => {
            const [project] = await store.createProject(input);
            return project;
        }),

    updateProject: t.procedure
        .input(InsertProjectSchema)
        .mutation(async ({input}) => {
            const {id, ...updates} = input;
            const [project] = await store.updateProject(id, updates);
            return project;
        }),

    deleteProject: t.procedure
        .input(SelectProjectSchema.pick({id: true}))
        .mutation(async ({input}) => {
            await store.deleteProject(input.id);
            return {success: true};
        }),

    getTasks: t.procedure
        .input(z.object({
            projectId: SelectProjectSchema.pick({id: true})
        }))
        .query(async ({input: projectId}) => {
            return await store.getTasks(projectId);
        }),

    createTask: t.procedure
        .input(InsertTaskSchema)
        .mutation(async ({input}) => {
            const [task] = await store.createTask(input);
            return task;
        }),

    updateTask: t.procedure
        .input(InsertTaskSchema)
        .mutation(async ({input}) => {
            const {id, ...updates} = input;
            const [task] = await store.updateTask(id, updates);
            return task;
        }),

    deleteTask: t.procedure
        .input(z.object({
            id: z.number()
        }))
        .mutation(async ({input: id}) => {
            await store.deleteTask(id);
            return {success: true};
        }),
});

export type Router = typeof router;

