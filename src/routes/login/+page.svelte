<script>
    import Header from '$lib/Header.svelte';
    import LoginForm from './LoginForm.svelte';
    import WelcomeNavigator from '$lib/WelcomeNavigator.svelte';
</script>

<Header subTitle="Login">
    <WelcomeNavigator />
</Header>

<div class="columns">
    <div class="column has-text-centered">
        <img class="box" alt="compass" src="/Compass.png" width="600" />
    </div>
    <div class="column">
        <div class="box">
            <h1 class="title">Login</h1>
            <LoginForm />
        </div>
    </div>
</div>
