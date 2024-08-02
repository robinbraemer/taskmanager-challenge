<script lang="ts">
    import {onMount} from 'svelte';
    import {projectStore} from '$lib/stores/projectStore';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import CreateProjectDialog from "$lib/components/CreateProjectDialog.svelte";

    onMount(() => {
        projectStore.fetchProjects();
    });

    function handleAddProject(event: CustomEvent) {
        const {name, description} = event.detail;
        projectStore.createProject(name, description);
    }

    function handleEditProject(event: CustomEvent) {
        const project = event.detail;
        // Implement edit logic
    }

    function handleDeleteProject(event: CustomEvent) {
        const projectId = event.detail;
        projectStore.deleteProject(projectId);
    }
</script>

<div class="space-y-6">
    <h1 class="text-xl font-medium">Projects</h1>
    <CreateProjectDialog/>
    <div class="gap-2 grid grid-cols-2">
    {#each $projectStore as project (project.id)}
        <ProjectCard
            {project}
            on:edit={handleEditProject}
            on:delete={handleDeleteProject}
        />
    {/each}
    </div>
</div>

