import { sanitizeDisplayName, type PlayerState } from '@cozy/shared';

/** A brand-new player's default state (multiplayer starts fresh in v1). */
export function createDefaultPlayer(
  playerId: string,
  displayName?: string,
  modelId?: string
): PlayerState {
  // Sanitize the client-supplied name (the SAME clamp the client applies) and fall
  // back to a generated handle when nothing usable remains. This is the value that
  // gets stored and broadcast to peers, so it must already be safe text here.
  const name = sanitizeDisplayName(displayName);
  return {
    playerId,
    displayName: name.length > 0 ? name : `Player-${playerId.slice(0, 4)}`,
    modelId: modelId && modelId.length > 0 ? modelId : 'male',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    health: { current: 5, max: 5 },
    inventory: { backpack: {}, hotbar: {}, selectedSlot: 0 },
    selectedSlot: 0,
  };
}
