<script lang="ts">
  import Dialog from "$lib/features/links/Dialog.svelte";
  import Filter from "$lib/features/links/Filter.svelte";
  import Form from "$lib/features/links/Form.svelte";
  import Links from "$lib/features/links/Links.svelte";
  import type { Link } from "$lib/interfaces/Link";
  import type { PageServerLoad } from "./$types";

  const { data } = $props<{ data: PageServerLoad }>();

  let search = $state("");
  let isOpen = $state(false);
  let selectedLink = $state<Link | undefined>(undefined);

    $effect(() => console.log(selectedLink))

  function handleSearch(value: string) {
    search = value;
  }
  function handleEdit(link: Link) {
    isOpen = true;
    selectedLink = link;
  }
  function handleCloseDialog() {
    isOpen = false;
    selectedLink = undefined;
  }
</script>

<div class="flex flex-col justify-center items-center">
  <div class="flex gap-2 mb-2">
    <Filter search={handleSearch}>
      <button onclick={() => isOpen = true} class="btn btn-primary btn-outline">Create</button>
    </Filter>
  </div>
  <Links {search} links={data.links} edit={handleEdit} />
  <!-- <app-link-list [links]="links()" [search]="search()" (edit)="handleEdit($event)" (delete)="handleDelete($event)" /> -->
</div>

{#if isOpen}
  <Dialog close={handleCloseDialog} >
    <Form link={selectedLink} />
  </Dialog> 
{/if}
<!-- @if (isOpen()) {
  <app-link-dialog (close)="handleCloseDialog()">
    <app-link-form [link]="selectedLink()" (save)="handleSave($event)" />
  </app-link-dialog>
} -->
