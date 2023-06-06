<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import IconPaper from './icons/IconPaper.vue';
import IconScissors from './icons/IconScissors.vue';
import IconRock from './icons/IconRock.vue';
import IconLizard from './icons/IconLizard.vue';
import IconSpock from './icons/IconSpock.vue';

defineProps<{
  weapon: Weapon;
}>();

const game = useGameStore();
const icons = {
  paper: IconPaper,
  scissors: IconScissors,
  rock: IconRock,
  lizard: IconLizard,
  spock: IconSpock
};
</script>

<template>
  <button @click="game.play(weapon)" :class="weapon">
    <component :is="icons[weapon]" :title="weapon" />
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
  &.paper {
    border-color: $color-primary;
    &,
    &:before {
      background: $gradient-primary;
    }
  }
  &.scissors {
    border-color: $color-secondary;
    &,
    &:before {
      background: $gradient-secondary;
    }
  }
  &.rock {
    border-color: $color-tertiary;
    &,
    &:before {
      background: $gradient-tertiary;
    }
  }
  &.spock {
    border-color: $color-bonus-primary;
    &,
    &:before {
      background: $gradient-bonus-primary;
    }
  }
  &.lizard {
    border-color: $color-bonus-secondary;
    &,
    &:before {
      background: $gradient-bonus-secondary;
    }
  }
  .bonus & {
    width: 5rem;
    height: 5rem;
    &:after {
      top: 0.5rem;
      right: 0.5rem;
      bottom: 0.5rem;
      left: 0.5rem;
    }
    @include breakpoint(desktop) {
      width: 7.5rem;
      height: 7.5rem;
      &:after {
        top: 1rem;
        right: 1rem;
        bottom: 1rem;
        left: 1rem;
      }
    }
  }
}
</style>
