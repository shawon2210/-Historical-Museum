const BASE_URL = "/api";

export interface Chapter {
  id: number;
  name: string;
  image: string;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  nav: string[];
}

export interface Specimen {
  name: string;
  period: string;
  age: string;
  length: string;
  height: string;
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export const api = {
  health: () => request<{ status: string; timestamp: string }>("/health"),
  getSite: () => request<SiteInfo>("/site"),
  getChapters: () => request<Chapter[]>("/chapters"),
  getChapter: (id: number) => request<Chapter>(`/chapters/${id}`),
  getSpecimen: () => request<Specimen>("/specimen"),
};
