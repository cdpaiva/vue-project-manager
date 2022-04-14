<template>
    <Project v-for="project in projects" :key="project.id" :project="project"/>
</template>

<script>
import Project from './Project.vue'

export default {
    components: {
        Project
    },
    props: {
        projects : {
            type: Array,
            required: true
        }
    }
}
</script>