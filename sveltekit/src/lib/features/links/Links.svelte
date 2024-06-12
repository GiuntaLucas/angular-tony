<script lang="ts">
  import { Link } from "$lib/interfaces/Link";

  const { links, search, onEdit, onDelete } = $props<{
    links: Link[];
    search: string;
    onEdit: (link: Link) => void;
    onDelete: (id: string) => void;
  }>();

  const linksFiltered = $derived(links.filter((x: Link) => x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
</script>

{#if linksFiltered.length > 0}
  <ul class="menu bg-base-200 rounded-box gap-4">
    {#each linksFiltered as link}
      <li>
        <div class="flex flex-nowrap w-96">
          <div class="grow">{link.name}</div>
          <button onclick={() => onEdit(link)} type="button" class="btn btn-primary btn-outline btn-xs w-14"
            >Edit</button
          >
          <button onclick={() => onDelete(link.businessId)} type="button" class="btn btn-error btn-outline btn-xs w-14"
            >Delete</button
          >
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-sm p-8">No links has been found</p>
{/if}
