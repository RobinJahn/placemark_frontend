<script>
    export let images = [];
</script>

<div class="columns is-multiline">
    {#each images as image}
    <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
            <div class="card-image">
                <figure class="image">
                    <img src="{image}" alt="">
                </figure>
            </div>
        </div>
    </div>
    {/each}
</div>