<template>
  <div class="flex flex-col items-center">
    <h2 class="uppercase font-bold text-2xl m-12">New Project</h2>
    <div
      class="
        bg-green-200
        border-2
        rounded
        border-green-700
        text-green-800
        w-full
        max-w-2xl
        p-2
        m-2
      "
      v-if="displayMessage"
    >
    <div class="flex justify-between">
      <p>Project successfully created</p>
      <button @click="displayMessage = false">X</button>
    </div>
    <button class="underline hover:font-bold" @click="$router.push('/')">Return to Homepage</button>
    </div>
    <form class="w-full max-w-2xl">
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
      <div class="flex flex-wrap gap-4 m-4 ">
        <div v-for="t in tags" :key="t">
          <Tag class="inline" :name="t" />
          <button class="text-red-500 font-bold" @click.prevent="removeTag(t)">
            X
          </button>
        </div>
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
    <div class="flex gap-6">
      <button
        class="
          bg-blue-700
          border-2 border-gray-700
          rounded
          text-lg
          text-white
          px-4
          py-3
          mt-4
          hover:bg-slate-500 hover:text-white hover:border-slate-500
        "
        @click.prevent="createProject"
      >
        Create project
      </button>
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
      //TODO: remove initial values that are here just for debbuging
      name: "React Project",
      outline: "Small project using functional components",
      description: "Creates a CRUD application for phone contacts",
      inspiration: "Full Stack Helsinki Open Course 2022",
      tag: "",
      tags: ["React", "CRUD", "Functional Components"],
      dateOfCreation: "15-04-2022",
      displayMessage: false,
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