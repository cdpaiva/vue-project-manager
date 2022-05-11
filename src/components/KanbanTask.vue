<template>
  <div class="border-2 border-slate-800 m-2">
    <div class="flex justify-end">
      <button class="btn-close font-bold mr-2" @click="removeTask">X</button>
    </div>
    <div class="p-1">
      {{ task.task }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  emits: ["removeTask"],
  methods: {
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