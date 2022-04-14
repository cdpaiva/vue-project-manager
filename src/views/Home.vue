<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-3/4">
      <user-summary />
      <project-list />
    </div>
  </div>
</template>

<script>
import UserSummary from "../components/UserSummary.vue";
import ProjectList from "../components/ProjectList.vue";

export default {
  components: {
    UserSummary,
    ProjectList,
  },
};
</script>