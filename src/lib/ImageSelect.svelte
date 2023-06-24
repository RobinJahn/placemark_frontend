<script>
    import {placemarkService} from "../services/placemark-service.js";
    import {page} from "$app/stores";

    export let fileName = "Image Name";
    let files;

    function handleFileChange(event) {
        setTimeout(() => {
            console.log("files", files);
            fileName  = URL.createObjectURL(files[0]);
        }, 100);
    }

    function upload() {
        console.log("uploading");
        //get id from path
        const id = $page.params.id;

        let formData = new FormData();
        formData.append("image", files[0]);

        let result = placemarkService.uploadImage(id, formData);

        if (result) {
            console.log("success");
        } else {
            console.log("failure");
        }



        //TODO: render success and failure
        //TODO: update site
    }
</script>

<div class="box p-3">
    {#if files && files.length > 0}
        <img src={fileName} alt="Selected"/>

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