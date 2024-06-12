<script lang="ts">
  const { search } = $props<{search: (value: string) => void}>();
</script>

<div class="flex gap-2 mb-2">
  <input
    oninput={(e) => search(e.target?.value)}
    type="text"
    placeholder="Type here"
    class="input w-full max-w-xs"
  />
  <slot />
</div>
