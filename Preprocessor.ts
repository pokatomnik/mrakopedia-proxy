import { DenoDOM } from "./deps.ts";

type ElementHander = (
  element: DenoDOM.Element,
  container: DenoDOM.Element
) => void;

export function querySelectAllElements(
  element: DenoDOM.Element | DenoDOM.HTMLDocument,
  selector: string
): Array<DenoDOM.Element> {
  return Array.from(element.querySelectorAll(selector)).reduce((acc, node) => {
    if (node instanceof DenoDOM.Element) {
      acc.push(node as DenoDOM.Element);
    }
    return acc;
  }, new Array<DenoDOM.Element>());
}

function ifNodeIsElement(
  node: DenoDOM.Node,
  callback: (element: DenoDOM.Element) => void
) {
  const isElement = node instanceof DenoDOM.Element;
  if (!isElement) return;
  callback(node as DenoDOM.Element);
}

export class RawHTMLPreprocessor {
  private readonly removers: ReadonlyArray<ElementHander> = [
    // Box remover
    (element) => {
      if (element.tagName === "DIV" && element.classList.contains("box")) {
        element.remove();
      }
    },
    // Edit Section
    (element) => {
      if (
        element.tagName === "SPAN" &&
        element.classList.contains("mw-editsection")
      ) {
        element.remove();
      }
    },
    // Scripts
    (element) => {
      if (element.tagName === "SCRIPT") {
        element.remove();
      }
    },
    // Material From Mrakopedia annotation
    (element) => {
      if (element.tagName === "DIV" && element.id === "siteSub") {
        element.remove();
      }
    },
    // Rating
    (element) => {
      if (element.tagName === "SPAN" && element.id === "w4g_rb_area-1") {
        element.remove();
      }
    },
    (element) => {
      if (element.tagName === "DIV" && element.id === "rating_box-1") {
        element.remove();
      }
    },
    // Jump to navigation
    (element) => {
      if (element.tagName === "DIV" && element.id === "jump-to-nav") {
        element.remove();
      }
    },
    // Category links
    (element) => {
      if (element.tagName === "DIV" && element.id === "catlinks") {
        element.remove();
      }
    },
    // Spoiler buttons
    (element) => {
      if (
        element.tagName === "DIV" &&
        element.className.includes("spoilers-button-container")
      ) {
        element.remove();
      }
    },
    // Printable footer
    (element) => {
      if (
        element.tagName === "DIV" &&
        element.classList.contains("printfooter")
      ) {
        element.remove();
      }
    },
    // See Also remover
    (element) => {
      if (element.tagName === "H2") {
        const innerHeaderSpan = element.querySelector("span.mw-headline");
        if (!innerHeaderSpan) return;

        const hasSeeAlsoText = innerHeaderSpan.innerText.includes("См. также");
        if (!hasSeeAlsoText) return;

        const nextSibling = element.nextElementSibling;
        if (!nextSibling) return;

        if (nextSibling.tagName !== "UL") return;

        element.remove();
        nextSibling.remove();
      }
    },
  ];

  public prepare(container: DenoDOM.Element, elements: DenoDOM.NodeList) {
    for (const elementHandler of this.removers) {
      for (const innerNode of elements) {
        ifNodeIsElement(innerNode, (innerElement) => {
          elementHandler(innerElement, container);
        });
      }
    }
  }
}
