<script lang="ts">
    import {
        Button,
        buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import {Input} from "$lib/components/ui/input/index.js";
    import {Label} from "$lib/components/ui/label/index.js";
    import type {Project} from "$lib/db/schema";
    import {projectStore} from "$lib/stores/projectStore";
    import {goto} from "$app/navigation";

    let project: Project = $state({
        name: 'My Project',
        description: 'This is a project'
    })

    let disabled = $state(false)

    async function submit(e: Event) {
        disabled = true
        const newProject = await projectStore.createProject(project)
        await goto(`/projects/${newProject.id}`)
    }
</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
        Create Project
    </Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Create Project</Dialog.Title>
            <Dialog.Description>

            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">Name</Label>
                <Input id="name" value={project.name} class="col-span-3"/>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="description" class="text-right">Description</Label>
                <Input id="description" value={project.description} class="col-span-3"/>
            </div>
        </div>
        <Dialog.Footer>
            <Button type="submit" onclick={submit}>Create</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>