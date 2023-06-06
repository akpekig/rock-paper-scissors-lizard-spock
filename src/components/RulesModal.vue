<script setup lang="ts">
import { nextTick, ref } from 'vue';

import { useGameStore } from '@/stores/game';

import IconBonusRules from './icons/IconBonusRules.vue';
import IconClose from './icons/IconClose.vue';
import IconRules from './icons/IconRules.vue';

const game = useGameStore();
const display = ref(false);
const modal = ref();
const openModal = ref();

const toggle = async () => {
  /**
   * Toggle modal display with keyboard navigation
   */
  display.value = !display.value;
  if (display.value) {
    await nextTick();
    modal.value.focus();
  } else {
    openModal.value.focus();
  }
};
</script>

<template>
  <button @click="toggle" ref="openModal" class="button modal-button" aria-label="Rules">
    Rules
  </button>
  <div
    v-show="display"
    @keyup.esc="toggle"
    :aria-modal="display"
    ref="modal"
    class="modal"
    role="dialog"
    tabindex="-1"
  >
    <h2 aria-label="Rules">Rules</h2>
    <component
      :is="game.mode ? IconBonusRules : IconRules"
      :class="{ bonus: game.mode }"
      class="margin-x-auto"
    />
    <button @click="toggle" aria-label="Close modal"><IconClose aria-hidden="true" /></button>
  </div>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
  background: none;
  &.modal-button {
    border: 1px solid $color-light-grey;
    color: $color-light-grey;
  }
}
.modal {
  position: absolute;
  @include absoluteFill;
  display: flex;
  @include spacedCenterColumn;
  z-index: 999;
  border-radius: $border-radius;
  background: $color-white;
  padding: 4rem 2rem;
  width: 100%;
  height: 100%;
  text-align: center;
  @include breakpoint(desktop) {
    @include absoluteCenter;
    flex-flow: row wrap;
    box-shadow: 0 0 10px 100vw hsla(0, 0%, 0%, 0.5);
    padding: $small-padding;
    max-width: 25rem;
    max-height: 50%;
    overflow: auto;
    svg {
      order: 1;
      &.bonus {
        transform: scale(0.9);
        margin-bottom: 2rem;
      }
    }
  }
  h2 {
    color: $color-dark-grey;
    font-weight: 700;
    font-size: 2rem;
    text-transform: uppercase;
  }
  button {
    border: none;
    padding: 0;
  }
}
</style>
