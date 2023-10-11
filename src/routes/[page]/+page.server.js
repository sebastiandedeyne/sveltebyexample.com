import { error } from "@sveltejs/kit";
import content from "$lib/content.json";

export function load({ params }) {
  const page = content.filter((page) => page.slug === params.page)[0];

  const pageIndex = content.indexOf(page);
  const nextPage = content[pageIndex + 1] ?? null;
  const previousPage = content[pageIndex - 1] ?? null;

  if (!page) {
    throw error(404, { message: "Not found" });
  }

  return { page, nextPage, previousPage };
}
