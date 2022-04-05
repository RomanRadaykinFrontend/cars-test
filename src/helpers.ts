import { config } from "./config";

export function buildUrlWithQuery<T>(url: string, query?: T): string {
  return url + (query ? `?${new URLSearchParams(query || {})}` : "");
}

export function makeRequest<T, R = unknown>(
  url: string,
  query?: T
): Promise<R> {
  const gateway = config.gatewayUrl;
  const requestUrl = buildUrlWithQuery(gateway + url, query);
  console.log({
    gateway,
    requestUrl,
    config,
    url,
    query
  });
  return fetch(requestUrl).then((response) => response.json());
}
