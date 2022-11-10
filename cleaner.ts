import { DenoDOM } from "./deps.ts";
import { RawHTMLPreprocessor } from "./Preprocessor.ts";

function renderHTML(title: string | undefined, contentHTML: string): string {
  const titleHTML = title ? `<h1>${title}</h1>` : "";
  return `
      <!doctype html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              padding: 10px 5vw 10px 5vw;
            }
          </style>
        </head>
        <body>
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
