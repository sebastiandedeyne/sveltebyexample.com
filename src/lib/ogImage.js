import { html } from "satori-html";
import { ImageResponse as IR } from "@vercel/og";

/**
 * A promise that will return an Image Response compatible to vercel/og based on
 * the HTML Template you give.
 * Refer to https://github.com/etherCorps/sveltekit-og/blob/main/src/lib/api.ts
 * for `options`.
 */
export const ImageResponse = async (htmlTemplate, options) => {
  const reactVNode = html(`${htmlTemplate}`);
  return new IR(reactVNode, options);
};
