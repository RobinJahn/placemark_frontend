<script>
    import TitleBar from './TitleBar.svelte';
    import WelcomeNavigator from './WelcomeNavigator.svelte';
</script>

<div class="columns is-vcentered">
    <div class="column">
        <TitleBar title={'GlobeLens'} subTitle={'Sign up or Log in'} />
    </div>
    <div class="column">
        <slot/>
    </div>
</div>
