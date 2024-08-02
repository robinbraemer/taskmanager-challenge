<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type {Task} from "$lib/db/schema";

  export let task: Task;

  const dispatch = createEventDispatcher();

  function editTask() {
    dispatch('edit', task);
  }

  function deleteTask() {
    dispatch('delete', task.id);
  }

  function updateStatus(event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    dispatch('updateStatus', { id: task.id, status });
  }
</script>

<div class="task-card">
  <h4>{task.title}</h4>
  <p>{task.description}</p>
  <select value={task.status} on:change={updateStatus}>
    <option value="TODO">To Do</option>
    <option value="IN_PROGRESS">In Progress</option>
    <option value="DONE">Done</option>
  </select>
  <div class="actions">
    <button on:click={editTask}>Edit</button>
    <button on:click={deleteTask}>Delete</button>
  </div>
</div>

<style>
  .task-card {
    border: 1px solid #ddd;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
</style>