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
    const formData = await request.formData();

    const categoryId = String(formData.get('categoryId'));
    const name = String(formData.get('name'));
    const description = String(formData.get('description'));
    const url = String(formData.get('url'));

    try {
      await fetch(`https://back.flyingpad.be/api/v1/links/update`, {
        method: 'POST', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, categoryId, url })
      });
    } catch (error) {
      return fail(500, { message: 'An error occurred' });
    }
    return { message: `${name} has been edited` };
  }
} satisfies Actions;