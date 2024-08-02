<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import type {Project} from "$lib/db/schema";
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import {FolderKanban} from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";
    import Ellipsis from "lucide-svelte/icons/ellipsis";

    export let project: Project;
</script>

<a href={`/projects/${project.id}`}>

<Card.Root>
    <Card.Header class="flex flex-row items-center gap-4">
		<FolderKanban />
		<Card.Title>{project.name}</Card.Title>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="icon" class="ml-auto">
					<Ellipsis class="h-4 w-4" />
					<span class="sr-only">Toggle menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>Open</DropdownMenu.Item>
				<DropdownMenu.Item>Delete</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Card.Header>

    <Card.Content>
        <Card.Description>{project.description}</Card.Description>
        <p>Created {project.createdAt} by {project.creatorId || 'Unknown'}</p>
    </Card.Content>
</Card.Root>
</a>
