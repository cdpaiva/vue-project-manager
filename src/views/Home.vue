<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-3/4">
      <user-summary
        :userName="userName"
        :numberOfProjects="numberOfProjects"
        :numberOfTags="numberOfTags"
      />
      <div class="flex justify-center mb-4">
        <router-link class="text-center border-solid border-2 border-slate-400 py-2 w-1/4 min-w-fit hover:bg-slate-100 hover:border-orange-500" to="/new-project">Add New Project</router-link>
      </div>
      <div class="border-2 border-slate-200 p-4">
        <project-list :projects="projects" @updateList="updateList" />
      </div>
    </div>
  </div>
</template>

<script>
import UserSummary from "../components/UserSummary.vue";
import ProjectList from "../components/ProjectList.vue";
import projectService from "../service/projects.js";
import userService from "../service/users.js";

export default {
  components: {
    UserSummary,
    ProjectList,
  },
  data() {
    return {
      projects: [],
      userName: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      projectService.getAll().then((projects) => (this.projects = projects));
      userService.get().then((res) => (this.userName = res.name));
    },
    updateList(id) {
      this.projects = this.projects.filter((p) => p.id !== id);
    },
  },
  computed: {
    numberOfProjects() {
      return this.projects.length;
    },
    numberOfTags() {
      return this.projects.reduce((tags, p) => (tags += p.tags.length), 0);
    },
  },
};
</script>