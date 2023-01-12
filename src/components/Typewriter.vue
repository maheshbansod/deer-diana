<!-- Vue SFC that takes a string attribute and renders it in a div with a typewriter animation -->

<template>
  <div class="typewriter">
    <span class="typewriter__text" v-html="text"></span>
    </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from 'vue';

const props = defineProps<{
    text: string;
    disableTypewriter?: boolean;
}>();


const caret = ref("_");
const text = ref("");
const consumed_text = ref(0);
const interval_duration = 100; // typing speed

const updater = () => {
  if (consumed_text.value < props.text.length) {
    text.value = props.text.slice(0, consumed_text.value) + caret.value;
    consumed_text.value++;
  } else {
    clearInterval(interval);
  }
};

let interval = setInterval(updater, interval_duration);

const interval_caret = setInterval(() => {
  if (caret.value === "_") {
    caret.value = "";
  } else {
    caret.value = "_";
  }
}, 500);

onUnmounted(() => {
  clearInterval(interval);
  clearInterval(interval_caret);
});


watch(() => props.text, (_newText) => {
    if(props.disableTypewriter) {
        text.value = props.text;
        return;
    }
    text.value = "";
    consumed_text.value = 0;
    clearInterval(interval);
    interval = setInterval(updater, interval_duration);
});

</script>

<style scoped>

.typewriter {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.typewriter__text {
  position: relative;
  display: inline-block;
  overflow: hidden;
  font-weight: 600;
  font-size: large;
  /* Typewriter like font */
  font-family: monospace;
}


</style>