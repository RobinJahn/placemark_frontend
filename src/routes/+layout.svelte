<script>
    import { beforeUpdate } from "svelte";
    import { donationService } from "../services/placemark-service.js";

    beforeUpdate(() => {
        donationService.reload();
    });
</script>

<div class="container">
    <slot />
</div>
