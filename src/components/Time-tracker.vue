<template>
  <div
    v-if="dataEmployee"
    class="wrapper-time-tracker rounded-full"
    :class="{
      'wrapper-time-tracker--big': isEmployeeOnline,
    }"
  >
    <div>
      <div v-if="isEmployeeOnline">
        {{ currentTimeOnline }}
        <span class="text-sm text-gray-600">/ {{ totalTimeClockIn }}</span>
      </div>
      <div v-else>{{ lastDurationClockIn }}</div>
      <div class="btn-wrapper">
        <div v-if="!isEmployeeOnline">
          <BaseButton title="Entrar" bgColor="#5EBDA2" @click="clockInEmployee" />
        </div>
        <div v-else>
          <BaseButton
            :title="isPausedCurrentTime ? 'Seguir' : 'Pausar'"
            :bgColor="isPausedCurrentTime ? '#7BCCEF' : '#B5B5B5'"
            @click="pauseContinueCronoCurrentTime"
          />
        </div>
        <div class="hidden-btn" :class="{ 'hidden-btn--show': isEmployeeOnline }">
          <BaseButton title="Salir" bgColor="#FF9984" @click="clockOutEmployee" />
        </div>
      </div>
    </div>

    <div class="separator rounded-full" />
    <div>
      <div class="avatar relative">
        <img
          class="w-10 h-10 rounded-full"
          src="@/assets/images/avatar.png"
          alt="avatar"
        />
        <span :class="`top-0 absolute bg-${colorStatusEmployee}-400 rounded-full`"></span>
      </div>
      <BaseDownDropButton />
    </div>
  </div>
</template>

<script>
import BaseButton from "./Base/BaseButton.vue";
import BaseDownDropButton from "./Base/BaseDownDropButton.vue";
import { getWorkerStatus, clockOut, clockIn } from "@/utils/api.js";
import moment from "moment-timezone";
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
    let colorStatusEmployee = computed(() => {
      if (isPausedCurrentTime.value) {
        return "gray";
      } else {
        return dataEmployee.value.employee.workStatus === "online" ? "green" : "red";
      }
    });
    let isEmployeeOnline = computed(() => {
      return dataEmployee.value.employee.workStatus === "online";
    });
    let currentTimeOnline = ref(moment("00:00:00", "HH:mm:ss").format("HH:mm:ss"));
    let lastDurationClockIn = ref(moment("00:00:00", "HH:mm:ss").format("HH:mm:ss"));
    let totalTimeClockIn = ref(moment("00:00:00", "HH:mm:ss").format("HH:mm:ss"));
    let intervalCurrentTime = ref(undefined);
    let intervalTotalTime = ref(undefined);

    let isPausedCurrentTime = ref(false);
    onBeforeMount(() => {
      getWorkerStatus().then(({ data }) => {
        dataEmployee.value = data.data[0];
      });
    });
    const clockInEmployee = () => {
      clockIn(dataEmployee.value.employee.id, workEntry.value).then(({ data }) => {
        dataEmployee.value = data.data;

        let dateWorkEntryIn = moment(dataEmployee.value.workEntryIn.date).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        intervalTotalTime.value = setInterval(() => {
          totalTimeClockIn.value = moment
            .utc(moment().diff(moment(dateWorkEntryIn, "DD/MM/YYYY HH:mm:ss")))
            .format("HH:mm:ss");
        }, 1000);

        intervalCurrentTime.value = setInterval(() => {
          currentTimeOnline.value = moment(currentTimeOnline.value, "HH:mm:ss")
            .add(1, "seconds")
            .format("HH:mm:ss");
        }, 1000);
      });
    };
    const clockOutEmployee = () => {
      clearInterval(intervalTotalTime.value);
      clearInterval(intervalCurrentTime.value);
      lastDurationClockIn.value = currentTimeOnline.value;
      isPausedCurrentTime.value = false;
      setTimeout(() => {
        totalTimeClockIn.value = moment("00:00:00", "HH:mm:ss").format("HH:mm:ss");
        currentTimeOnline.value = moment("00:00:00", "HH:mm:ss").format("HH:mm:ss");
      }, 300);
      clockOut(dataEmployee.value.employee.id, workEntry.value).then(({ data }) => {
        dataEmployee.value = data.data;
      });
    };

    const pauseContinueCronoCurrentTime = () => {
      isPausedCurrentTime.value = !isPausedCurrentTime.value;

      if (isPausedCurrentTime.value) {
        clearInterval(intervalCurrentTime.value);
      } else {
        intervalCurrentTime.value = setInterval(() => {
          currentTimeOnline.value = moment(currentTimeOnline.value, "HH:mm:ss")
            .add(1, "seconds")
            .format("HH:mm:ss");
        }, 1000);
      }
    };

    return {
      dataEmployee,
      isEmployeeOnline,
      currentTimeOnline,
      lastDurationClockIn,
      totalTimeClockIn,
      colorStatusEmployee,
      isPausedCurrentTime,
      clockInEmployee,
      clockOutEmployee,
      pauseContinueCronoCurrentTime,
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
  padding: 0 10px;
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
