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

export default {
    components: {
        StatsCard
    },
    props: {
        userName: {
            type: String,
            required: true
        },
        numberOfProjects: {
            type: Number, 
            required: true
        },
        numberOfTags: {
            type: Number,
            required: true
        }
    }
}
</script>