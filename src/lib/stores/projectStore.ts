import { writable } from 'svelte/store';
import {trpc} from "$lib/trpc/client";
import type {InsertProject, Project} from "$lib/db/schema";


function createProjectStore() {
  const { subscribe, set, update } = writable<Project[]>([]);

  return {
    subscribe,
    fetchProjects: async () => {
      const projects = await trpc().getProjects.query()
      set(projects);
    },
    createProject: async (input: InsertProject) => {
      const newProject = await trpc().createProject.mutate(input);
      update(projects => [...projects, newProject]);
      return newProject;
    },
    updateProject: async (input: InsertProject) => {
      const updatedProject = await trpc().updateProject.mutate(input);
      update(projects => projects.map(p => p.id === input.id ? updatedProject : p));
    },
    deleteProject: async (input: Project) => {
      await trpc().deleteProject.mutate(input);
      update(projects => projects.filter(p => p.id !== input.id));
    }
  };
}

export const projectStore = createProjectStore();