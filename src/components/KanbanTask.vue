<template>
  <div class="border-2 border-slate-400 m-2">
    <div class="flex justify-end">
      <button class="font-bold mr-2" @click="removeTask">X</button>
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