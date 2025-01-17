// lib/trpc/client.ts
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import type {Router} from "$lib/trpc/router";

let browserClient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit): typeof browserClient {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser && browserClient) return browserClient;
  const client = createTRPCClient<Router>({ init });
  if (isBrowser) browserClient = client;
  return client;
}