<template>
  <div class="border-2 border-slate-800 m-2">
    <div :class="cardTopStyle">
      <div class="text-sm font-bold pl-2">{{ task.id + 1 }}</div>
      <button class="btn-close" @click="removeTask">X</button>
    </div>
    <div class="p-2 pb-0">
      {{ task.task }}
    </div>
    <div class="flex justify-around p-2">
      <button
        v-if="task.status == 'inProgress'"
        class="btn-red"
        @click="decreaseStatus"
      >
        Pause
      </button>

      <button
        v-if="task.status == 'todo'"
        class="btn-red"
        @click="increaseStatus"
      >
        Start
      </button>
      <button
        v-else-if="task.status == 'inProgress'"
        class="btn-red"
        @click="increaseStatus"
      >
        Finish
      </button>
      <button v-else class="btn-red" @click="decreaseStatus">Return</button>
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
      return `flex justify-between h-6 ${bgColors[this.task.status]}`;
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
.btn-close {
  @apply text-gray-600 px-2;
}
.btn-red {
  @apply bg-red-500 text-white font-bold py-1 px-2 rounded;
}
.btn-red:hover {
  @apply hover:bg-red-700;
}
</style>