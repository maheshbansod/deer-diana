<!--
    Tabs component 
    @props {Array<Tab>} tabs - array of tabs 
    @props {String} activeTab - active tab
-->

<script setup lang="ts">

import { computed, ref } from "vue";
import type { DTab } from "./Tabs";

// Props
const props = defineProps<{
    tabs: DTab[];
    activeTab: string;
}>();

// Active tab
const activeTab = ref(props.activeTab);

// Active tab component

const activeTabComponent = computed(() => {
    const tab = props.tabs.find((tab) => tab.name === activeTab.value);
    return tab ? tab.component : null;
});

// Set active tab
const setActiveTab = (tabName: string) => {
    activeTab.value = tabName;
};

// Methods
const methods = {
    setActiveTab,
};

// Expose
defineExpose({
    ...methods,
});
</script>

<!-- Tabs component -->
<template>
    <div class="tabs">
        <div class="tabs__header">
            <div v-for="tab in props.tabs" :key="tab.name" class="tabs__header__tab"
                :class="{ 'tabs__header__tab--active': tab.name === activeTab }" @click="setActiveTab(tab.name)">
                <span class="tab-label">
                    {{ tab.name }}
                </span>
            </div>
        </div>
        <div class="tabs__content">
            <component :is="activeTabComponent" />
        </div>
    </div>
</template>

<!-- Tabs component -->
<style scoped lang="scss">
$tab_active_color: #79c2e6;
$tab_inactive_color: #e6e6e6;
$tabs__header__tab__padding: 0.5rem;
$tab_gradient_start: #d4e1e7;
$tab_border_radius: 0.5rem;
$tabs__gap: 1rem;
$tab_content_background_color: white;
$tab_edge_offset: 2px;

.tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.tabs__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: $tabs__header__tab__padding;
    position: relative;
    overflow: hidden;
}

.tab-label {
    width: 100%;
}

.tabs__header::after {
    content: "";
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    background-color: $tab_active_color;
    height: $tabs__header__tab__padding;
}

.tabs__header__tab {
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
    flex: 1;
    border-top-left-radius: $tab_border_radius;
    border-top-right-radius: $tab_border_radius;
    background: linear-gradient(to bottom, $tab_gradient_start, $tab_inactive_color);
}

.tabs__header__tab::after,
.tabs__header__tab::before {
    content: "";
    position: absolute;
    z-index: 1;
    width: $tabs__gap;
    height: $tabs__gap;
    bottom: 0;
}

.tabs__header__tab::after {
    right: -$tabs__gap;
    border-bottom-left-radius: 0.5rem;
    box-shadow: -2px $tabs__header__tab__padding $tab_inactive_color;
}

.tabs__header__tab::before {
    left: -$tabs__gap;
    border-bottom-right-radius: 0.5rem;
    box-shadow: 2px $tabs__header__tab__padding $tab_inactive_color;
}

.tabs__header__tab--active {
    background-color: $tab_active_color;

    background: linear-gradient(to bottom, $tab_gradient_start, $tab_active_color);
    z-index: 2;
    box-shadow: rgb(33 35 38 / 10%) 0px -10px 10px -10px, rgb(33 35 38 / 10%) 10px 0px 10px -5px
}

.tabs__header__tab.tabs__header__tab--active::after {
    box-shadow: -$tab_edge_offset $tabs__header__tab__padding $tab_active_color;
}

.tabs__header__tab.tabs__header__tab--active::before {
    box-shadow: $tab_edge_offset $tabs__header__tab__padding $tab_active_color;
}

.tabs__content {
    flex: 1;
    overflow: auto;
    background-color: $tab_content_background_color;
}
</style>