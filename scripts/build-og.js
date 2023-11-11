import { html } from "satori-html";
import fs from "fs";
import path from "path";
import satori from "satori";
import * as url from "url";
import { Resvg } from "@resvg/resvg-js";

// =============================
// PARAMS
// =============================

const SHOW_LOGS = true;

const POST_OG = (title) => {
  return html(`
      <div style="background-color: white; margin: 0px; padding: 0px; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%;">
      
      <span style="position: absolute; top: 20; left: 20;"><svg  xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="enable-background:new 0 0 98.1 118" viewBox="0 0 98.1 118"><path d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5" style="fill:#ff3e00"/><path d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.4-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.7l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.9 5.2-4.1 9.9-8.6 12.7l-27.5 17.5c-1.7 1.1-3.6 1.9-5.6 2.5" style="fill:#fff"/></svg></span>
      
      <h1 style="margin-bottom: 0px; text-align: center; font-family: "capitolina"; font-weight: 700; font-size: 3rem;">Svelte By Example</h1>
      <p style="margin-bottom: 0px; font-size: 1.2rem; color: #777; max-width: 24rem; text-align: center;">a succinct, gentle introduction to Svelte & SvelteKit to peak your curiosity.</p>
        
      <p style="padding-right: 20px; padding-left: 20px; color: #fc2507; padding-bottom: 50px; text-align: center; font-family: "capitolina"; font-weight: 400; font-size: 3rem;">${title}</p>
      </div>
     `);
};

const rootDirectory = url.fileURLToPath(new URL(".", import.meta.url));

const OUTPUT_DIR = path.join(rootDirectory, "../static", "og-images");

const CONTENT_DIR = path.join(rootDirectory, "../content");

/**
 * Will render 10 images at a time (to save memory, set to a higher if
 * your machine can handle)
 */
const CHUNK_SIZE = 8;

// =============================
// SCRIPT
// =============================

export async function main() {
  // ==========
  // Load Fonts
  // ==========

  const fontDataNormal = await fetch(
    "https://use.typekit.net/af/074540/00000000000000007735b5a6/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3",
  ).then((res) => res.arrayBuffer());

  const fontDataBold = await fetch(
    "https://use.typekit.net/af/484bf2/00000000000000007735b5ab/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3",
  ).then((res) => res.arrayBuffer());

  const dir = fs.readdirSync(CONTENT_DIR, { encoding: "utf8" });

  /** @type {{ title: string, slug: string}[]} */
  const toSave = [];

  for (const filename of dir) {
    let [index, title] = filename.replace(".md", "").split(". ");

    const slug = title.toLowerCase().replace(/&/g, "and").replace(/\s/g, "-");

    toSave.push({ title, slug });
  }

  const imagesPerChunk = Math.round(toSave.length / CHUNK_SIZE);

  console.log("Rendering OG Images for Content...");

  // Create the OUTPUT folders if it doesn't exist yet.
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let totalRendered = 0;

  for (let i = 0; i < imagesPerChunk; i++) {
    const currentChunk = toSave.slice(
      i * CHUNK_SIZE,
      i * CHUNK_SIZE + CHUNK_SIZE,
    );

    await Promise.all(
      currentChunk?.map(async (imageToSave) => {
        const svg = await satori(POST_OG(imageToSave.title), {
          height: 400,
          width: 800,
          fonts: [
            {
              name: "capitolina",
              data: fontDataNormal,
              style: "normal",
              weight: 400,
            },
            {
              name: "capitolina",
              data: fontDataBold,
              style: "normal",
              weight: 700,
            },
          ],
        });

        // Convert to png here.
        const resvg = new Resvg(svg);
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();

        fs.writeFileSync(
          path.join(OUTPUT_DIR, `${imageToSave.slug}.png`),
          pngBuffer,
        );
      }),
    );

    totalRendered += currentChunk.length;

    SHOW_LOGS &&
      console.log(`✅ Rendered ${totalRendered}/${toSave.length} images.`);
  }

  SHOW_LOGS &&
    console.log(`✅ Rendered ${totalRendered} images in ${OUTPUT_DIR}`);
}

main();
