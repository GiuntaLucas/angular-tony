<!-- You can open the modal using ID.showModal() method -->
<!-- <button class="btn" onclick="my_modal_3.showModal()">open modal</button> -->
<!-- #dialog -->
<script lang="ts">
  import { onMount } from "svelte";

  const { close } = $props();

  onMount(() => {
    (document.getElementById('dialog') as any).showModal();
  })

</script>

<dialog id='dialog' class="modal">
  <div class="modal-box">
    <!-- (click)="handleClose()" -->
    <button
      onclick={() => close()}
      type="button"
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button
    >
    <slot />
  </div>
</dialog>
