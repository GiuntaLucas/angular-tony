import { session } from '$lib/server/session';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  if (event.locals) {
    request.headers.set('Authorization', `Bearer ${event.locals.token}`)
  }
  return fetch(request)
};

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.token = session.token;
  if (event.url.pathname.startsWith('/links')) {
    if (!session.token) {
      redirect(301, '/');
    }
  } else if (!['/', '/links'].includes(event.url.pathname)) {
    redirect(301, '/');
  }
  else if (event.url.pathname.startsWith('/')) {
    if (session.token) {
      redirect(301, '/links');
    }
  }

  const response = await resolve(event);
  return response;
}