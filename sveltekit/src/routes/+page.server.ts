import type { Credential } from "$lib/interfaces/Credential";
import { session } from "$lib/server/session";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, fetch, locals }) => {
    const formData = await request.formData();

    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
      const response = await fetch(`https://back.flyingpad.be/api/V1/Auth/Login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const res = await response.json();
      if(!res.token) {
        return fail(400, { message: 'Credential are wrong' });
      }

      session.token = res.token;
    } catch (error) {
      return fail(500, { message: 'An error occurred' });
    }
    redirect(300, '/links');
  }
} satisfies Actions;