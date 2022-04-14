<template>
    <Project v-for="project in projects" :key="project.id" :project="project"/>
</template>

<script>
import Project from './Project.vue'
import projects from '../service/projects.js'

export default {
    components: {
        Project
    },
    data() {
        return {
            projects: []
        }
    },
    created() {
        projects
            .getAll()
            .then(projects => this.projects = projects)
    }
}
</script>