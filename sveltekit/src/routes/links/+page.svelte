<script lang="ts">
  import Dialog from "$lib/features/links/Dialog.svelte";
  import Filter from "$lib/features/links/Filter.svelte";
  import Links from "$lib/features/links/Links.svelte";
  import type { Link } from "$lib/interfaces/Link";
  import type { PageServerLoad } from "./$types";

  const { data } = $props<{data: PageServerLoad}>();
  let search = $state('');

  function handleEdit(link: Link) {
    console.log(link)
  }

  function handleDelete(id: string) {
    console.log(id)
  }

  function handleSearch(value: string) {
    search = value;
  }
</script>

<div class="flex flex-col justify-center items-center">
  <div class="flex gap-2 mb-2">
    <Filter search={handleSearch}>
      <button class="btn btn-primary btn-outline">Create</button>
    </Filter>
  </div>
  <Links search={search} links={data.links} onEdit={handleEdit} onDelete={handleDelete} />
  <!-- <app-link-list [links]="links()" [search]="search()" (edit)="handleEdit($event)" (delete)="handleDelete($event)" /> -->
</div>

<Dialog />
<!-- @if (isOpen()) {
  <app-link-dialog (close)="handleCloseDialog()">
    <app-link-form [link]="selectedLink()" (save)="handleSave($event)" />
  </app-link-dialog>
} -->
