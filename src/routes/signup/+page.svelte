<script>
    import Header from '$lib/Header.svelte';
    import SignupForm from './SignupForm.svelte';
    import WelcomeNavigator from '$lib/WelcomeNavigator.svelte';
</script>

<Header subTitle="Sign Up">
    <WelcomeNavigator />
</Header>

<div class="columns">
    <div class="column">
        <div class="box">
            <h1 class="title">Signup</h1>
            <SignupForm />
        </div>
    </div>
    <div class="column has-text-centered">
        <img class="box" alt="suitcase" src="/Suitcase1.png" width="600" />
    </div>
</div>
