<!-- 
    Vue SFC Ripple component that takes a position, which is the centre of the ripple, and size of ripple.
    it emits a 'rippleEnd' event when the animation is done.
 -->


<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import type { RippleConfig } from './RippleTypes';


const props = defineProps<RippleConfig>();

const emit = defineEmits<{
    (e: 'rippleEnd'): void
}>();

const rippleStyle = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
    left: `${props.position.x - props.size/2}px`,
    top: `${props.position.y - props.size/2}px`,
}));

const rippleElemRef = ref<HTMLSpanElement|null>(null);

function onAnimationEnd() {
    emit('rippleEnd');
}

onMounted(() => {
    const rippleElem = rippleElemRef.value;
    if(!rippleElem) return;
    rippleElem.addEventListener('animationend', onAnimationEnd);
});

</script>

<template>
    <span ref="rippleElemRef" class="ripple" :style="rippleStyle"></span>
</template>

<style scoped>
.ripple {
    /* the ripple effect */
    position: absolute;
    border-radius: 50%;
    transform: translate(50%, 50%);
    background-color: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple 0.5s linear;
    pointer-events: none;
}

@keyframes ripple {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(2);
    }
}

</style>