<script>
  import Header from "../../lib/components/Header.svelte";
  import Example from "../../lib/components/Example.svelte";
  import Resources from "../../lib/components/Resources.svelte";
  import Pagination from "../../lib/components/Pagination.svelte";

  export let data;

  $: header = data.page.examples[0];
  $: examples = data.page.examples.filter((example, index) => index !== 0 && !example.isResources);
  $: resources = data.page.examples.find((example) => example.isResources);
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
  {@html header.text}
</Header>

{#each examples as example}
  <Example {example} />
{/each}

<Pagination nextPage={data.nextPage} previousPage={data.previousPage} />

{#if resources}
  <Resources {resources} />
{/if}
