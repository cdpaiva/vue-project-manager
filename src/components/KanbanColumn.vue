<template>
  <div class="w-96 gap-2 border-2 border-slate-300">
    <div class="flex justify-around">
      <slot></slot>
      <button @click="displayNewTaskOverlay">Add new</button>
    </div>
    <draggable :list="tasks" item-key="index" group="cilantro">
      <div v-for="(task, index) in tasks" :key="index">
        <p>{{task}}</p>
      </div>
    </draggable>
  </div>
</template>

<script>
import KanbanTask from "./KanbanTask.vue";
import draggable from "vuedraggable";

export default {
  components: {
    KanbanTask,
    draggable,
  },
  props: {
    tasks: Array,
  },
  emits: [
    "increaseStatus",
    "decreaseStatus",
    "displayNewTaskOverlay",
    "removeTask",
  ],
  methods: {
    displayNewTaskOverlay() {
      this.$emit("displayNewTaskOverlay");
    },
    removeTask(id) {
      this.$emit("removeTask", id);
    },
  },
};
</script>