<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-3/4">
      <user-summary
        :userName="userName"
        :numberOfProjects="numberOfProjects"
        :numberOfTags="numberOfTags"
      />
      <project-list :projects="projects" />
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
      userName: ''
    };
  },
  created() {
    projectService
      .getAll()
      .then((projects) => (this.projects = projects));
    userService
      .get()
      .then((res) => (this.userName = res.name));
  },
  computed: {
    numberOfProjects() {
      return this.projects.length
    },
    numberOfTags() {
      return this.projects.reduce(
                (tags,p) => tags+=p.tags.length
                ,0)
    }
  }
};
</script>