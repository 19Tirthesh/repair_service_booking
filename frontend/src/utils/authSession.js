export const SESSION_KEY = 'tm_auth_session';

/** @type {(() => void) | null} */
let unauthorizedHandler = null;

export function setUnauthorizedHandler(fn) {
  unauthorizedHandler = fn;
}

export function notifyUnauthorized() {
  unauthorizedHandler?.();
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !data.token) return null;
    return data;
  } catch {
    return null;
  }
}

export function saveSession(userData) {
  if (!userData?.token) return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function mergeSession(partial) {
  const current = loadSession();
  if (!current) return null;
  const next = { ...current, ...partial };
  if (!next.token) next.token = current.token;
  saveSession(next);
  return next;
}
