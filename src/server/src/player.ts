import type { PlayerState } from '@shared/state';

/** A brand-new player's default state (multiplayer starts fresh in v1). */
export function createDefaultPlayer(
  playerId: string,
  displayName?: string,
  modelId?: string
): PlayerState {
  return {
    playerId,
    displayName: displayName && displayName.length > 0 ? displayName : `Player-${playerId.slice(0, 4)}`,
    modelId: modelId && modelId.length > 0 ? modelId : 'male',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    health: { current: 5, max: 5 },
    inventory: { backpack: {}, hotbar: {}, selectedSlot: 0 },
    selectedSlot: 0,
  };
}
