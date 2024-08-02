<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { projectStore } from '$lib/stores/projectStore';
  import { taskStore } from '$lib/stores/taskStore';
  import TaskCard from '$lib/components/TaskCard.svelte';
  import TaskForm from '$lib/components/TaskForm.svelte';

  let project = $projectStore.find(p => p.id === parseInt($page.params.id));
  let showForm = false;

  onMount(() => {
    if (!project) {
      projectStore.fetchProjects();
    }
    taskStore.fetchTasks(parseInt($page.params.id));
  });

  $: project = $projectStore.find(p => p.id === parseInt($page.params.id));

  function handleAddTask(event: CustomEvent) {
    const { title, description } = event.detail;
    taskStore.addTask(project.id, title, description);
    showForm = false;
  }

  function handleEditTask(event: CustomEvent) {
    const task = event.detail;
    // Implement edit logic
  }

  function handleDeleteTask(event: CustomEvent) {
    const taskId = event.detail;
    taskStore.deleteTask(taskId);
  }

  function handleUpdateTaskStatus(event: CustomEvent) {
    const { id, status } = event.detail;
    taskStore.updateTask(id, { status });
  }
</script>

{#if project}
  <h1>{project.name}</h1>
  <p>{project.description}</p>

  <h2>Tasks</h2>
  <button on:click={() => showForm = true}>Add Task</button>

  {#if showForm}
    <TaskForm on:submit={handleAddTask} on:cancel={() => showForm = false} />
  {/if}

  {#each $taskStore as task (task.id)}
    <TaskCard
      {task}
      on:edit={handleEditTask}
      on:delete={handleDeleteTask}
      on:updateStatus={handleUpdateTaskStatus}
    />
  {/each}
{:else}
  <p>Loading project...</p>
{/if}