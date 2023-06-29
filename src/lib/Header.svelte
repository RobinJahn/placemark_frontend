<script>
    import TitleBar from './TitleBar.svelte';
    import WelcomeNavigator from './WelcomeNavigator.svelte';
</script>

<div class="tile is-ancestor">
    <div class="tile is-horizontal">

        <div class="tile is-parent">
            <div class="tile is-child box">
                <TitleBar title={'GlobeLens'} subTitle={'Sign up or Log in'} />
            </div>
        </div>
        <div class="tile is-parent">
            <div class="tile is-child box">
                <slot/>
            </div>
        </div>
    </div>
</div>
