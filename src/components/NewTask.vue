<template>
  <div
    class="
      absolute
      left-1/4
      top-1/4
      border-slate-900 border-2
      bg-slate-200
      w-1/2
      p-2
    "
  >
    <h3 class="text-center font-extrabold text-2xl text-gray-700">
      Add new task
    </h3>
    <form>
      <label for="task" class="block uppercase text-gray-700 font-bold mb-2"
        >Task Name</label
      >
      <input class="w-full h-8 mb-2" type="text" id="task" v-model="taskName" />
      <div class="block">
        <p class="mb-2">Status of the task:</p>
        <label for="todo" class="uppercase text-gray-700 font-bold my-2 mr-1">
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
          class="uppercase text-gray-700 font-bold my-2 ml-4 mr-1"
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
          class="uppercase text-gray-700 font-bold my-2 ml-4 mr-1"
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
          class="
            border-slate-900 border-2
            text-slate
            font-bold
            py-1
            px-2
            rounded
            hover:bg-slate-500
          "
          @click="createTask"
        >
          Create Task
        </button>
        <button
          class="
            border-slate-900 border-2
            text-slate
            font-bold
            py-1
            px-2
            rounded
            hover:bg-slate-500
          "
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