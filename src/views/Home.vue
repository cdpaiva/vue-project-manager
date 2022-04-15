<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-3/4">
      <user-summary
        :userName="userName"
        :numberOfProjects="numberOfProjects"
        :numberOfTags="numberOfTags"
      />
      <div class="flex justify-center mb-4">
        <router-link class="text-center border-solid border-2 border-slate-400 bg-slate-300 p-4 w-1/4 hover:bg-slate-700 hover:text-white" to="/new-project">Add New Project</router-link>
      </div>
      <project-list :projects="projects" @updateList="updateList" />
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
      console.log("Reached Home, with id", id);
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