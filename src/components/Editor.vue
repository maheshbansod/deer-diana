<script setup  lang="ts">
import { ref } from 'vue';

const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>
<template>
    <QuillEditor theme="snow"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"/>
</template>
<style>

</style>