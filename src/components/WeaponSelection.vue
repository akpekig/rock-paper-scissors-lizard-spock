<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import WeaponItem from './WeaponItem.vue';
import IconTriangle from './icons/IconTriangle.vue';
import IconPaper from './icons/IconPaper.vue';
import IconScissors from './icons/IconScissors.vue';
import IconRock from './icons/IconRock.vue';
const game = useGameStore();
</script>

<template>
  <section aria-label="Use any button below to start the game">
    <IconPentagon v-if="game.mode" aria-hidden="true" />
    <IconTriangle v-else aria-hidden="true" />
    <div>
      <WeaponItem :weapon="game.keys[1]" class="primary">
        <template #icon><IconPaper /></template>
      </WeaponItem>
      <WeaponItem :weapon="game.keys[2]" class="secondary">
        <template #icon><IconScissors /></template>
      </WeaponItem>
      <WeaponItem :weapon="game.keys[0]" class="tertiary" :class="{ 'margin-x-auto': !game.mode }">
        <template #icon><IconRock /></template>
      </WeaponItem>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  position: relative;
  width: 20rem;
  height: 18rem;
  > svg,
  div {
    position: absolute;
    @include absoluteCenter;
  }
  > svg {
    transform: translate(-50%, -50%) scale(0.75);
    @include breakpoint(desktop) {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transform: translate(-50%, -55%);
    width: 100%;
    @include breakpoint(desktop) {
      transform: translate(-50%, -55%) scale(1.125, 1.15);
    }
    > * {
      flex: 0 0 auto;
    }
  }
}
</style>
