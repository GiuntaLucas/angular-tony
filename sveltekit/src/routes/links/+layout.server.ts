import { getCategories } from '$lib/server/links';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		categories: await getCategories(),
	};
};