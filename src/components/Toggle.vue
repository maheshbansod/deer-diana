<!-- Toggle component with v-model that is a boolean -->

<template>
    <div class="toggle" v-on:click="toggle()">
        <div class="toggle__label">
            <slot></slot>
        </div>
        <div class="toggle__switch" :class="{ 'on': checked }">
            <div class="toggle__switch__slider"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
    checked.value = !checked.value;
}

const checked = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style scoped>
.toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.toggle__label {
    margin-right: 0.5rem;
}

.toggle__switch {
    position: relative;
    width: 2rem;
    height: 1rem;
    background-color: var(--color-toggle-off);
    border-radius: 0.5rem;
    transition: background-color 0.2s;
}

.toggle__switch.on {
    background-color: var(--color-toggle-on);
}

.toggle__switch__slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    background-color: var(--color-background-soft);
    border-radius: 50%;
    transition: transform 0.2s;
}

.toggle__switch.on .toggle__switch__slider {
    transform: translateX(1rem);
}
</style>