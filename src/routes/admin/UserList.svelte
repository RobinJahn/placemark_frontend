<!-- create a svelte component that lists all users. If the edit button is klicked a button apperas for each user to delete it.-->
<script>
    import {onMount} from 'svelte';
    import {placemarkService} from "../../services/placemark-service.js";

    let users = [];
    let error = null;

    onMount(async () => {
        try {
            users = await placemarkService.getUsers();
        } catch (err) {
            error = err;
        }
    });

    const handleDelete = async (id) => {
        try {
            await placemarkService.deleteUser(id);
            users = users.filter((user) => user._id !== id);
        } catch (err) {
            error = err;
        }
    };
</script>

{#if error}
    <article class="message is-danger">
        <div class="message-body">
            {error.message}
        </div>
    </article>
{:else}
    <div class="box">
        <h1 class="title has-text-centered">Users</h1>
        <table class="table is-fullwidth is-hoverable m-3">
            <thead>
            <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each users as user}
                <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        <button class="button is-danger" on:click={handleDelete(user._id)}>Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{/if}
