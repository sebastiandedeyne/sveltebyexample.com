import { ImageResponse } from "../../../lib/ogImage";

const createPostOG = (title) => {
  return `
    <div style="background-color: white; margin: 0px; padding: 0px; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%;">
    
    <span style="position: absolute; top: 20; left: 20;"><svg  xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="enable-background:new 0 0 98.1 118" viewBox="0 0 98.1 118"><path d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5" style="fill:#ff3e00"/><path d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.4-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.7l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.9 5.2-4.1 9.9-8.6 12.7l-27.5 17.5c-1.7 1.1-3.6 1.9-5.6 2.5" style="fill:#fff"/></svg></span>
    
    <h1 style="margin-bottom: 0px; text-align: center; font-family: "capitolina"; font-weight: 700; font-size: 3rem;">Svelte By Example</h1>
    <p style="margin-bottom: 0px; font-size: 1.2rem; color: #777; max-width: 24rem; text-align: center;">a succinct, gentle introduction to Svelte & SvelteKit to peak your curiosity.</p>
      
    <p style="padding-right: 20px; padding-left: 20px; color: #fc2507; padding-bottom: 50px; text-align: center; font-family: "capitolina"; font-weight: 400; font-size: 3rem;">${title}</p>
    </div>
   `;
};

const fontDataNormal = await fetch(
  "https://use.typekit.net/af/074540/00000000000000007735b5a6/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3",
).then((res) => res.arrayBuffer());

const fontDataBold = await fetch(
  "https://use.typekit.net/af/484bf2/00000000000000007735b5ab/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3",
).then((res) => res.arrayBuffer());

export const GET = async ({ url }) => {
  let title = url.searchParams.get("title");

  // Remove quotes at start and end if present.
  if (title?.at(0) === '"' && title?.at(-1) === '"') title = title.slice(1, -1);

  return ImageResponse(createPostOG(title), {
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
        style: "bold",
        weight: 700,
      },
    ],
  });
};
