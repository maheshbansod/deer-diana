<script setup lang="ts">
import { inject } from 'vue';
import type { ToasterController } from './Toaster';
const $toaster = inject<ToasterController>('toaster');
</script>
<template>
    <div class="toaster" v-if="$toaster?.isVisible">
        {{ $toaster.message }}
    </div>
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
</style>