import type { Toast } from "$lib/interfaces/Toast";
import { writable } from "svelte/store";

export const toast = writable<Toast | undefined>(undefined);