<template>
  <div
    class="
      absolute
      left-1/4
      top-1/4
      bg-white
      w-1/2
      p-2
      z-20
    "
  >
    <h3 class="text-center font-bold text-2xl">
      Add new task
    </h3>
    <form>
      <label for="task" class="label"
        >Task Name</label
      >
      <input class="input" type="text" id="task" v-model="taskName" />
      <div class="block">
        <p class="label mb-4">Status of the task:</p>
        <label for="todo" class="mr-2">
          Todo</label
        >
        <input
          type="radio"
          id="todo"
          name="task"
          value="todo"
          v-model="taskStatus"
        />
        <label
          for="inProgress"
          class="ml-4 mr-2"
        >
          In Progress</label
        >
        <input
          type="radio"
          id="inProgress"
          name="task"
          value="inProgress"
          v-model="taskStatus"
        />
        <label
          for="done"
          class="ml-4 mr-2"
        >
          Done</label
        >
        <input
          type="radio"
          id="done"
          name="task"
          value="done"
          v-model="taskStatus"
        />
      </div>
      <div class="flex justify-center gap-8 mt-4">
        <button
          class="bg-white border-2 border-slate-400 py-2 px-3 ml-4 hover:bg-slate-200 hover:border-orange-500"
          @click="createTask"
        >
          Create Task
        </button>
        <button
          class="bg-white border-2 border-slate-400 py-2 px-3 ml-4 hover:bg-slate-200"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["createTask", "close"],
  data() {
    return {
      taskName: "",
      taskStatus: "todo",
    };
  },
  methods: {
    createTask() {
      let newTask = {
        task: this.taskName,
        status: this.taskStatus,
      };
      this.$emit("createTask", newTask);
    },
  },
};
</script>