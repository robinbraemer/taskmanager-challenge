// hooks.server.ts
import {createContext} from '$lib/trpc/context';
import type {Handle} from '@sveltejs/kit';
import {createTRPCHandle} from 'trpc-sveltekit';
import {router} from "$lib/trpc/router";

export const handle: Handle = createTRPCHandle({
    router,
    createContext,
});
