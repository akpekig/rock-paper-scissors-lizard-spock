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
  const state = ref(0);
  const user = ref();

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
    /* Start game */
    state.value = 1;
    /* Set user choice */
    user.value = choice;
    setTimeout(() => {
      if (computer.value == choice) {
        /* Draw */
        return (state.value = 4);
      }
      if (typeof score.value === 'number' && computer.value) {
        if (weapons[choice].includes(computer.value)) {
          /* Win */
          score.value++;
          state.value = 2;
        } else if (weapons[computer.value].includes(choice)) {
          /* Lose */
          score.value--;
          state.value = 3;
        }
      }
    }, 1500);
  }

  function playAgain() {
    /**
     * Trigger computer selection and restart game
     */
    trigger.value++;
    state.value = 0;
  }

  function reset() {
    /**
     * Reset all
     */
    playAgain();
    trigger.value = 0;
    score.value = 0;
    state.value = 0;
    localStorage.clear();
  }

  return {
    weapons,
    keys,
    mode,
    score,
    user,
    computer,
    trigger,
    state,
    toggleMode,
    play,
    playAgain,
    reset
  };
});
