<script>
  import { small } from "$lib/stores";

  $: code = $small
    ? example.code.map((block) => {
        return {
          ...block,
          code: block.code.replace(
            /(\n<span class="line"><\/span>){2,}/g,
            "$1",
          ),
        };
      })
    : example.code;

  export let example;
</script>

<article>
  {#if example.title}
    <h2>{example.title}</h2>
  {/if}
  <div>
    {@html example.text}
  </div>
  <figure>
    {#each code as code}
      {#if code.filename}
        <figcaption>{code.filename}</figcaption>
      {/if}
      {@html code.code}
    {/each}
  </figure>
</article>

<style>
  article {
    margin-top: calc(var(--spacing) * 2);
    border-top: 1px solid #eee;
    padding-top: calc(var(--spacing) * 1.5);
  }

  @media (min-width: 640px) {
    article {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 1rem;
    }
  }

  article h2 {
    grid-column: 1 / -1;
    font-size: 0.85rem;
    padding-top: calc(var(--spacing) * 0.5);
  }

  div {
    position: relative;
    margin-top: 0.46rem;
  }

  figure {
    margin-top: var(--spacing);
  }

  @media (min-width: 640px) {
    figure {
      margin-top: 0;
    }
  }

  div :global(p + p),
  figure :global(pre + pre),
  figure :global(pre + figcaption) {
    margin-top: var(--spacing);
  }

  figcaption {
    font-family: "input-mono", monospace;
    text-align: right;
    color: #888;
    font-size: 0.6em;
  }

  @media (min-width: 640px) {
    div :global([class^="line-"]) {
      position: absolute;
    }

    div :global(.line-1) {
      top: 0;
    }

    div :global(.line-2) {
      top: 1rem;
    }

    div :global(.line-3) {
      top: 2rem;
    }

    div :global(.line-4) {
      top: 3rem;
    }

    div :global(.line-5) {
      top: 4rem;
    }

    div :global(.line-6) {
      top: 5rem;
    }

    div :global(.line-7) {
      top: 6rem;
    }

    div :global(.line-8) {
      top: 7rem;
    }

    div :global(.line-9) {
      top: 8rem;
    }

    div :global(.line-10) {
      top: 9rem;
    }

    div :global(.line-11) {
      top: 10rem;
    }

    div :global(.line-12) {
      top: 11rem;
    }

    div :global(.line-13) {
      top: 12rem;
    }

    div :global(.line-14) {
      top: 13rem;
    }

    div :global(.line-15) {
      top: 14rem;
    }

    div :global(.line-16) {
      top: 15rem;
    }

    div :global(.line-17) {
      top: 16rem;
    }

    div :global(.line-18) {
      top: 17rem;
    }

    div :global(.line-19) {
      top: 18rem;
    }

    div :global(.line-20) {
      top: 19rem;
    }

    div :global(.line-21) {
      top: 20rem;
    }

    div :global(.line-22) {
      top: 21rem;
    }

    div :global(.line-23) {
      top: 22rem;
    }

    div :global(.line-24) {
      top: 23rem;
    }

    div :global(.line-25) {
      top: 24rem;
    }

    div :global(.line-26) {
      top: 25rem;
    }

    div :global(.line-27) {
      top: 26rem;
    }

    div :global(.line-28) {
      top: 27rem;
    }

    div :global(.line-29) {
      top: 28rem;
    }

    div :global(.line-30) {
      top: 29rem;
    }

    div :global(.line-31) {
      top: 30rem;
    }

    div :global(.line-32) {
      top: 31rem;
    }

    div :global(.line-33) {
      top: 32rem;
    }

    div :global(.line-34) {
      top: 33rem;
    }

    div :global(.line-35) {
      top: 34rem;
    }

    div :global(.line-36) {
      top: 35rem;
    }

    div :global(.line-37) {
      top: 36rem;
    }

    div :global(.line-38) {
      top: 37rem;
    }

    div :global(.line-39) {
      top: 38rem;
    }

    div :global(.line-40) {
      top: 39rem;
    }

    div :global(.line-41) {
      top: 40rem;
    }

    div :global(.line-42) {
      top: 41rem;
    }

    div :global(.line-43) {
      top: 42rem;
    }

    div :global(.line-44) {
      top: 43rem;
    }

    div :global(.line-45) {
      top: 44rem;
    }

    div :global(.line-46) {
      top: 45rem;
    }

    div :global(.line-47) {
      top: 46rem;
    }

    div :global(.line-48) {
      top: 47rem;
    }

    div :global(.line-49) {
      top: 48rem;
    }

    div :global(.line-50) {
      top: 49rem;
    }

    div :global(.line-51) {
      top: 50rem;
    }

    div :global(.line-52) {
      top: 51rem;
    }

    div :global(.line-53) {
      top: 52rem;
    }

    div :global(.line-54) {
      top: 53rem;
    }

    div :global(.line-55) {
      top: 54rem;
    }

    div :global(.line-56) {
      top: 55rem;
    }

    div :global(.line-57) {
      top: 56rem;
    }

    div :global(.line-58) {
      top: 57rem;
    }

    div :global(.line-59) {
      top: 58rem;
    }

    div :global(.line-60) {
      top: 59rem;
    }
  }
</style>
