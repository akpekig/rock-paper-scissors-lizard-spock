<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import WeaponItem from './WeaponItem.vue';
import IconPentagon from './icons/IconPentagon.vue';
import IconTriangle from './icons/IconTriangle.vue';
import IconPaper from './icons/IconPaper.vue';
import IconScissors from './icons/IconScissors.vue';
import IconRock from './icons/IconRock.vue';
import IconLizard from './icons/IconLizard.vue';
import IconSpock from './icons/IconSpock.vue';
const game = useGameStore();
</script>

<template>
  <section aria-label="Use any button below to start the game">
    <IconPentagon v-if="game.mode" aria-hidden="true" />
    <IconTriangle v-else aria-hidden="true" />
    <div :class="[game.mode ? 'bonus' : 'normal']">
      <WeaponItem :weapon="game.keys[1]" class="primary">
        <template #icon><IconPaper /></template>
      </WeaponItem>
      <WeaponItem
        :weapon="game.keys[2]"
        class="secondary"
        :class="{ 'margin-left-8-desktop': !game.mode }"
      >
        <template #icon><IconScissors /></template>
      </WeaponItem>
      <WeaponItem :weapon="game.keys[0]" class="tertiary" :class="{ 'margin-x-auto': !game.mode }">
        <template #icon><IconRock /></template>
      </WeaponItem>
      <template v-if="game.mode">
        <WeaponItem :weapon="game.keys[5]" class="bonus-primary">
          <template #icon><IconSpock /></template>
        </WeaponItem>
        <WeaponItem :weapon="game.keys[4]" class="bonus-secondary">
          <template #icon><IconLizard /></template>
        </WeaponItem>
      </template>
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
      width: 150%;
      height: 20rem;
    }
    > * {
      flex: 0 0 auto;
      svg {
        vertical-align: middle;
      }
    }
    &.normal > * {
      @include breakpoint(desktop) {
        transform: scale(1.5);
        &:last-child {
          margin-top: 8rem;
        }
      }
    }
    &.bonus {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      grid-template-columns: repeat(2, 1fr);
      align-content: center;
      justify-items: center;
      > * svg {
        transform: scale(0.625);
        @include breakpoint(desktop) {
          transform: scale(0.9);
        }
      }
      // Explicitly set pentagon order
      .secondary {
        grid-column: 1 / -1;
        order: 0;
      }
      .bonus-primary {
        order: 1;
        margin-right: 2rem;
        @include breakpoint(desktop) {
          margin-right: 6rem;
        }
      }
      .primary {
        order: 2;
        margin-left: 2rem;
        @include breakpoint(desktop) {
          margin-left: 6rem;
        }
      }
      .bonus-secondary {
        order: 3;
      }
      .tertiary {
        order: 4;
      }
      .bonus-secondary,
      .tertiary {
        margin-top: 1rem;
        @include breakpoint(desktop) {
          margin-top: 3rem;
        }
      }
    }
  }
}
</style>
