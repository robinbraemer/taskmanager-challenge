<script lang="ts">
    import "../app.css";
</script>

<svelte:head>
	<title>TaskManager | Simply Task Management</title>
	<meta
		name="description"
		content="TaskManager is a simple task management system that helps you keep track of your tasks."
	/>
</svelte:head>

<div class="p-6 space-y-6">

<header class="">
    <nav class="space-x-3 font-medium">
        <a href="/" >Home</a>
        <a href="/projects">Projects</a>
    </nav>
</header>

<main>
    <slot/>
</main>

<footer>
    <p>© {new Date().getFullYear()} Task Management System</p>
</footer>
</div>
