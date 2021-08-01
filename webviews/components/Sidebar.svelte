<script lang="ts">
    import crowdin from '@crowdin/crowdin-api-client';
    import { onMount } from 'svelte';
    const vscode = acquireVsCodeApi();

    const { projectsGroupsApi } = new crowdin(config);

    let loading = true;

    let projects : Array<{
        id:number;
        identifier:string;
        name:string;
    }> = [];

    const getProjects = async () => {
        const res = await projectsGroupsApi.listProjects();

        return res;
    };

    onMount(async () => {
        const projectsTmp = await getProjects();

        for (let i = 0; i < projectsTmp.data.length; i++) {
            const {data} = projectsTmp.data[i];
            
            const project = {
                id: data.id,
                identifier: data.identifier,
                name: data.name
            };

            projects = [project, ...projects];
        }

        loading = false;
    });
</script>
<h3>Hello</h3>
<ul>
    {#if loading}
    loading...
    {:else}
    {#each projects as project }
        <li
        style="cursor: pointer;"
        on:click={() => {
            vscode.postMessage({type: 'onDetailed', value: project.id});
        }}
        >{project.name}</li>
    {/each}
    {/if}
</ul>