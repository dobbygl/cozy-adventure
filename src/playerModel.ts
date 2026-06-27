/** Selectable player avatar models. */
export type PlayerModelId = 'male' | 'female';

export interface PlayerModelConfig {
  /** Public-relative GLB path (kept public-relative so it resolves under the host). */
  path: string;
  /** Uniform scale applied to the loaded mesh. Tuned per model. */
  scale: number;
  /** Spawn Y so the feet land on the terrain. Tuned per model. */
  spawnY: number;
}

// Asset credits are in CREDITS.md. Both GLBs carry the canonical mixamorig:*
// skeleton, so the shared FBX clips bind directly with no runtime fix-up.
/** Registry of avatar models. Add a new entry here to offer another body. */
export const PLAYER_MODELS: Record<PlayerModelId, PlayerModelConfig> = {
  male: {
    // Player model by micaelsampaio, CC-BY-4.0 (see CREDITS.md).
    path: 'assets/Player_Model_Male.glb',
    scale: 2.2,
    spawnY: 6.1,
  },
  female: {
    // "Low Poly Scout Girl (Apocalypse | Rigged)" by micaelsampaio, CC-BY-4.0.
    // GLB rebaked to match the male rig: bone names normalized (mixamorig:*_NN ->
    // mixamorig:*) and the skeleton frame rotated to identity, so the shared FBX
    // clips bind and stand upright with no per-model handling. See CREDITS.md.
    path: 'assets/Player_Model_Female.glb',
    // Starting point copied from the male model; tune visually if needed.
    scale: 2.2,
    spawnY: 6.1,
  },
};

export const DEFAULT_PLAYER_MODEL: PlayerModelId = 'male';

let selectedModel: PlayerModelId = DEFAULT_PLAYER_MODEL;

/** The model the next Player.load() will use. */
export function getSelectedPlayerModel(): PlayerModelId {
  return selectedModel;
}

/**
 * Pick the model for the next new game or restored save. Anything that is not a
 * known id (including the `undefined` of old saves that predate this feature)
 * falls back to the default, so no caller can land on an undefined registry key.
 */
export function setSelectedPlayerModel(id: PlayerModelId | string | null | undefined): void {
  selectedModel = id === 'female' || id === 'male' ? id : DEFAULT_PLAYER_MODEL;
}

/** Config for a given model id, defaulting to the current selection. */
export function getPlayerModelConfig(id: PlayerModelId = selectedModel): PlayerModelConfig {
  return PLAYER_MODELS[id] ?? PLAYER_MODELS[DEFAULT_PLAYER_MODEL];
}
