<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";
  import { Link } from "$lib/interfaces/Link";

  const { links, search, edit } = $props<{
    links: Link[];
    search: string;
    edit: (link: Link) => void;
  }>();

  const linksFiltered = $derived(
    links.filter((x: Link) =>
      x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  );
</script>

{#if linksFiltered.length > 0}
  <ul class="menu bg-base-200 rounded-box gap-4">
    {#each linksFiltered as link}
      <li>
        <div class="flex flex-nowrap w-96">
          <div class="grow">{link.name}</div>
          <button
            onclick={() => edit(link)}
            type="button"
            class="btn btn-primary btn-outline btn-xs w-14">Edit</button
          >
          <form
            method="post"
            action={`/links/${link.businessId}?/delete`}
            use:enhance={() => {
              return async ({ result }) => {
                invalidate("links");
              };
            }}
          >
            <button type="submit" class="btn btn-error btn-outline btn-xs w-14"
              >Delete</button
            >
          </form>
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-sm p-8">No links has been found</p>
{/if}
