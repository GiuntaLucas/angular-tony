<script lang="ts">
  import Categories from "$lib/features/links/Categories.svelte";
  import type { LayoutServerData } from "./$types";

  const { data } = $props<{ data: LayoutServerData }>();

</script>

<slot />

<Categories {...data} />
