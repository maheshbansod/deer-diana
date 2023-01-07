<script setup lang="ts">
import { inject } from 'vue';
import type { ToasterController } from './Toaster';
const $toaster = inject<ToasterController>('toaster');
</script>
<template>
    <Transition name="toaster">
        <div class="toaster" v-if="$toaster?.isVisible">
            {{ $toaster.message.value }}
        </div>
    </Transition>
</template>

<style scoped>
.toaster {
    min-width: 100px;
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);
    padding: 0.5rem 1rem;
    color: white;
    background-color: rgb(127, 157, 255);
    border-radius: 5px;
    z-index: 100;
}

/* Transition for toaster slide in/out from bottom */
.toaster-enter-active {
    transition: all 0.3s;
}
.toaster-enter-from {
    transform: translate(-50%, 100%);
}
.toaster-leave-active {
    transition: all 0.5s;
}
.toaster-leave-from {
    opacity: 1;
}

.toaster-leave-to {
    opacity: 0;
}

</style>