<script>
  import "../app.css";
</script>

<div class="layout">
  <main>
    <slot />
  </main>
  <footer>
    <p>
      By <a href="https://sebastiandedeyne.com">Sebastian De Deyne</a> at
      <a href="https://spatie.be/?utm_campaign=footer-link&utm_source=svelte-by-example">SPATIE</a>
      <br class="sm-only" />
      <span class="lg-only">|</span>
      Built with <a href="https://kit.svelte.dev/">SvelteKit</a> |
      <a href="https://github.com/sebastiandedeyne/sveltebyexample.com"
        >Source</a
      >
    </p>
  </footer>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    width: 100%;
    max-width: calc(800px + 2rem);
    padding: 0 var(--spacing);
    margin: calc(var(--spacing) * 2) auto 0;
  }

  footer {
    margin-top: calc(var(--spacing) * 4);
    margin-bottom: var(--spacing);
    font-size: 0.75em;
    text-align: center;
    color: var(--gray-text);
  }

  footer a {
    color: var(--gray-text);
  }
</style>
