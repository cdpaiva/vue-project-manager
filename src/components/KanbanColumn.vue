<template>
  <div class="w-96 gap-2 border-2 border-slate-300">
    <div class="flex justify-around">
      <slot></slot>
      <button>Add new</button>
    </div>
    <div v-for="(task, index) in tasks" :key="index">
      <KanbanTask :task=task @increase-status="increaseStatus" @decrease-status="decreaseStatus" />
    </div>
  </div>
</template>

<script>
import KanbanTask from "./KanbanTask.vue";

export default {
  components: {
    KanbanTask,
  },
  props: {
    tasks: Array,
  },
  emits: [
    'increaseStatus',
    'decreaseStatus'
  ],
  methods: {
    increaseStatus(id) {
      this.$emit("increaseStatus", id)
    },
    decreaseStatus(id) {
      this.$emit("decreaseStatus", id)
    }
  }
};
</script>