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