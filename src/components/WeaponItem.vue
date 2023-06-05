<script setup lang="ts">
import { useGameStore } from '@/stores/game';

defineProps<{
  weapon: Weapon;
}>();
const game = useGameStore();
</script>

<template>
  <button @click="game.play(weapon)">
    <slot name="icon"></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  position: relative;
  z-index: 1;
  box-sizing: content-box;
  box-shadow: 0 5px 5px $color-darker-grey;
  border: 0 solid $color-grey;
  border-bottom-width: 5px;
  border-radius: 100%;
  padding: 0;
  width: 9rem;
  height: 9rem;
  overflow: hidden;
  &:before,
  &:after {
    position: absolute;
    z-index: -1;
    border-radius: 100%;
    content: '';
  }
  &:before {
    top: 0rem;
    right: 0rem;
    bottom: 0rem;
    left: 0rem;
  }
  &:after {
    top: 1rem;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
    box-shadow: inset 0 5px $color-medium-grey;
    background: linear-gradient(hsl(217, 16%, 87%), $color-light-grey);
  }
  &.primary {
    border-color: $color-primary;
    &,
    &:before {
      background: $gradient-primary;
    }
  }
  &.secondary {
    border-color: $color-secondary;
    &,
    &:before {
      background: $gradient-secondary;
    }
  }
  &.tertiary {
    border-color: $color-tertiary;
    &,
    &:before {
      background: $gradient-tertiary;
    }
  }
  &.bonus-primary {
    border-color: $color-bonus-primary;
    &,
    &:before {
      background: $gradient-bonus-primary;
    }
  }
  &.bonus-secondary {
    border-color: $color-bonus-secondary;
    &,
    &:before {
      background: $gradient-bonus-secondary;
    }
  }
}
</style>
