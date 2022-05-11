<template>
  <div class="h-screen">
    <TheNav />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNav from "./components/TheNav.vue";

export default {
  components: {
    TheNav,
  },
};
</script>

<style lang="postcss">
  .label {
    @apply block uppercase text-slate-700 font-bold;
  }

  .notification {
    @apply bg-green-200 border-2 rounded border-green-700 text-green-800 w-full max-w-2xl p-2 m-2;
  }

  .input {
    @apply block w-full border-2 border-white border-b-slate-300 mb-4 p-2 focus:bg-white focus:border-orange-500 focus:outline-none;
  }
</style>