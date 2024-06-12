<script lang="ts">
  import type { LinkCategoryLight } from "$lib/interfaces/Link";

  const { categories, categoryId } = $props<{
    categories: LinkCategoryLight[];
    categoryId: string | undefined;
  }>();
</script>

<ul class="fixed top-[60px] right-0 menu bg-base-200 rounded-box gap-4">
  {#each categories as category}
    <li>
      <a
        class="w-full"
        class:!text-blue-400={category.businessId === categoryId}
        class:active={category.businessId === categoryId}
        href={`/links?category=${category.businessId}`}
      >
        <div class="flex flex-nowrap w-96">
          {category.name}
        </div>
      </a>
    </li>
  {/each}
</ul>
