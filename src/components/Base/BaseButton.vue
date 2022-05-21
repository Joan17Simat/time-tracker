<template>
  <button
    class="w-full bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded-full"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: String,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
