<template>
  <ul>
    <li
      v-for="(item, index) in optionsMenu"
      :key="`${item.title}-${index}`"
      class="p-5 cursor-pointer hover:bg-green-200"
      :class="{ 'border-b-2': index !== optionsMenu.length - 1 }"
      @mouseover="setHoverItem(item)"
      @click="closeFirstMenu(item)"
    >
      <div class="item-menu">
        <img
          @mouseover="itemsSubMenu = item.childrens"
          :class="{
            'hidde-icon-left': !item.childrens,
            'rotate-icon-arrow': item.title === activeHoverMenuItem,
          }"
          src="@/assets/icons/down-arrow.png"
          width="10"
          height="10"
        />
        {{ item.title }}
      </div>
    </li>
  </ul>

  <div
    v-if="showFirstMenu && itemsSubMenu"
    class="second-menu shadow-xl border rounded-2xl overflow-hidden"
  >
    <ul>
      <li
        v-for="(item, index) in itemsSubMenu"
        :key="`${item.title}-${index}`"
        class="p-4 cursor-pointer hover:bg-green-200"
        :class="{ 'border-b-2': index !== optionsMenu.length - 1 }"
        @click="closeMenus"
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
</template>

<script>
import { menuOptions } from "@/utils/menuOptions";

export default {
  props: {
    showFirstMenu: Boolean,
  },

  emits: ["closeMenu"],

  setup(props, { emit }) {
    let itemsSubMenu = ref(undefined);
    let optionsMenu = ref(menuOptions);
    let activeHoverMenuItem = ref(undefined);

    const setHoverItem = (item) => {
      //Change the active item to close the menus
      itemsSubMenu.value = item.childrens;
      if (activeHoverMenuItem.value !== item.title) {
        itemsSubMenu.value = item.childrens;
      }
      activeHoverMenuItem.value = item.title;
    };

    const closeMenus = () => {
      //   showFirstMenu.value = false;
      itemsSubMenu.value = undefined;
    };
    const closeFirstMenu = (item) => {
      if (!item.childrens) {
        // showFirstMenu.value = false;
      }
    };
    return {
      itemsSubMenu,
      activeHoverMenuItem,
      optionsMenu,
      setHoverItem,
      closeMenus,
      closeFirstMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
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

ul > :first-child:hover {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
ul > :last-child:hover {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.second-menu {
  position: absolute;
  top: 0px;
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
