<template>
  <div class="relative">
    <div class="downdrop-btn" @click="showFirstMenu = !showFirstMenu">
      <p>Joan Alimnyana</p>
      <img src="@/assets/icons/down-arrow.png" width="10" height="10" />
    </div>
    <div
      v-if="showFirstMenu"
      class="first-menu shadow-xl bg-white border rounded-2xl overflow-hidden"
    >
      <ul>
        <li
          v-for="(item, index) in optionsMenu"
          :key="`${item.title}-${index}`"
          class="p-5 cursor-pointer hover:bg-green-200"
          :class="{ 'border-b-2': index !== optionsMenu.length - 1 }"
        >
          <div class="item-menu">
            <img
              @mouseover="itemsSubMenu = item.childrens"
              @mouseleave="itemsSubMenu = undefined"
              :class="{ 'hidde-icon-left': !item.childrens }"
              src="@/assets/icons/down-arrow.png"
              width="10"
              height="10"
            />
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>
    <div
      v-if="itemsSubMenu"
      class="second-menu shadow-xl border rounded-2xl overflow-hidden"
    >
      <ul>
        <li
          v-for="(item, index) in itemsSubMenu"
          :key="`${item.title}-${index}`"
          class="p-4 cursor-pointer hover:bg-green-200"
          :class="{ 'border-b-2': index !== optionsMenu.length - 1 }"
        >
          <div class="item-menu">
            <div
              class="w-8 h-8 p-1 text-sm bg-gray-200 text-gray-600 rounded-full border-2 border-gray-400 dark:ring-gray-500 circle-icon-submenu"
            >
              {{ item.textIcon }}
            </div>
            <div class="text-sm">
              <div class="info-user">
                <span class="text-gray-800 font-bold"> {{ item.title }} </span>
                <span class="font-medium text-left">{{ item.name }}</span>
              </div>
              <div class="text-xs text-gray-4800">
                <span>Hoy llevas</span> {{ item.time }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    let showFirstMenu = ref(false);
    let itemsSubMenu = ref(undefined);
    let optionsMenu = ref([
      {
        title: "Mis cuentas",
        childrens: [
          {
            title: "Sesame 1",
            textIcon: "S1",
            name: "Joan Alminyana",
            time: "00:00",
          },
          {
            title: "Sesame 2",
            textIcon: "S2",
            name: "Joan Alminyana",
            time: "00:00",
          },
        ],
      },
      {
        title: "Vista empleado",
      },
      {
        title: "Mi perfil",
      },
      {
        title: "Cerrar sesión",
      },
    ]);
    return { showFirstMenu, itemsSubMenu, optionsMenu };
  },
};
</script>

<style lang="scss" scoped>
.downdrop-btn {
  display: grid;
  cursor: pointer;
  grid-template-columns: auto auto;
  align-items: center;
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

    .hidde-icon-left {
      visibility: hidden;
    }
  }
}
.second-menu {
  position: absolute;
  top: 50px;
  right: 300px;
  width: 300px;
  .item-menu {
    display: grid;
    align-items: center;
    column-gap: 20px;
    grid-template-columns: max-content max-content;
    .circle-icon-submenu {
      display: grid;
      align-items: center;
    }

    .info-user {
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 5px;
    }
  }
}
</style>
