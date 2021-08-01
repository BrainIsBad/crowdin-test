<script lang="ts">
    import crowdin, {ProjectsGroupsModel, ResponseObject} from '@crowdin/crowdin-api-client';
    import { onMount } from 'svelte';
    const { projectsGroupsApi } = new crowdin(config);

    let loading = true;

    let project: ResponseObject<ProjectsGroupsModel.Project | ProjectsGroupsModel.ProjectSettings> | null = null;

    const getProject = async (id:number) => await projectsGroupsApi.getProject(id);

    onMount(async () => {
        project = await getProject(projectId);

        console.log(project);

        loading = false;
    });

</script>

{#if loading}
loading...
{:else}
<h1>Title: {project?.data.name}</h1>
<p>
    Source language: {project?.data.sourceLanguageId}
</p>
<h2>
    Target languages:
</h2>
<ul>
    {#each project?.data.targetLanguages || [] as lang}
        <li>{lang.name}</li>
    {/each}
</ul>
{/if}