<script lang="ts" setup>
import { ref } from 'vue';
import RippleVue from '../Ripple/Ripple.vue';
import type { RippleConfig } from '../Ripple/RippleTypes';


const ripples = ref<RippleConfig[]>([]);

function onClick(event:MouseEvent) {
    /**
     * add a new ripple in ripples array
     * whose size is the maximum dimension of the button
     * and position is the click position relative to the button
     */
    const button = event.target as HTMLButtonElement;
    const buttonRect = button.getBoundingClientRect();
    const x = event.clientX - buttonRect.left;
    const y = event.clientY - buttonRect.top;
    const size = Math.max(buttonRect.width, buttonRect.height);
    ripples.value.push({ position: { x, y }, size });
}

function onRippleEnd(ripple: RippleConfig) {
    /**
     * remove the ripple from ripples array
     * when the animation is done
     */
    ripples.value = ripples.value.filter(r => r !== ripple);
}

</script>

<template>
    <button class="button" @click.capture.self="onClick">
        <slot></slot>
        <template v-for="ripple in ripples">
            <RippleVue :position="ripple.position" :size="ripple.size" @rippleEnd="onRippleEnd(ripple)" />
        </template>
    </button>
</template>

<style scoped>
.button {
    background-color: #000;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;

    position: relative;
    overflow: hidden;
}
</style>