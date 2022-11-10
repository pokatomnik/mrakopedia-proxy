import { Server } from "./deps.ts";
import { cleanResponse } from "./cleaner.ts";

const ORIGINAL_HOSTNAME = "mrakopedia.net";
const ORIGINAL_PROTOCOL = "https:";
const ORIGINAL_PORT = "443";

async function handler(request: Request): Promise<Response> {
  const newUrl = new URL(request.url);
  newUrl.hostname = ORIGINAL_HOSTNAME;
  newUrl.protocol = ORIGINAL_PROTOCOL;
  newUrl.port = ORIGINAL_PORT;

  const originalResponse = await fetch(newUrl.toString(), request);
  if (!originalResponse.body) {
    return originalResponse;
  }
  if (!originalResponse.headers.get("content-type")?.includes("text/html")) {
    return originalResponse;
  }

  return cleanResponse(originalResponse);
}

Server.serve(handler);
