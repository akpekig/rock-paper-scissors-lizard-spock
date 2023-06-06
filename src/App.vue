<script setup lang="ts">
import { computed } from 'vue';

import IconBonusLogo from '@/components/icons/IconBonusLogo.vue';
import IconLogo from '@/components/icons/IconLogo.vue';
import { useGameStore } from '@/stores/game';

import PlayGame from './components/PlayGame.vue';
import RulesModal from './components/RulesModal.vue';
import WeaponSelection from './components/WeaponSelection.vue';

const game = useGameStore();
const mode = computed(() => (game.mode ? 'Bonus' : 'Normal'));
</script>

<template>
  <header>
    <h1><component :is="game.mode ? IconBonusLogo : IconLogo" /></h1>
    <div>
      <h2>Score</h2>
      <p>{{ game.score }}</p>
    </div>
  </header>
  <main>
    <WeaponSelection v-if="game.state == 0" />
    <PlayGame v-else />
  </main>
  <footer>
    <button @click="game.toggleMode" class="button" aria-label="mode">{{ mode }}</button>
    <RulesModal />
  </footer>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: 3px solid $color-grey;
  width: 100%;
  @include breakpoint(desktop) {
    max-width: 43.75rem;
  }
  &,
  div {
    border-radius: $border-radius;
    padding: $small-padding;
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
    background: $color-white;
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
footer {
  display: flex;
  @include spacedCenterColumn;
  align-items: stretch;
  @include breakpoint(desktop) {
    margin-left: auto;
  }
}
</style>
