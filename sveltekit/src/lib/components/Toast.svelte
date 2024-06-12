<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { toast } from "./toastService.svelte";

  $: if ($toast) {
    setTimeout(() => toast.set(undefined), 2500);
  }
</script>

<div class="toast toast-top toast-end">
  {#if $toast}
    <div
      out:fly={{ x: 100, duration: 500 }}
      class="alert alert-info"
      class:alert-info={$toast.severity === "INFO"}
      class:alert-success={$toast.severity === "SUCCESS"}
      class:alert-warning={$toast.severity === "WARNING"}
      class:alert-error={$toast.severity === "ERROR"}
    >
      <span>{$toast.message}</span>
    </div>
  {/if}
</div>
