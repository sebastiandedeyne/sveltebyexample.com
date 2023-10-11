import { onMount } from "svelte";
import { readable } from "svelte/store";

export const small = readable(false, function (set) {
  onMount(() => {
    const query = window.matchMedia("(max-width: 639px)");

    set(query.matches);

    function listener(event) {
      set(event.matches);
    }

    query.addEventListener("change", listener);

    return () => query.removeEventListener("change", listener);
  });
});
