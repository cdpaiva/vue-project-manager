<template>
  <div class="border-solid border-2 border-slate-400 bg-slate-300 p-4 mb-2 w-full">
    <div class="pl-4 border-solid border-l-4 border-slate-900">
      <div class="flex">
        <div class="flex-grow">
          <router-link class="text-3xl" :to="`/kanban/${project.id}`">{{ project.name }}</router-link>
          <p>{{ project.outline }}</p>
          <div class="flex">
            <div v-for="tag in project.tags" :key="tag">
              <tag :name="`${tag}`" />
            </div>
          </div>
        </div>

        <div class="flex-1">
          <div class="h-full flex flex-col justify-between">
            <div class="flex justify-end gap-2">
              <button class="btn-yellow">Edit</button>
              <button class="btn-red">Delete</button>
            </div>
            <div class="flex justify-end">
              <button class="btn-blue" @click="showDetails = !showDetails">
                {{ showDetails ? "Hide" : "" }} Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-2" v-if="showDetails">
      <h4 class="text-lg font-semibold">Project resume:</h4>
      <p>Description: {{ project.description }}</p>
      <p>Idea came from: {{ project.inspiration }}</p>
      <p>Percentage completed: {{ project.progress * 100 }}%</p>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag.vue";

export default {
  props: {
    project: Object,
  },
  components: {
    Tag,
  },
  data() {
    return {
      showDetails: false,
    };
  },
};
</script>

<style scoped>
.btn-blue {
  @apply bg-blue-500 text-white font-bold py-1 px-2 rounded;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
.btn-yellow {
  @apply bg-yellow-500 text-white font-bold py-1 px-2 rounded;
}
.btn-yellow:hover {
  @apply bg-yellow-700;
}
.btn-red {
  @apply bg-red-500 text-white font-bold py-1 px-2 rounded;
}
.btn-red:hover {
  @apply hover:bg-red-700;
}
</style>