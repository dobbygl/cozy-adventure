import { describe, it, expect } from 'vitest';
import { RemotePlayerManager, type RemotePlayerLike, type RemoteAction } from '../../src/net/RemotePlayerManager';
import type { AvatarSnapshot, PeerInfo } from '@cozy/shared';

// Headless: a fake RemotePlayer records the calls the manager makes, so we test
// the routing/lifecycle logic without three or asset loading.
class FakeRemote implements RemotePlayerLike {
  loaded = false;
  disposed = false;
  pushed: AvatarSnapshot[] = [];
  updates = 0;
  actions: RemoteAction[] = [];
  constructor(readonly playerId: string) {}
  async load(): Promise<void> {
    this.loaded = true;
  }
  pushSnapshot(snap: AvatarSnapshot): void {
    this.pushed.push(snap);
  }
  update(): void {
    this.updates++;
  }
  playAction(action: RemoteAction): void {
    this.actions.push(action);
  }
  dispose(): void {
    this.disposed = true;
  }
}

const peer = (playerId: string): PeerInfo => ({ playerId, displayName: playerId, modelId: 'male' });
const snap = (playerId: string): AvatarSnapshot => ({
  playerId,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  movement: 'idle',
  heldItemId: null,
});

function setup(localId = 'self') {
  const created = new Map<string, FakeRemote>();
  const factory = (p: PeerInfo): FakeRemote => {
    const r = new FakeRemote(p.playerId);
    created.set(p.playerId, r);
    return r;
  };
  return { mgr: new RemotePlayerManager(localId, factory), created };
}

describe('RemotePlayerManager', () => {
  it('ignores our own id and de-dupes peers', () => {
    const { mgr } = setup('self');
    mgr.add(peer('self'));
    expect(mgr.size).toBe(0);
    mgr.add(peer('a'));
    mgr.add(peer('a'));
    expect(mgr.size).toBe(1);
    expect(mgr.has('a')).toBe(true);
  });

  it('loads a peer model on add', () => {
    const { mgr, created } = setup();
    mgr.add(peer('a'));
    expect(created.get('a')?.loaded).toBe(true);
  });

  it('materializes the initial peer set, skipping self', () => {
    const { mgr } = setup('self');
    mgr.addAll([peer('self'), peer('a'), peer('b')]);
    expect(mgr.size).toBe(2);
  });

  it('routes snapshots to matching peers, skipping self and unknown', () => {
    const { mgr, created } = setup('self');
    mgr.add(peer('a'));
    mgr.applySnapshots([snap('a'), snap('self'), snap('ghost')], 1000);
    expect(created.get('a')?.pushed).toHaveLength(1);
    expect(mgr.has('ghost')).toBe(false); // no phantom remote created
  });

  it('advances every remote on update', () => {
    const { mgr, created } = setup();
    mgr.addAll([peer('a'), peer('b')]);
    mgr.update(0.016, 2000);
    expect(created.get('a')?.updates).toBe(1);
    expect(created.get('b')?.updates).toBe(1);
  });

  it('routes a one-shot action to the matching peer, skipping self and unknown', () => {
    const { mgr, created } = setup('self');
    mgr.addAll([peer('a'), peer('b')]);
    mgr.playAction('a', 'axe_hit');
    expect(created.get('a')?.actions).toEqual(['axe_hit']);
    expect(created.get('b')?.actions).toEqual([]);
    // self animates itself; an unknown peer must not throw.
    mgr.playAction('self', 'axe_hit');
    expect(() => mgr.playAction('ghost', 'axe_hit')).not.toThrow();
  });

  it('disposes on remove and on disposeAll', () => {
    const { mgr, created } = setup();
    mgr.addAll([peer('a'), peer('b')]);
    mgr.remove('a');
    expect(created.get('a')?.disposed).toBe(true);
    expect(mgr.size).toBe(1);
    mgr.disposeAll();
    expect(created.get('b')?.disposed).toBe(true);
    expect(mgr.size).toBe(0);
  });
});
