import { getCategories } from '$lib/server/links';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const categoryId = url.searchParams.get('category')
	return {
		categories: await getCategories(),
		categoryId
	};
};