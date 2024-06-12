<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { toast } from "$lib/components/toastService.svelte";
</script>

<form
  action="/"
  method="post"
  class="card w-96 bg-base-100 shadow-xl"
  use:enhance={() => {
    return async ({ result }) => {
      if (result.status === 300) {
        goto(result.location);
      } else {
        toast.set({ message: result.data.message, severity: "ERROR" });
      }
    };
  }}
>
  <div class="card-body">
    <h2 class="card-title">Login</h2>
    <div>
      <input
        name="email"
        type="text"
        placeholder="Email"
        class="input w-full max-w-xs"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        class="input w-full max-w-xs"
      />
    </div>
    <div class="card-actions justify-end">
      <button type="submit" class="btn btn-outline btn-primary btn-md"
        >Save</button
      >
    </div>
  </div>
</form>
