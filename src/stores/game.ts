import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useGameStore = defineStore('game', () => {
  const weapons: Record<Weapon, Weapon[]> = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['scissors', 'rock']
  };
  /* Explicit typing for random computer selection */
  const keys: Weapon[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

  const mode = ref(false);
  const trigger = ref(0);

  /* Random computer selection */
  const computer = computed(
    () => !isNaN(trigger.value) && keys[Math.floor(Math.random() * keys.length)]
  );

  const score = useLocalStorage('score', 0);

  function toggleMode() {
    /** Toggle game mode */
    mode.value = !mode.value;
  }

  function play(choice: Weapon) {
    /**
     * Set outcome based on choice
     */
    if (typeof score.value === 'number' && computer.value) {
      if (weapons[choice].includes(computer.value)) {
        score.value++;
      } else if (weapons[computer.value].includes(choice)) {
        score.value--;
      }
    }
  }

  function playAgain() {
    /**
     * Trigger computer selection
     */
    trigger.value++;
  }

  function reset() {
    /**
     * Reset scores
     */
    playAgain();
    trigger.value = 0;
    score.value = 0;
    localStorage.clear();
  }

  return { weapons, keys, mode, score, computer, trigger, toggleMode, play, playAgain, reset };
});
