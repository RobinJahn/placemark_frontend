<script>
    import TitleBar from './TitleBar.svelte';

    export let subTitle = "";
</script>

<div class="tile is-ancestor mt-3">
    <div class="tile is-horizontal">

        <div class="tile is-parent">
            <div class="tile is-child box">
                <TitleBar title={'GlobeLens'} subTitle={subTitle} />
            </div>
        </div>
        <div class="tile is-parent">
            <div class="tile is-child box">
                <slot/>
            </div>
        </div>
    </div>
</div>
