<template>
  <div class="border-2 border-slate-800 m-2">
    <div :class="cardTopStyle">
      <button class="btn-close font-bold mr-2" @click="removeTask">X</button>
    </div>
    <div class="p-2 pb-0">
      {{ task.task }}
    </div>
    <div class="flex justify-around p-2">
      <button
        v-if="task.status==='inProgress'"
        class="btn-cancel"
        @click="decreaseStatus"
      >
        Pause
      </button>

      <button
        v-if="task.status == 'todo'"
        class="btn"
        @click="increaseStatus"
      >
        Start
      </button>
      <button
        v-else-if="task.status == 'inProgress'"
        class="btn"
        @click="increaseStatus"
      >
        Finish
      </button>
      <button v-else class="btn-cancel" @click="decreaseStatus">Return</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  emits: ["increaseStatus", "decreaseStatus", "removeTask"],
  computed: {
    cardTopStyle() {
      const bgColors = {
        todo: "bg-yellow-300",
        inProgress: "bg-blue-300",
        done: "bg-green-300",
      };
      return `flex justify-end h-6 ${bgColors[this.task.status]}`;
    },
  },
  methods: {
    increaseStatus() {
      this.$emit("increaseStatus", this.task.id);
    },
    decreaseStatus() {
      this.$emit("decreaseStatus", this.task.id);
    },
    removeTask() {
      this.$emit("removeTask", this.task.id)
    }
  },
};
</script>

<style scoped>
.btn-cancel {
  @apply border-yellow-500 border-2 font-bold py-1 px-2 rounded;
}
.btn-cancel:hover {
  @apply hover:bg-yellow-500 text-white;
}
.btn {
  @apply border-blue-700 border-2 font-bold py-1 px-2 rounded;
}
.btn:hover {
  @apply hover:bg-blue-700 text-white;
}
</style>