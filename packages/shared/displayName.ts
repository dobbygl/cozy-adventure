// Display-name hygiene, shared by client and server so the SAME rule clamps a name
// before it is sent, stored and broadcast. THREE-free and DOM-safe (pure string
// work, no zod): the client uses it before persisting/sending a name, the server
// uses it in createDefaultPlayer before storing/broadcasting one. The wire schema
// (zod) additionally rejects over-long names early; this is the canonical clamp.

/** Max length of a player display name, enforced on the wire and at creation. */
export const MAX_DISPLAY_NAME_LENGTH = 24;

/** C0/C1 control char or a Unicode line/paragraph separator (code-point test, so
 * no control-char literals live in the source). These become a plain space. */
function isControlCodePoint(code: number): boolean {
  return code <= 0x1f || (code >= 0x7f && code <= 0x9f) || code === 0x2028 || code === 0x2029;
}

/**
 * Clamp an untrusted display name to something safe to store and render: strip
 * control characters (incl. newlines and the Unicode line/paragraph separators),
 * collapse runs of whitespace, trim, and cap the length. Returns `''` when nothing
 * usable remains, so the caller can fall back to a generated name. Rendering must
 * still be done as text (canvas/textContent), never as HTML — this only bounds the
 * value, it does not make arbitrary markup safe to inject.
 */
export function sanitizeDisplayName(raw: string | null | undefined): string {
  if (typeof raw !== 'string') return '';
  let out = '';
  for (const ch of raw) {
    out += isControlCodePoint(ch.codePointAt(0) ?? 0) ? ' ' : ch;
  }
  return out.replace(/\s+/g, ' ').trim().slice(0, MAX_DISPLAY_NAME_LENGTH);
}
