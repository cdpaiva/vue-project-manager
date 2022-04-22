<template>
  <div class="flex flex-col items-center w-full">
    <h1 class="text-2xl m-4">Kanban board for {{ projectName }}</h1>
    <div
      class="absolute left-1/4 top-1/4 w-1/2 bg-amber-600"
      v-if="displayOverlay"
    >
      <h3>Add new task</h3>
      <form>
        <label for="task">Task Name</label>
        <input type="text" id="task" v-model="taskName"/>
        <div class="block">
          <label for="todo"> Todo</label>
          <input type="radio" id="todo" name="task" value="todo" v-model="taskStatus" />
          <label for="inProgress"> In Progress</label>
          <input type="radio" id="inProgress" name="task" value="inProgress" v-model="taskStatus" />
          <label for="done"> Done</label>
          <input type="radio" id="done" name="task" value="done" v-model="taskStatus" />
        </div>
        <button @click="createTask">Create Task</button>
        <button @click="displayOverlay=false">Cancel</button>
      </form>
    </div>
    <div class="flex gap-6">
      <KanbanColumn
        :tasks="todo"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        @displayNewTaskOverlay="displayNewTaskOverlay"
        >Todo</KanbanColumn
      >
      <KanbanColumn
        :tasks="inProgress"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        @displayNewTaskOverlay="displayNewTaskOverlay"
        >In Progress</KanbanColumn
      >
      <KanbanColumn
        :tasks="done"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        @displayNewTaskOverlay="displayNewTaskOverlay"
        >Done</KanbanColumn
      >
    </div>
  </div>
</template>

<script>
import KanbanColumn from "../components/KanbanColumn.vue";
import taskService from "../service/tasks";
import projectService from "../service/projects";

export default {
  components: {
    KanbanColumn,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      kanban: [],
      projectName: "",
      displayOverlay: false,
      taskStatus: "todo",
      taskName: ""
    };
  },
  created() {
    taskService.getByProjectId(this.id).then(k => this.kanban = k)
    projectService
      .getById(this.id)
      .then((p) => (this.projectName = p.name));
  },
  computed: {
    todo() {
      return this.kanban.filter((k) => k.status === "todo");
    },
    inProgress() {
      return this.kanban.filter((k) => k.status === "inProgress");
    },
    done() {
      return this.kanban.filter((k) => k.status === "done");
    },
  },
  methods: {
    increaseStatus(id) {
      let currentStatus = this.kanban[id].status;

      if (currentStatus === "done") {
        return;
      }
      if (currentStatus === "inProgress") {
        this.kanban[id].status = "done";
      } else if (currentStatus === "todo") {
        this.kanban[id].status = "inProgress";
      }
    },
    decreaseStatus(id) {
      let currentStatus = this.kanban[id].status;

      if (currentStatus === "todo") {
        return;
      }
      if (currentStatus === "inProgress") {
        this.kanban[id].status = "todo";
      } else if (currentStatus === "done") {
        this.kanban[id].status = "inProgress";
      }
    },
    displayNewTaskOverlay() {
      this.displayOverlay = true;
    },
    createTask() {
      let newTask = {
        task: this.taskName,
        status: this.taskStatus
      }
      projectService
        .createTask(this.id, newTask)
      
      projectService.getKanbanById(this.id).then((k) => (this.kanban = k))

    }
  },
};
</script>