<template>
  <div
    v-if="dataEmployee"
    class="wrapper-time-tracker rounded-full"
    :class="{
      'wrapper-time-tracker--big': isEmployeeOnline,
    }"
  >
    <div>
      <div>04:01:56 / 04:01:56</div>
      <div class="btn-wrapper">
        <div v-if="!isEmployeeOnline">
          <BaseButton title="Entrar" bgColor="#5EBDA2" @click="clockInEmployee" />
        </div>
        <div v-else>
          <BaseButton title="Pausar" bgColor="#B5B5B5" @click="clockInEmployee" />
        </div>
        <div class="hidden-btn" :class="{ 'hidden-btn--show': isEmployeeOnline }">
          <BaseButton title="Salir" bgColor="#FF9984" @click="clockOutEmployee" />
        </div>
      </div>
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
import { getWorkerStatus, clockOut, clockIn } from "@/utils/api.js";
export default {
  components: { BaseButton, BaseDownDropButton },
  setup() {
    let dataEmployee = ref(undefined);
    let workEntry = ref({
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    });
    let currentTimeOnline = ref(undefined);
    let totalTimeClockIn = ref(undefined);
    let isEmployeeOnline = computed(() => {
      return dataEmployee.value.employee.workStatus === "online";
    });
    onBeforeMount(() => {
      getWorkerStatus().then(({ data }) => {
        dataEmployee.value = data.data[0];
      });
    });
    const clockInEmployee = () => {
      console.log(dataEmployee.value);
      clockIn(dataEmployee.value.employee.id, workEntry.value).then(({ data }) => {
        dataEmployee.value = data.data;
      });
    };
    const clockOutEmployee = () => {
      clockOut(dataEmployee.value.employee.id, workEntry.value).then(({ data }) => {
        dataEmployee.value = data.data;
        console.log(data);
      });
    };
    return {
      dataEmployee,
      isEmployeeOnline,
      currentTimeOnline,
      totalTimeClockIn,
      clockInEmployee,
      clockOutEmployee,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper-time-tracker {
  display: grid;
  grid-template-columns: max-content min-content 1fr;
  justify-content: center;
  background-color: #e7e7e7;
  width: 30vw;
  height: 55px;
  margin: 0 auto;
  column-gap: 10px;
  transition: all 0.5s;
  padding: 10px;
  &--big {
    transition: all 0.5s;

    width: 40vw;
  }
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
    grid-template-columns: auto 1fr;
    column-gap: 10px;
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
.btn-wrapper {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  .hidden-btn {
    width: 0px;
    overflow: hidden;
    transition: width 0.5s;
    &--show {
      transition: width 0.5s;

      width: 150px;
      // overflow: visible;
    }
  }
}
.online-employee {
  display: grid;
  grid-template-columns: max-content 1fr !important;
  > div:last-child {
    display: grid;
    grid-template-columns: 1fr 1fr !important;
  }
}
</style>
