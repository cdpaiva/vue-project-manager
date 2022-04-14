<template>
  <div class="flex flex-col items-center w-full">
    <h1 class="text-2xl m-4">Kanban board for {{ projectName }}</h1>
    <div class="flex gap-6">
      <KanbanColumn
        :tasks="todo"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        >Todo</KanbanColumn
      >
      <KanbanColumn
        :tasks="inProgress"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        >In Progress</KanbanColumn
      >
      <KanbanColumn
        :tasks="done"
        @increase-status="increaseStatus"
        @decreaseStatus="decreaseStatus"
        >Done</KanbanColumn
      >
    </div>
  </div>
</template>

<script>
import KanbanColumn from "../components/KanbanColumn.vue";
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
    };
  },
  created() {
    projectService
        .getKanbanById(this.id)
        .then((k) => (this.kanban = k));
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
  },
};
</script>