import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from '../game';
import { expect, describe, it, beforeEach } from 'vitest';

describe('Game Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('toggles mode', () => {
    const game = useGameStore();

    game.toggleMode();

    expect(game.mode).toBeTruthy();
  });

  it('increments score on win', () => {
    const game = useGameStore();
    const winner = game.keys.find((key) => game.weapons[key].includes(game.computer));

    game.play(winner);

    expect(game.score).toBe(1);
  });

  it('decrements score on loss', () => {
    const game = useGameStore();
    const loser = game.keys.find(
      (key) => key !== game.computer && !game.weapons[key].includes(game.computer)
    );

    game.play(loser);

    expect(game.score).toBe(-1);
  });

  it('keeps score on draw', () => {
    const game = useGameStore();

    game.play(game.computer);

    expect(game.score).toBe(0);
  });

  it('resets score and computer choice', () => {
    const game = useGameStore();
    const winner = game.keys.find((key) => game.weapons[key].includes(game.computer));

    game.play(winner);
    game.reset();

    expect(game.score).toBe(0);
  });
});
