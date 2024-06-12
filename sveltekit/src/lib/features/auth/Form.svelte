<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
</script>

<form
  action="/"
  method="post"
  class="card w-96 bg-base-100 shadow-xl"
  use:enhance={() => {
    return async ({ result }) => {
      if (result.status === 300) {
        debugger
        goto(result.location);
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
