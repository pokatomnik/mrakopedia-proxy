import { DenoDOM } from "./deps.ts";
import { RawHTMLPreprocessor } from "./Preprocessor.ts";
import { downloadBarHTML, downloadButtonClass } from "./MainPageHandler.ts";

function renderHTML(title: string | undefined, contentHTML: string): string {
  const titleHTML = title ? `<h1>${title}</h1>` : "";
  return `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" value="MrakopediaReader2 - ${title}">
          <title>${title}</title>
          <style>
            body {
              padding: 10px 5vw 10px 5vw;
            }
            a:not(a.${downloadButtonClass}) {
              color: inherit;
              pointer-events: none;
              text-decoration: none;
            }
          </style>
        </head>
        <body style="padding-top: 80px">
          ${downloadBarHTML}
          ${titleHTML}
          ${contentHTML}
        </body>
      </html>
    `.trim();
}

export async function cleanResponse(
  originalResponse: Response
): Promise<Response> {
  const responseString = await originalResponse.text();
  const document = new DenoDOM.DOMParser().parseFromString(
    responseString,
    "text/html"
  );
  document?.getElementById("siteNotice")?.remove();
  const title = document?.getElementById("firstHeading")?.innerText;

  const bodyContent = document?.getElementById("bodyContent");
  if (document?.documentElement) {
    document.documentElement.innerHTML = bodyContent?.outerHTML ?? "NOT FOUND";
    if (bodyContent) {
      const allInnerElements = bodyContent.querySelectorAll("*");
      const preprocessor = new RawHTMLPreprocessor();
      preprocessor.prepare(bodyContent, allInnerElements);
    }
  }

  const contentHTML = bodyContent?.outerHTML ?? "";
  const actualHTML = renderHTML(title, contentHTML);

  return new Response(actualHTML, originalResponse);
}
