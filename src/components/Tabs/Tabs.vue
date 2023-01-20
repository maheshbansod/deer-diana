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
                {{ tab.name }}
            </div>
        </div>
        <div class="tabs__content">
            <component :is="activeTabComponent" />
        </div>
    </div>
</template>

<!-- Tabs component -->
<style scoped>
.tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.tabs__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    background-color: #79c2e6;
}

.tabs__header__tab {
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
    flex: 1;
}

.tabs__header__tab--active {
    background-color: var(--color-background-mute);
}

.tabs__content {
    flex: 1;
    overflow: auto;
}
</style>