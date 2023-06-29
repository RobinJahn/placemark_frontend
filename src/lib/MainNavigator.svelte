<script>
    import { user } from "../stores.js";
    import {onDestroy, onMount} from "svelte";

    let isAdmin = true;

    let unsubscribe = user.subscribe(value => {
        if (value !== null) {
            isAdmin = value.isAdmin;
        }
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="has-text-centered columns my-3">
    <a href="/dashboard" class="column ">
        <i class="fas fa-th-list fa-3x" style="color:rgb(63, 122, 139)"></i>
    </a>
    <a href="/map" class="column ">
        <i class="fas fa-map-marked-alt fa-3x" style="color:rgb(102, 153, 255)"></i>
    </a>
    {#if isAdmin}
        <a href="/admin" class="column">
            <i class="fas fa-users-cog fa-3x" style="color:rgb(255, 102, 102)"></i>
        </a>
    {/if}
    <a href="/logout" class="column">
        <i class="fas fa-sign-out-alt fa-3x" style="color:rgb(156, 70, 128)"></i>
    </a>
</div>
