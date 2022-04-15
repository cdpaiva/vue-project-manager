<template>
  <h2>New Project form page</h2>
  <div class="flex flex-col items-center">
    <form class="w-full max-w-lg">
      <div>
        <label class="block uppercase text-gray-700 font-bold mb-2" for="name"
          >Project Name</label
        >
        <input
          class="block w-full bg-gray-200 rounded mb-2 p-2 focus:bg-white"
          type="text"
          name="name"
          id="name"
          v-model="name"
        />
      </div>
      <div>
        <label class="block uppercase text-gray-700 font-bold mb-2" for="resume"
          >Resume</label
        >
        <input
          class="block w-full bg-gray-200 rounded mb-2 p-2 focus:bg-white"
          type="text"
          name="resume"
          id="resume"
          v-model="outline"
        />
      </div>
      <div>
        <label
          class="block uppercase text-gray-700 font-bold mb-2"
          for="description"
          >Description</label
        >
        <input
          class="block w-full bg-gray-200 rounded mb-2 p-2 focus:bg-white"
          type="text"
          name="description"
          id="description"
          v-model="description"
        />
      </div>
      <div>
        <label
          class="block uppercase text-gray-700 font-bold mb-2"
          for="inspiration"
          >Where this idea came from?</label
        >
        <input
          class="block w-full bg-gray-200 rounded mb-2 p-2 focus:bg-white"
          type="text"
          name="inspiration"
          id="inspiration"
          v-model="inspiration"
        />
      </div>
      <div>
        <label class="block uppercase text-gray-700 font-bold mb-2" for="tag"
          >Tags</label
        >
        <input
          class="w-3/4 bg-gray-200 rounded mb-2 p-2 focus:bg-white"
          type="text"
          name="tag"
          id="tag"
          v-model="tag"
        />
        <button
          @click.prevent="addTag"
          class="
            w-1/5
            bg-white
            border-2 border-gray-700
            rounded
            p-2
            ml-4
            hover:bg-slate-500 hover:text-white hover:border-slate-500
          "
        >
          Add tag
        </button>
      </div>
      <div>
        <p v-for="t in tags" :key="t">
          {{ t }} <button @click.prevent="removeTag(t)">X</button>
        </p>
      </div>
      <div>
        <label class="block uppercase text-gray-700 font-bold mb-2" for="date"
          >Date of Creation</label
        >
        <input
          class="block bg-gray-200 rounded mb-2 p-2 focus:bg-white"
          type="date"
          name="date"
          id="date"
          v-model="dateOfCreation"
        />
      </div>
    </form>
    <button
      class="
        bg-white
        border-2 border-gray-700
        rounded
        text-lg
        px-4
        py-3
        mt-4
        hover:bg-slate-500 hover:text-white hover:border-slate-500
      "
      @click.prevent="createProject"
    >
      Create project
    </button>
    <div>
      <p>Project being created with:</p>
      {{ name }}
      {{ outline }}
      {{ description }}
      {{ inspiration }}
      {{ tags }}
      {{ dateOfCreation }}
    </div>
  </div>
</template>

<script>
import projectService from '../service/projects.js'

export default {
  data() {
    return {
      //TODO: remove initial values that are here just for debbuging
      name: "React Project",
      outline: "Small project using functional components",
      description: "Creates a CRUD application for phone contacts",
      inspiration: "Full Stack Helsinki Open Course 2022",
      tag: "",
      tags: ["React", "CRUD", "Functional Components"],
      dateOfCreation: "15-04-2022",
    };
  },
  methods: {
    addTag() {
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
        percentage: 0,
        dateOfCreation: this.dateOfCreation,
      };
      projectService.create(project)
    },
  },
};
</script>