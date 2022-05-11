<template>
  <div class="border-b-2 border-slate-200 p-4 p w-full last:border-0">
    <div class="flex">
      <div class="flex-grow">
        <router-link class="text-3xl hover:underline decoration-orange-500" :to="`/kanban/${project.id}`">{{
          project.name
        }}</router-link>
        <p>{{ project.outline }}</p>
        <div class="flex">
          <div v-for="tag in project.tags" :key="tag">
            <Tag :name="`${tag}`" />
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center">
          <router-link :to="`/edit-project/${project.id}`" class="btn"
            >Edit</router-link
          >
          <button class="btn" @click="remove(project.id)">
            Delete
          </button>
          <button class="btn" @click="showDetails = !showDetails">
            {{ showDetails ? "Hide Details ↰" : "Details ↴" }}
          </button>
      </div>
    </div>

    <div class="m-2" v-if="showDetails">
      <h4 class="text-lg font-semibold">Project resume:</h4>
      <p>Description: {{ project.description }}</p>
      <p>Idea came from: {{ project.inspiration }}</p>
      <p>Percentage completed: {{ project.progress * 100 }}%</p>
      <p>Date of creation: {{ project.dateOfCreation }}</p>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag.vue";
import projectService from "../service/projects.js";

export default {
  props: {
    project: Object,
  },
  components: {
    Tag,
  },
  emits: ["updateList"],
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    remove(id) {
      if (confirm(`Please confirm deletion of ${this.project.name}`)) {
        projectService.remove(id).then(() => this.$emit("updateList", id));
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply text-blue-600 text-lg px-3;
}
.btn:hover {
  @apply underline decoration-orange-500 decoration-2;
}
</style>