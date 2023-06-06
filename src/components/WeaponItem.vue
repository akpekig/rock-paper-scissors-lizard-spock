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
  width: 7.5rem;
  height: 7.5rem;
  overflow: hidden;
  &:before,
  &:after {
    position: absolute;
    z-index: -1;
    border-radius: 100%;
    content: '';
  }
  &:before {
    @include absoluteFill;
  }
  &:after {
    top: 1rem;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
    box-shadow: inset 0 5px $color-medium-grey;
    background: linear-gradient($color-light-grey, $color-white);
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
