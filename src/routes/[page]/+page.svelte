<script>
  import Header from "../../lib/components/Header.svelte";
  import Example from "../../lib/components/Example.svelte";
  import Resources from "../../lib/components/Resources.svelte";
  import Pagination from "../../lib/components/Pagination.svelte";

  export let data;
</script>

<svelte:head>
  <title>
    {data.page.section} by Example:
    {data.page.title}
  </title>
</svelte:head>

<Header>
  <h1>
    <a href="/">{data.page.section} by Example</a>: {data.page.title}
  </h1>
  {#if data.page.intro}
    {@html data.page.intro}
  {/if}
</Header>

{#each data.page.examples as example}
  <Example {example} />
{/each}

<Pagination nextPage={data.nextPage} previousPage={data.previousPage} />

{#if data.page.resources}
  <Resources resources={data.page.resources} />
{/if}
