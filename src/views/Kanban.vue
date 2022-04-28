<template>
  <div
    class="absolute w-full h-full z-10 bg-slate-600/75"
    v-if="displayOverlay"
  ></div>
  <div class="flex flex-col items-center w-full">
    <h1 class="text-2xl m-4">Kanban board for {{ projectName }}</h1>
    <new-task
      v-if="displayOverlay"
      @createTask="createTask"
      @close="cleanTaskForm"
    />
    <div class="flex gap-6">
      <KanbanColumn
        :tasks="todo"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        @displayNewTaskOverlay="displayNewTaskOverlay"
        @removeTask="removeTask"
        >Todo</KanbanColumn
      >
      <KanbanColumn
        :tasks="inProgress"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        @displayNewTaskOverlay="displayNewTaskOverlay"
        @removeTask="removeTask"
        >In Progress</KanbanColumn
      >
      <KanbanColumn
        :tasks="done"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        @displayNewTaskOverlay="displayNewTaskOverlay"
        @removeTask="removeTask"
        >Done</KanbanColumn
      >
    </div>
  </div>
</template>

<script>
import KanbanColumn from "../components/KanbanColumn.vue";
import NewTask from "../components/NewTask.vue";
import taskService from "../service/tasks";
import projectService from "../service/projects";

export default {
  components: {
    KanbanColumn,
    NewTask,
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
      taskName: "",
    };
  },
  created() {
    taskService.getByProjectId(this.id).then((k) => (this.kanban = k));
    projectService.getById(this.id).then((p) => (this.projectName = p.name));
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
      let selectedKanban = this.kanban.find((k) => k.id === id);
      let currentStatus = selectedKanban.status;

      if (currentStatus === "done") {
        return;
      }
      if (currentStatus === "inProgress") {
        selectedKanban.status = "done";
      } else if (currentStatus === "todo") {
        selectedKanban.status = "inProgress";
      }
      this.kanban = [selectedKanban, ...this.kanban.filter((k) => k.id !== id)];
    },
    decreaseStatus(id) {
      let selectedKanban = this.kanban.find((k) => k.id === id);
      let currentStatus = selectedKanban.status;

      if (currentStatus === "todo") {
        return;
      }
      if (currentStatus === "inProgress") {
        selectedKanban.status = "todo";
      } else if (currentStatus === "done") {
        selectedKanban.status = "inProgress";
      }
      this.kanban = [selectedKanban, ...this.kanban.filter((k) => k.id !== id)];
    },
    displayNewTaskOverlay() {
      this.displayOverlay = true;
    },
    cleanTaskForm() {
      this.displayOverlay = false;
      this.taskName = "";
      this.status = "todo";
    },
    createTask(task) {
      let newTask = { project: this.id, ...task };
      taskService.create(newTask).then((t) => {
        this.kanban.push(t);
        this.cleanTaskForm();
      });
    },
    removeTask(id) {
      taskService
        .remove(id)
        .then(() => (this.kanban = this.kanban.filter((k) => k.id !== id)));
    },
  },
};
</script>