<template>
    <Project v-for="project in projects" :key="project.id" :project="project" 
    @updateList="updateList"/>
</template>

<script>
import Project from './Project.vue'

export default {
    components: {
        Project
    },
    emits: [
    'updateList'
    ],
    props: {
        projects : {
            type: Array,
            required: true
        }
    },
    methods: {
        updateList(id) {
            this.$emit('updateList', id)
        }
    }
}
</script>