<template>
  <div
    class="absolute w-full h-full z-10 bg-slate-600/75"
    v-if="displayOverlay"
  ></div>
  <div class="flex flex-col items-center w-full">
    <h1 class="text-3xl m-4">Kanban board for {{ projectName }}</h1>
    <KanbanTaskNew
      v-if="displayOverlay"
      @createTask="createTask"
      @close="cleanTaskForm"
    />
    <button
      class="text-center border-solid border-2 border-slate-400 py-2 w-1/5 min-w-fit hover:bg-slate-400 hover:border-slate-700 mb-4"
      @click="displayNewTaskOverlay"
    >
      Add new task
    </button>
    <div class="flex gap-6 justify-center w-full">
      <div class="bg-slate-100 w-1/4">
        <h3 class="title">To Do</h3>
        <draggable
          class="h-full"
          :sort="false"
          :list="todo"
          group="tasks"
          item-key="id"
          @change="statusTodo"
        >
          <template #item="{ element }">
            <kanban-task :task="element" @removeTask="removeTask" />
          </template>
        </draggable>
      </div>

      <div class="bg-slate-100 w-1/4">
        <h3 class="title">In Progress</h3>
        <draggable
          class="h-full"
          :sort="false"
          :list="inProgress"
          item-key="id"
          group="tasks"
          @change="statusInprogress"
        >
          <template #item="{ element }">
            <kanban-task :task="element" @removeTask="removeTask"/>
          </template>
        </draggable>
      </div>

      <div class="bg-slate-100 w-1/4">
        <h3 class="title">Done</h3>
        <draggable
          class="h-full"
          :sort="false"
          :list="done"
          item-key="id"
          group="tasks"
          @change="statusDone"
        >
          <template #item="{ element }">
            <kanban-task :task="element" @removeTask="removeTask"/>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanColumn from "../components/KanbanColumn.vue";
import KanbanTaskNew from "../components/KanbanTaskNew.vue";
import taskService from "../service/tasks";
import projectService from "../service/projects";
import draggable from "vuedraggable";
import KanbanTask from "../components/KanbanTask.vue";

export default {
  components: {
    KanbanColumn,
    KanbanTaskNew,
    draggable,
    KanbanTask,
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
  computed: {
    todo() {
      return this.kanban.filter((t) => t.status === "todo");
    },
    inProgress() {
      return this.kanban.filter((t) => t.status === "inProgress");
    },
    done() {
      return this.kanban.filter((t) => t.status === "done");
    },
  },
  created() {
    taskService.getByProjectId(this.id).then((k) => (this.kanban = k));
    projectService.getById(this.id).then((p) => (this.projectName = p.name));
  },
  methods: {
    statusTodo(e) {
      if (e.added) {
        const task = e.added.element;
        task["status"] = "todo";
        this.updateKanbanOrder(task.id);
        taskService.update(task.id, task);
      }
    },
    statusInprogress(e) {
      if (e.added) {
        const task = e.added.element;
        task["status"] = "inProgress";
        this.updateKanbanOrder(task.id);
        taskService.update(task.id, task);
      }
    },
    statusDone(e) {
      if (e.added) {
        const task = e.added.element;
        task["status"] = "done";
        this.updateKanbanOrder(task.id);
        taskService.update(task.id, task);
      }
    },
    updateKanbanOrder(id) {
      this.kanban = [
        ...this.kanban.filter((t) => t.id !== id),
        this.kanban.find((t) => t.id === id),
      ];
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
      if (confirm("Please confirm you want to delete this task:")) {
        taskService
          .remove(id)
          .then(() => (this.kanban = this.kanban.filter((k) => k.id !== id)));
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
  .title {
    @apply text-center text-2xl py-2 font-bold
  }
</style>