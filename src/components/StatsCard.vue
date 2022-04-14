<template>
  <div class="flex flex-col items-center m-2 p-2 border-solid border-slate-400 border-2 bg-slate-300">
    <div class="text-3xl">
      {{ number }}
    </div>
    <div>
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    number: Number,
  },
};
</script>