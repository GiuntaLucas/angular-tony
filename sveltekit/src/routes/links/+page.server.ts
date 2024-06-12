import { getCategories, getLinks } from '$lib/server/links';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, depends }) => {
	depends('links');
	const categoryId = url.searchParams.get('category');
	return {
		links: await getLinks(categoryId),
		categoryId
	};
};

export const actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();

		const categoryId = String(formData.get('categoryId'));
		const name = String(formData.get('name'));
		const description = String(formData.get('description'));
		const url = String(formData.get('url'));

		try {
			await fetch(`https://back.flyingpad.be/api/v1/links/create`, {
				method: 'POST', headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, description, categoryId, url })
			});
		} catch (error) {
			return fail(500, { message: 'An error occurred' });
		}
		return { message: `${name} has been added` };
	}
} satisfies Actions;