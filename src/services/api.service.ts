// ─── Types ────────────────────────────────────────────────────────────────────

type ContentType = "json" | "form-data";
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type QueryParams = Record<string, string | number | boolean | null | undefined>;

interface RequestOptions<TBody = unknown> {
  headers?: Record<string, string>;
  body?: TBody;
  contentType?: ContentType;
  params?: QueryParams;
}

interface ApiResponse<TData = unknown> {
  codeHttp: number;
  message: string;
  response: TData | null;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

const getToken = (): string | null => localStorage.getItem("token");

// ─── Build Query String ───────────────────────────────────────────────────────

function buildQueryString(params: QueryParams): string {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");

  return query ? `?${query}` : "";
}

// ─── Build Headers ────────────────────────────────────────────────────────────

function buildHeaders(
  contentType: ContentType,
  extraHeaders: Record<string, string> = {}
): HeadersInit {
  const token = getToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extraHeaders,
  };

  if (contentType === "json") {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// ─── Build Body ───────────────────────────────────────────────────────────────

function buildBody<TBody>(
  body: TBody | undefined,
  contentType: ContentType
): BodyInit | undefined {
  if (body === undefined || body === null) return undefined;

  if (contentType === "json") {
    return JSON.stringify(body);
  }

  if (body instanceof FormData) return body;

  const formData = new FormData();
  Object.entries(body as Record<string, unknown>).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
}

// ─── Core Request ─────────────────────────────────────────────────────────────

async function request<TData = unknown, TBody = unknown>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions<TBody> = {}
): Promise<ApiResponse<TData>> {
  const { headers = {}, body, contentType = "json", params } = options;

  // Append query string ke URL jika ada params
  const queryString = params ? buildQueryString(params) : "";
  const url = `${BASE_URL}${endpoint}${queryString}`;

  try {
    const response = await fetch(url, {
      method,
      headers: buildHeaders(contentType, headers),
      body: method !== "GET" ? buildBody(body, contentType) : undefined,
    });

    if (response.status === 204) {
      return { response: null, codeHttp: 204, message: "No content" };
    }

    const json = await response.json();

    return {
      response: response.ok ? (json as TData) : null,
      codeHttp: response.status,
      message: json?.message ?? (response.ok ? "Success" : "Terjadi kesalahan"),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal terhubung ke server";

    return {
      response: null,
      codeHttp: 0,
      message,
    };
  }
}

// ─── Public API Methods ───────────────────────────────────────────────────────

export const api = {
  get<TData = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "body" | "contentType">
  ): Promise<ApiResponse<TData>> {
    return request<TData>("GET", endpoint, options);
  },

  post<TData = unknown, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions<TBody>
  ): Promise<ApiResponse<TData>> {
    return request<TData, TBody>("POST", endpoint, { ...options, body });
  },

  put<TData = unknown, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions<TBody>
  ): Promise<ApiResponse<TData>> {
    return request<TData, TBody>("PUT", endpoint, { ...options, body });
  },

  patch<TData = unknown, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: RequestOptions<TBody>
  ): Promise<ApiResponse<TData>> {
    return request<TData, TBody>("PATCH", endpoint, { ...options, body });
  },

  delete<TData = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "body" | "contentType">
  ): Promise<ApiResponse<TData>> {
    return request<TData>("DELETE", endpoint, options);
  },
};