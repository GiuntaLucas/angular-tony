<script lang="ts">
  import { Link } from "$lib/interfaces/Link";

  const { links } = $props<{ links: Link[] }>();
</script>

{#if links.length > 0}
  <ul class="menu bg-base-200 rounded-box gap-4">
    {#each links as link}
      <li>
        <div class="flex flex-nowrap w-96">
          <div class="grow">{link.name}</div>
          <!-- (click)="handleEdit(link)" -->
          <button type="button" class="btn btn-primary btn-outline btn-xs w-14"
            >Edit</button
          >
          <!-- (click)="handleDelete(link.businessId)" -->
          <button type="button" class="btn btn-error btn-outline btn-xs w-14"
            >Delete</button
          >
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-sm p-8">No links has been found</p>
{/if}
