<script lang="ts">
  import Categories from '$lib/features/links/categories.svelte';
  import type { LayoutServerData } from './$types';
  const { data } = $props();

  console.log(data.categories)
</script>

<slot/>

<Categories categories={data.categories}/>
<!-- <app-link-categories [categories]="categories()" /> -->

