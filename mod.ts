import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(_req: Request): Promise<Response> {
  const newUrl = new URL(_req.url);
  newUrl.hostname = "mrakopedia.net";
  newUrl.protocol = "https:";
  newUrl.port = "443";
  return fetch(newUrl.toString(), _req);
}

serve(handler);
