<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import WeaponItem from './WeaponItem.vue';
import IconPentagon from './icons/IconPentagon.vue';
import IconTriangle from './icons/IconTriangle.vue';
import { computed } from 'vue';
const game = useGameStore();
const keys = computed(() => (game.mode ? game.keys : game.keys.slice(0, 3)));
</script>

<template>
  <section aria-label="Use any button below to start the game">
    <component :is="game.mode ? IconPentagon : IconTriangle" aria-hidden="true" />
    <div :class="[game.mode ? 'bonus' : 'normal']">
      <WeaponItem v-for="(item, index) in keys" :weapon="item" :key="`key${index}`" />
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-content: center;
    justify-items: center;
    transform: translate(-50%, -55%);
    width: 100%;
    @include breakpoint(desktop) {
      width: 150%;
      height: 20rem;
    }
    > * {
      flex: 0 0 auto;
      cursor: pointer;
      svg {
        vertical-align: middle;
      }
    }
    &.normal {
      @include breakpoint(desktop) {
        gap: 8rem;
        > * {
          transform: scale(1.5);
        }
      }

      // Explicitly set pentagon order
      .paper {
        order: 0;
      }
      .scissors {
        order: 1;
      }
      .rock {
        grid-column: 1 / -1;
        order: 2;
      }
    }
    &.bonus {
      grid-template-rows: repeat(3, 1fr);
      > * svg {
        transform: scale(0.625);
        @include breakpoint(desktop) {
          transform: scale(0.9);
        }
      }
      // Explicitly set pentagon order
      .scissors {
        grid-column: 1 / -1;
        order: 0;
      }
      .spock {
        order: 1;
        margin-right: 2rem;
        @include breakpoint(desktop) {
          margin-right: 6rem;
        }
      }
      .paper {
        order: 2;
        margin-left: 2rem;
        @include breakpoint(desktop) {
          margin-left: 6rem;
        }
      }
      .lizard {
        order: 3;
      }
      .rock {
        order: 4;
      }
      .lizard,
      .rock {
        margin-top: 1rem;
        @include breakpoint(desktop) {
          margin-top: 3rem;
        }
      }
    }
  }
}
</style>
