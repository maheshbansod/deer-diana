<script lang="ts" setup>
import { ref, onMounted } from 'vue';


const rippleSpan = ref<HTMLSpanElement|null>(null);

function onClick(event:MouseEvent) {
    // add ripple class and set the element's center to the ripple's center
    const ripple = rippleSpan.value;
    if(!ripple) return;
    const button = event.currentTarget as HTMLButtonElement;
    const buttonRect = button.getBoundingClientRect();
    // set the ripple's size to button's maximum dimension
    const rippleSize = Math.max(buttonRect.width, buttonRect.height);
    ripple.style.width = `${rippleSize}px`;
    ripple.style.height = `${rippleSize}px`;
    // set the ripple's center to the click's position
    ripple.style.left = `${event.clientX - buttonRect.left - rippleSize/2}px`;
    ripple.style.top = `${event.clientY - buttonRect.top - rippleSize/2}px`;

    ripple.classList.add('ripple');
}

onMounted(() => {
    // remove the ripple class after the animation is done
    const ripple = rippleSpan.value;
    if(!ripple) return;
    ripple.addEventListener('animationend', () => {
        ripple.classList.remove('ripple');
    });
});
</script>

<template>
    <button class="button" @click="onClick">
        <slot></slot>
        <span ref="rippleSpan"></span>
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
span.ripple {
    /* the ripple effect */
    position: absolute;
    border-radius: 50%;
    transform: translate(50%, 50%);
    background-color: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple 0.7s linear;
}

@keyframes ripple {
    /* the ripple animation */
    to {
        opacity: 0;
        transform: scale(4);
    }
}
</style>