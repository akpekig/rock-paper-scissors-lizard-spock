<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import IconLogo from '@/components/icons/IconLogo.vue';
import IconBonusLogo from '@/components/icons/IconBonusLogo.vue';
const game = useGameStore();
</script>

<template>
  <header>
    <h1 v-if="game.mode"><IconBonusLogo title="Rock, Paper, Scissors, Lizard, Spock" /></h1>
    <h1 v-else><IconLogo title="Rock, Paper, Scissors" /></h1>
    <div>
      <h2>Score</h2>
      <p>{{ game.score }}</p>
    </div>
  </header>
  <main></main>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 3px solid $color-grey;
  width: 100%;
  @include breakpoint(desktop) {
    max-width: 43.75rem;
  }
  &,
  div {
    border-radius: 0.5rem;
    padding: 1rem 2rem;
  }
  h1 {
    font-weight: 700;
    font-size: 0;
  }
  div {
    display: grid;
    grid-template-rows: repeat(2, min-content);
    justify-items: center;
    align-self: stretch;
    background: $color-light-grey;
    h2 {
      grid-column: 1 / -1;
      color: $color-primary;
      font-weight: 400;
      font-size: 0.875rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    p {
      color: $color-dark-grey;
      font-weight: 700;
      font-size: 4rem;
      line-height: 1;
    }
  }
}
</style>
