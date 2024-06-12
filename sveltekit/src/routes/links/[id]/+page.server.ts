import { fail, type Actions } from "@sveltejs/kit";

export const actions = {
  delete: async ({ request, params, fetch }) => {
    // TODO log the user in
    const id = params.id;
    if (id === undefined) return fail(400, { message: 'Link id is missing' });
    try {
      await fetch(`https://back.flyingpad.be/api/v1/links/delete/${id}`, { method: 'DELETE' });
    } catch (error) {
      return fail(500, { message: 'An error occurred' });
    }
    return { message: 'Link has been deleted' };
  },
  edit: async ({ request }) => {
    // TODO register the user
  }
} satisfies Actions;