<template>
  <div class="flex flex-col items-center">
    <h2 class="uppercase text-slate-700 font-bold text-2xl m-12">New Project</h2>
    <div class="notification" v-if="displayMessage">
      <div class="flex justify-between">
        <p>Project successfully created</p>
        <button @click="displayMessage = false">X</button>
      </div>
      <button 
        class="underline hover:font-bold" 
        @click="$router.push('/')">
      Return to Homepage
      </button>
    </div>
    <form class="w-3/4">
      <div>
        <label class="label" for="name">Project Name</label>
        <input
          class="input"
          type="text"
          name="name"
          id="name"
          v-model="name"
        />
      </div>
      <div>
        <label class="label" for="resume">Resume</label>
        <input
          class="input"
          type="text"
          name="resume"
          id="resume"
          v-model="outline"
        />
      </div>
      <div>
        <label class="label" for="description">Description</label>
        <input
          class="input"
          type="text"
          name="description"
          id="description"
          v-model="description"
        />
      </div>
      <div>
        <label class="label" for="inspiration">
          Where this idea came from?
        </label>
        <input
          class="input"
          type="text"
          name="inspiration"
          id="inspiration"
          v-model="inspiration"
        />
      </div>
      <div>
        <label class="label" for="tag">Tags</label>
        <input
          class="w-3/4 border-2 border-white border-b-slate-300 mb-2 p-2 focus:bg-white focus:border-b-white"
          type="text"
          name="tag"
          id="tag"
          v-model="tag"
        />
        <button
          @click.prevent="addTag"
          class="w-1/5 bg-white border-2 border-slate-400 py-2 ml-4 hover:border-slate-700 hover:bg-slate-400">
          Add tag
        </button>
      </div>
      <div class="flex flex-wrap gap-4 my-6">
        <div v-for="t in tags" :key="t">
          <Tag class="inline" :name="t" />
          <button 
            class="text-red-500 font-bold" 
            @click.prevent="removeTag(t)">
            X
          </button>
        </div>
      </div>
      <div>
        <label class="label" for="date">Date of Creation</label>
        <input
          class="block bg-slate-200 mb-2 p-2"
          type="date"
          name="date"
          id="date"
          v-model="dateOfCreation"
        />
      </div>
    </form>
    <div class="flex gap-6">
      <button
        class="bg-white border-2 border-slate-700 py-3 px-4 ml-4 hover:bg-slate-400"
        @click.prevent="createProject"
      >
        Create project
      </button>
      <button
        class="bg-white border-2 border-slate-700 py-3 px-4 hover:bg-slate-400"
        @click="$router.push('/')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import projectService from "../service/projects.js";
import Tag from "../components/Tag.vue";

export default {
  components: {
    Tag,
  },
  data() {
    return {
      name:'',
      outline:'',
      description:'',
      inspiration:'',
      tag:'',
      tags:[],
      dateOfCreation:'',
      displayMessage:false,
    };
  },
  methods: {
    addTag() {
      if(!this.tag){
        return
      }
      this.tags.push(this.tag);
      this.tag = "";
    },
    removeTag(tag) {
      this.tags = this.tags.filter((t) => t !== tag);
      this.tag = "";
    },
    createProject() {
      const project = {
        name: this.name,
        outline: this.outline,
        description: this.description,
        inspiration: this.inspiration,
        tags: this.tags,
        progress: 0,
        dateOfCreation: this.dateOfCreation,
      };
      projectService.create(project).then(() => this.toggleDisplayMessage());
    },
    toggleDisplayMessage() {
      this.displayMessage = !this.displayMessage;
    },
  },
};
</script>
