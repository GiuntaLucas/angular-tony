<script>
  import Toast from "$lib/components/Toast.svelte";
  import "../app.css";

  import { onNavigate } from "$app/navigation";

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Tony showcase | Sveltekit</a>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        ></path></svg
      >
    </button>
  </div>
</div>

<div id="content">
  <slot />
</div>

<!-- <app-toast/> -->
<Toast />
