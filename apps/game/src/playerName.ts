import { sanitizeDisplayName } from '@cozy/shared';

// The player's chosen display name, persisted across sessions in localStorage and
// sent to the server on join (where it labels this player's avatar for peers).
// Sanitized through the SAME shared clamp the server applies, so what we persist,
// show and send is already bounded, control-char-free text. localStorage may be
// unavailable (private mode); every access degrades to an empty name rather than
// throwing — an empty name makes the server fall back to a generated handle.

const KEY = 'cozy:playerName';

/** The stored display name, sanitized; `''` if none set or storage is unavailable. */
export function getPlayerName(): string {
  try {
    return sanitizeDisplayName(localStorage.getItem(KEY));
  } catch {
    return '';
  }
}

/** Persist a display name (sanitized). Returns the value actually stored. */
export function setPlayerName(name: string): string {
  const clean = sanitizeDisplayName(name);
  try {
    if (clean) localStorage.setItem(KEY, clean);
    else localStorage.removeItem(KEY);
  } catch {
    // Storage unavailable (e.g. private mode): the name simply won't persist.
  }
  return clean;
}
