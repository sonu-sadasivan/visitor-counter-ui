import type { VisitorCountResponse } from '../types/visitor';

function getBaseUrl(): string {
  const url = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!url) throw new Error('The visitor counter is not configured.');
  return url.replace(/\/$/, '');
}

export async function recordVisit(): Promise<VisitorCountResponse> {
  let response: Response;
  try {
    response = await fetch(`${getBaseUrl()}/api/visits`, { method: 'POST', headers: { Accept: 'application/json' } });
  } catch { throw new Error('Unable to reach the visitor counter.'); }
  if (!response.ok) throw new Error('The visitor counter could not be loaded.');
  let body: unknown;
  try { body = await response.json(); } catch { throw new Error('The visitor counter returned an invalid response.'); }
  if (typeof body !== 'object' || body === null || !('count' in body) || typeof body.count !== 'number' || !Number.isSafeInteger(body.count) || body.count < 0) {
    throw new Error('The visitor counter returned an invalid response.');
  }
  return { count: body.count };
}
