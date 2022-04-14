<template>
    <div class="m-8 flex flex-col items-center">
        
        <h2 class="text-2xl">Welcome {{userName}}</h2>

        <div class="flex gap-4">
            <stats-card text="Projects tracked" :number="numberOfProjects"/>
            <stats-card text="Concepts used" :number="numberOfTags"/>
        </div>
    </div>
</template>

<script>
import StatsCard from './StatsCard.vue'
import users from '../service/users.js'
import projects from '../service/projects'

export default {
    components: {
        StatsCard
    },
    data() {
        return {
            userName: '',
            numberOfProjects: 0,
            numberOfTags: 0
        }
    },
    created() {
        users
            .get()
            .then(res => this.userName = res.name)
        projects
            .getAmount()
            .then(num => this.numberOfProjects = num)
        projects
            .getAll()
            .then(projects => 
            this.numberOfTags = projects.reduce(
                (tags,p) => tags+=p.tags.length
                ,0)
            )
    },
}
</script>