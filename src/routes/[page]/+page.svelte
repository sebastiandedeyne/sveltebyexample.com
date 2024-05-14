<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  import Header from "../../lib/components/Header.svelte";
  import Example from "../../lib/components/Example.svelte";
  import Resources from "../../lib/components/Resources.svelte";
  import Pagination from "../../lib/components/Pagination.svelte";

  export let data;

  /** We can't use location.ref here since it will only run on the browser */
  let metaImageURL = new URL(PUBLIC_BASE_URL);
  metaImageURL.pathname = "/api/og-image";
  metaImageURL.searchParams.set("title", data.page.title);
</script>

<svelte:head>
  <title>
    {data.page.section} by Example:
    {data.page.title}
  </title>

  <meta property="og:image" content={metaImageURL.toString()} />

  <meta property="og:image:width" content="800" />
  <meta property="og:image:height" content="400" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={metaImageURL.toString()} />
  <meta
    name="twitter:title"
    content={`${data.page.section} by Example: ${data.page.title}`}
  />
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
