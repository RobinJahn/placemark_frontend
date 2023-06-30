<script>
    import {placemarkService} from "../services/placemark-service.js";
    import {page} from "$app/stores";
    import {imageUploadSuccessful} from "../stores.js";
    import {get} from "svelte/store";

    export let fileName = "Image Name";
    let fileURL = "";
    let files;
    export let showMessageImageUploadStatus = false;
    export let imageUploadSuccess;

    function handleFileChange(event) {
        setTimeout(() => {
            console.log("files", files);
            fileURL  = URL.createObjectURL(files[0]);
            fileName = files[0].name;
            console.log("fileName", fileName);
        }, 100);
    }

    async function upload() {
        console.log("uploading");
        //get id from path
        const id = $page.params.id;

        let formData = new FormData();
        formData.append("image", files[0]);

        let result = await placemarkService.uploadImage(id, formData);

        files = null;

        if (result) {
            console.log("success");
            imageUploadSuccessful.set(result);
        } else {
            console.log("failure");
            imageUploadSuccessful.set({success: false});
        }
    }
</script>

<div class="box p-3">
    {#if showMessageImageUploadStatus}
        {#if imageUploadSuccess}
            <div class="notification is-success">
                <button class="delete"></button>
                Image uploaded successfully!
            </div>
        {:else}
            <div class="notification is-danger">
                <button class="delete"></button>
                Image upload failed!
            </div>
        {/if}
    {/if}

    {#if files && files.length > 0}
        <img src={fileURL} alt="Selected"/>

        <button class="button my-2 is-primary" on:click={upload}>
            <i class="fas fa-cloud-upload-alt mr-2"></i>
            Upload the image
        </button>
    {/if}

    <div class="file has-name is-fullwidth">
        <label class="file-label">
            <input class="file-input" on:change={handleFileChange} name="resume" bind:files type="file" accept="image/png, image/jpeg">
            <span class="file-cta">
                <span class="file-icon">
                    <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                    Choose a file…
                </span>
            </span>
            <span class="file-name limited-file-name">
                {fileName}
            </span>
        </label>
    </div>
</div>