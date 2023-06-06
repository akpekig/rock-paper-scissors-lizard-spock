<script setup lang="ts">
import { useGameStore } from '@/stores/game';

import WeaponItem from './WeaponItem.vue';

const game = useGameStore();
</script>

<template>
  <div class="outcome margin-x-auto">
    <div class="choice">
      <p>You picked</p>
      <div :class="{ ripple: game.state === 2 }" class="shadow" aria-hidden="true"></div>
      <WeaponItem :weapon="game.user" />
    </div>
    <div class="choice">
      <p>The House Picked</p>
      <div :class="{ ripple: game.state === 3 }" class="shadow" aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <WeaponItem v-if="game.computer && game.state > 1" :weapon="game.computer" />
    </div>
    <div v-if="game.state > 1" class="end-game">
      <p>{{ game.state === 2 ? 'You win' : game.state === 3 ? 'You lose' : "It's a tie" }}</p>
      <button @click="game.playAgain" class="button">Play again</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outcome {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2rem;
  width: 100vw;
  @include breakpoint(desktop) {
    max-width: 60rem;
  }
  p {
    color: $color-white;
    text-transform: uppercase;
  }
  .end-game {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    @include breakpoint(desktop) {
      order: -1;
      width: auto;
    }
    p {
      font-weight: 700;
      font-size: 4rem;
      line-height: 1;
      letter-spacing: 2px;
      text-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.5);
      @include breakpoint(desktop) {
        font-size: 3rem;
      }
    }
    button {
      cursor: pointer;
      box-shadow: 0 2px 5px 0 hsla(0, 0%, 0%, 0.5);
      padding: $small-padding;
      width: 100%;
      max-width: 15rem;
      &:hover,
      &:focus,
      &:focus-visible {
        color: hsl(349, 70%, 56%);
      }
    }
  }
  .choice {
    display: flex;
    position: relative;
    padding: 0 2rem;
    @include spacedCenterColumn;
    justify-content: flex-end;
    gap: 2rem;
    @include breakpoint(desktop) {
      justify-content: space-between;
      &:first-child {
        order: -1;
      }
    }
    p {
      order: 100;
      font-weight: 600;
      letter-spacing: 1px;
      @include breakpoint(desktop) {
        order: 0;
      }
    }
    .shadow {
      position: absolute;
      @include absoluteCenter;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      background: hsla(0, 0%, 0%, 0.175);
      width: 7rem;
      height: 7rem;
      @include breakpoint(desktop) {
        transform: translate(-50%, -50%) scale(1.75);
      }
    }
    .ripple {
      transform: translate(-50%, -60%);
      animation: ripple 1s linear infinite;
      @include breakpoint(desktop) {
        transform: translate(-50%, -10%) scale(1.75);
      }
    }
  }
}
@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba($color-white, 0.05), 0 0 0 40px rgba($color-white, 0.05),
      0 0 0 60px rgba($color-white, 0.05), 0 0 0 80px rgba($color-white, 0.05);
  }
  100% {
    box-shadow: 0 0 0 40px rgba($color-white, 0.05), 0 0 0 60px rgba($color-white, 0.05),
      0 0 0 80px rgba($color-white, 0.05), 0 0 0 120px rgba($color-white, 0);
  }
}
</style>
