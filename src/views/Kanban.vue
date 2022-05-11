<template>
  <div
    class="absolute w-full h-full z-10 bg-slate-600/75"
    v-if="displayOverlay"
  ></div>
  <div class="flex flex-col items-center w-full">
    <h1 class="text-2xl m-4">Kanban board for {{ projectName }}</h1>
    <KanbanTaskNew
      v-if="displayOverlay"
      @createTask="createTask"
      @close="cleanTaskForm"
    />
    <button @click="displayNewTaskOverlay">Add new task</button>
    <div class="flex gap-6 justify-center w-full">
      <div class="border-black border-2 w-1/4">
        <h3 class="text-center">To Do</h3>
        <draggable
          class="h-full"
          :sort="false"
          drag-class="border-black"
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

      <div class="border-black border-2 w-1/4">
        <h3 class="text-center">In Progress</h3>
        <draggable
          class="h-full"
          :sort="false"
          :list="inProgress"
          item-key="id"
          group="tasks"
          @change="statusInprogress"
        >
          <template #item="{ element }">
            <kanban-task :task="element" />
          </template>
        </draggable>
      </div>

      <div class="border-black border-2 w-1/4">
        <h3 class="text-center">Done</h3>
        <draggable
          class="h-full"
          :sort="false"
          :list="done"
          item-key="id"
          group="tasks"
          @change="statusDone"
        >
          <template #item="{ element }">
            <kanban-task :task="element" />
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
        const task = e.added.element
        task["status"] = "todo";
        this.updateKanbanOrder(task.id)
        taskService.update(task.id,task)
      }
    },
    statusInprogress(e) {
      if (e.added) {
        const task = e.added.element
        task["status"] = "inProgress";
        this.updateKanbanOrder(task.id)
        taskService.update(task.id,task)
      }
    },
    statusDone(e) {
      if (e.added) {
        const task = e.added.element
        task["status"] = "done";
        this.updateKanbanOrder(task.id)
        taskService.update(task.id,task)
      }
    },
    updateKanbanOrder(id) {
      this.kanban = [...this.kanban.filter(t => t.id !== id),this.kanban.find(t => t.id === id)]
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