<template>
  <button
    class="w-full text-sm text-white font-bold py-2 px-4 rounded-full"
    @click="clickBtn"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: String,
    bgColor: String,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const clickBtn = () => {
      emit("click");
    };
    return { clickBtn };
  },
};
</script>

<style lang="scss" scoped>
button {
  width: 150px;
  background-color: v-bind(bgColor);
  transition: transform 0.5s;
  transform: scale(1);

  &:hover {
    transform: scale(1.02);
    transition: transform 0.5s;
  }
}
</style>
