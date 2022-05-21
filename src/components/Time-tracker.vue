<template>
  <div class="wrapper-time-tracker rounded-full">
    <div>
      <div>04:01:56</div>
      <div><BaseButton title="Entrar" /></div>
    </div>
    <div class="separator rounded-full" />
    <div class="">
      <div class="avatar relative">
        <img class="w-10 h-10 rounded-full" src="@/assets/images/avatar.png" alt="" />
        <span class="top-0 absolute bg-green-400 rounded-full"></span>
      </div>
      <BaseDownDropButton />
    </div>
  </div>
</template>

<script>
import BaseButton from "./Base/BaseButton.vue";
import BaseDownDropButton from "./Base/BaseDownDropButton.vue";
export default {
  components: { BaseButton, BaseDownDropButton },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrapper-time-tracker {
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  justify-content: center;
  background-color: lightgray;
  width: 30vw;
  height: 55px;
  margin: 0 auto;
  column-gap: 10px;
  > div {
    display: grid;
    align-items: center;
  }
  .separator {
    width: 1px;
    height: 60%;
    margin: auto 0;
    background-color: gray;
  }
  > :first-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  > :last-child {
    display: grid;
    grid-template-columns: min-content 1fr;
  }

  .avatar {
    width: max-content;
    span {
      left: 35px;
      width: 10px;
      height: 10px;
    }
  }
}
</style>
