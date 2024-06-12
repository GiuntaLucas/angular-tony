<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  import type { Link } from "$lib/interfaces/Link";

  const { link, save } = $props<{ link: Link, save: () => void }>();
  const isCreate = $derived(link?.businessId === undefined);
  const form = $derived(createForm());
  const formUrl = $derived(
    isCreate ? "/links?/create" : `/links/${link.businessId}?/edit`
  );

  const currentUrl = new URL(window.location.toString());

  function createForm() {
    return {
      name: isCreate ? "" : link.name,
      url: isCreate ? "" : link.url,
      description: isCreate ? "" : link.description,
      categoryId: currentUrl.searchParams.get("category") || "",
      businessId: link?.businessId
    };
  }
</script>

{#if isCreate}
  <h1>Create</h1>
{:else}
  <h1>Edit: {link.name}</h1>
{/if}

<form
  action={formUrl}
  method="post"
  use:enhance={() => {
    return async ({ result }) => {
      invalidate("links");
      save();
    };
  }}
>
  <input
    bind:value={form.name}
    name="name"
    type="text"
    placeholder="Name"
    class="input w-full max-w-xs"
  />
  <input
    bind:value={form.description}
    name="description"
    type="text"
    placeholder="Description"
    class="input w-full max-w-xs"
  />
  <input
    bind:value={form.url}
    name="url"
    type="text"
    placeholder="Url"
    class="input w-full max-w-xs"
  />
  <input
    hidden
    value={form.categoryId}
    name="categoryId"
  />
  <input
    hidden
    value={form.businessId}
    name="businessId"
  />
  <div>
    <button type="submit" class="btn btn-outline btn-primary btn-md"
      >Save</button
    >
  </div>
</form>
