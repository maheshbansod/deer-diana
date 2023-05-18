<script setup lang="ts">
import Tabs from "@/components/Tabs/Tabs.vue";
import Encrypter from "./Encrypter.vue";
import Decrypter from "./Decrypter.vue";

</script>

<template>
  <main style="height: 100%">
    <Tabs heading="Deer Diana" :tabs="[
      { name: 'Encrypt', component: Encrypter },
      { name: 'Decrypt', component: Decrypter },
    ]" :active-tab="'Encrypt'" />
  </main>
</template>