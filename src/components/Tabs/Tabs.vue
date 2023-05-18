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
    heading?: string;
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
            <h1 class="tabs__heading" v-if="props.heading">{{ props.heading }}</h1>
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
    align-items: center;
    * {
        margin: 1rem;
        padding: 0.5rem;
    }
    .tabs__header__tab {
        cursor: pointer;
        border-radius: $tab_border_radius;
        background: linear-gradient(to bottom, $tab_gradient_start, white);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease-in-out;
        &:hover {
            background: linear-gradient(to bottom, $tab_gradient_start, white);
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
        &--active {
            background: linear-gradient(to bottom, $tab_gradient_start, white);
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
    }
}

.tabs__heading {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
}

.tabs__content {
    flex: 1;
    overflow: auto;
    background-color: $tab_content_background_color;
}
</style>