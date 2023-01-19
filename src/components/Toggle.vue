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

import { computed } from 'vue';

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

<style scoped lang="scss">
$toggle_slider_size: 1.5rem;
$toggle_slider_offset: -0.25rem;
$toggle_width: 2.5rem;
$toggle_height: 1rem;

.toggle {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.toggle__label {
    margin-right: 0.5rem;
}

.toggle__switch {
    position: relative;
    width: $toggle_width;
    height: $toggle_height;
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
    width: $toggle_slider_size;
    height: $toggle_slider_size;
    background-color: var(--color-background-soft);
    border-radius: 50%;
    transform: translate($toggle_slider_offset, $toggle_slider_offset);
    transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 1px 0;
}

.toggle:hover .toggle__switch__slider {
    box-shadow: 0 0 2px 0;
}

.toggle__switch.on .toggle__switch__slider {
    transform: translate($toggle_width - $toggle_slider_size - $toggle_slider_offset, $toggle_slider_offset);
}
</style>