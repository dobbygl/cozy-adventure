import { describe, it, expect } from 'vitest';
import {
  getSelectedPlayerModel,
  setSelectedPlayerModel,
  getPlayerModelConfig,
  PLAYER_MODELS,
  DEFAULT_PLAYER_MODEL,
  type PlayerModelId,
} from '../src/playerModel.js';

// playerModel holds the avatar selection (module-level state) and resolves it to a
// config. Anything that isn't a known id must fall back to the default, so no caller
// can ever land on an undefined registry key.
describe('playerModel selection', () => {
  it('defaults to the default model before any selection', () => {
    expect(getSelectedPlayerModel()).toBe(DEFAULT_PLAYER_MODEL);
  });

  it('accepts the known ids', () => {
    setSelectedPlayerModel('female');
    expect(getSelectedPlayerModel()).toBe('female');
    setSelectedPlayerModel('male');
    expect(getSelectedPlayerModel()).toBe('male');
  });

  it('falls back to the default for unknown / null / undefined ids', () => {
    setSelectedPlayerModel('dragon');
    expect(getSelectedPlayerModel()).toBe(DEFAULT_PLAYER_MODEL);
    setSelectedPlayerModel(null);
    expect(getSelectedPlayerModel()).toBe(DEFAULT_PLAYER_MODEL);
    setSelectedPlayerModel(undefined);
    expect(getSelectedPlayerModel()).toBe(DEFAULT_PLAYER_MODEL);
  });

  it('resolves a config for a given model and defaults safely for an unknown one', () => {
    expect(getPlayerModelConfig('male')).toBe(PLAYER_MODELS.male);
    expect(getPlayerModelConfig('female')).toBe(PLAYER_MODELS.female);
    expect(getPlayerModelConfig('zzz' as PlayerModelId)).toBe(PLAYER_MODELS[DEFAULT_PLAYER_MODEL]);
  });
});
