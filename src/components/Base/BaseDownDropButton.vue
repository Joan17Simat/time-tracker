<template>
  <div class="relative">
    <div class="downdrop-btn" @click="showFirstMenu = !showFirstMenu">
      <slot name="btn-drop-down" :showFirstMenu="showFirstMenu"></slot>
    </div>

    <div>
      <div v-if="showFirstMenu" class="first-menu shadow-xl bg-white border rounded-2xl">
        <slot name="menu-drop" :showFirstMenu="showFirstMenu"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    let showFirstMenu = ref(false);
    return { showFirstMenu };
  },
};
</script>

<style lang="scss" scoped>
.downdrop-btn {
  display: grid;
  cursor: pointer;
  grid-template-columns: max-content max-content;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  p {
    user-select: none;
    font-weight: bolder;
  }
}
.first-menu {
  position: absolute;
  top: 50px;
  right: 25px;
  width: 250px;
  .item-menu {
    display: grid;
    align-items: center;
    grid-template-columns: max-content auto;
    img {
      transition: transform 0.5s;
      transform: rotate(0deg);
    }

    .rotate-icon-arrow {
      transition: transform 0.5s;

      transform: rotate(90deg);
    }
    .hidde-icon-left {
      visibility: hidden;
    }
  }
}
</style>
