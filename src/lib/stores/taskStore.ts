import { writable } from 'svelte/store';
import type {InsertTask, Task} from "$lib/db/schema";
import {trpc} from "$lib/trpc/client";

function createTaskStore() {
  const { subscribe, set, update } = writable<Task[]>([]);

  return {
    subscribe,
    fetchTasks: async (projectId: number) => {
      const tasks = await trpc().getTasks.query({projectId});
      set(tasks);
    },
    addTask: async (input: InsertTask) => {
      const newTask = await trpc().createTask.mutate(input);
      update(tasks => [...tasks, newTask]);
      return newTask;
    },
    updateTask: async (input: InsertTask) => {
      const updatedTask = await trpc().updateTask.mutate(input.id, {...input});
      update(tasks => tasks.map(t => t.id === input.id ? updatedTask : t));
    },
    deleteTask: async (id: number) => {
      await trpc().deleteTask.mutate({id});
      update(tasks => tasks.filter(t => t.id !== id));
    }
  };
}

export const taskStore = createTaskStore();