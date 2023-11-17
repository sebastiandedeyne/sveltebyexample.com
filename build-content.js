import { marked } from "marked";
import * as cheerio from "cheerio";
import { promises as fs } from "fs";
import { getHighlighter } from "shiki";

const THEME = "github-dark";

const shiki = await getHighlighter({
  theme: THEME,
});

function highlight(contents, lang) {
  return shiki.codeToHtml(contents, { lang, theme: THEME });
}

let existing = null;

try {
  existing = JSON.parse(await fs.readFile("./src/lib/content.json", "utf-8"));
} catch (error) {}

const content = (
  await Promise.all(
    (await fs.readdir("./content"))
      .sort((a, b) => parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]))
      .map(async function (filename) {
        const path = `content/${filename}`;
        const content = await fs.readFile(`./${path}`, "utf-8");

        if (!content) {
          return null;
        }

        const hash = Buffer.from(content).toString("base64").substring(-48);
        const cached = existing?.find((page) => page.hash === hash);

        if (cached) {
          return cached;
        }

        let [index, title] = filename.replace(".md", "").split(". ");
        index = parseInt(index);

        const section = index > 24 ? "SvelteKit" : "Svelte";

        const slug = title
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/\s/g, "-");

        const url = `/${slug}`;

        const markdown = marked.parse(content);
        const examples = markdown
          .split("<hr>")
          .map((block, index) => {
            const $ = cheerio.load(block);

            const isIntro = index === 0;
            const isResources = $.html().includes("<h2>Resources</h2>");

            const $title = $("h2");
            const title = $title.text();
            $title.remove();

            // Extract code blocks
            const code = $("pre")
              .toArray()
              .map((pre) => {
                const $pre = $(pre);
                $pre.remove();

                const $code = $pre.find("code");
                const lang = $code
                  .attr("class")
                  .substring("languange-".length - 1);

                let filename = null;
                let code = $pre.text();

                if (code.startsWith("<!-- ") || code.startsWith("// ")) {
                  const [comment, ...lines] = code.split("\n");

                  code = lines.join("\n");
                  filename = comment
                    .replace("<!-- ", "")
                    .replace(" -->", "")
                    .replace("// ", "");
                }

                return {
                  filename,
                  code: highlight(code, lang),
                };
              });

            // Add line number classes to paragraphs & strip metadata
            $("p")
              .toArray()
              .forEach((p) => {
                const $p = $(p);
                const match = $p.text().match(/^\{([0-9]+)\} /);

                if (match) {
                  const [textToStrip, line] = match;

                  $p.html($p.html().replace(textToStrip, "")).addClass(
                    `line-${line}`,
                  );
                }
              });

            const text = $("body").html().replace("\n\n", "\n");

            return { title, text, code, isIntro, isResources };
          })
          .filter((example) => example);

        if (!examples.length) {
          return null;
        }

        const page = {
          hash,
          title,
          section,
          slug,
          url,
          path,
          intro: null,
          examples: [],
          resources: null,
        };

        return examples.reduce((page, example) => {
          if (example.isIntro) {
            page.intro = example.text;
          } else if (example.isResources) {
            page.resources = example.text;
          } else {
            delete example.isIntro;
            delete example.isResources;

            page.examples.push(example);
          }

          return page;
        }, page);
      }),
  )
).filter((page) => page);

fs.writeFile("./src/lib/content.json", JSON.stringify(content, null, 2));
