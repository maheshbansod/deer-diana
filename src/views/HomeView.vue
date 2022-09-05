<script setup lang="ts">
import { computed, ref } from "vue";
import {AES, enc} from 'crypto-js';
import { copyTextToClipboard } from "@/utils/common";

const senderPlaceholder = `Write your message here. e.g.
Deer Diana,
How are you? Is it the rain or are you crying? I'll assume it's the rain.
Anyway, ....`;

const receivedPlaceholder = `Paste the encrypted message here.`

enum ControlState {
  ENCRYPTER,
  DECRYPTER
}

const key = ref("0");
const message = ref("");
const state = ref(ControlState.ENCRYPTER);

const KEY_PREFIX = "secret key prefix";

const encryptText = (text: string, key: string) => {
  return AES.encrypt(text, `${KEY_PREFIX}${key}`).toString();
}

const decryptText = (text: string, key: string) => {
  return AES.decrypt(text, `${KEY_PREFIX}${key}`).toString(enc.Utf8);
}

const converted = computed(() => {
  // TODO: make sure data not malformed for decrypt
  return state.value === ControlState.ENCRYPTER ?
    encryptText(message.value, key.value)
    : decryptText(message.value, key.value);
});

const setMode = (value: ControlState) => {
  message.value = "";
  state.value = value;
};

const copyText = () => {
  copyTextToClipboard(converted.value);
}

</script>

<template>
  <main>
    <h1>Hii</h1>
    <div class="mode-area">
      <div class="mode-title">
        <div @click="() => setMode(ControlState.ENCRYPTER)"
          :class="{'mode-title--selected':state === ControlState.ENCRYPTER}">
          Encrypt
        </div>
        <div @click="() => setMode(ControlState.DECRYPTER)"
          :class="{'mode-title--selected':state === ControlState.DECRYPTER}">
          Decrypt
        </div>
      </div>
      <div class="mode-description">
        <p v-if="state === ControlState.ENCRYPTER">
          Use this to send a message to your loved one.
        </p>
        <p v-else-if="state === ControlState.DECRYPTER">
          Received an encrypted message? Use this to read it.
        </p>
      </div>
    </div>
    <div class="input-wrapper">
      <span>Key</span>
      <input type="text" placeholder="Key" v-model="key" />
    </div>
    <textarea :placeholder="state === ControlState.ENCRYPTER?senderPlaceholder:receivedPlaceholder"
      v-model="message"></textarea>
    <div class="converted-message-wrapper" v-show="message.length > 0">
      <div class="copy-btn-wrapper">
        <button @click="copyText" class="copy-btn">Copy text</button>
      </div>
      {{ converted }}
    </div>
  </main>
</template>

<style scoped>
textarea {
  width: 100%;
  min-height: 70vh;
  padding: 0.5rem;
}

.mode-area {
  background-color: var(--color-background-mute);
  padding: 0.2rem;
}

.mode-title {
  display: flex;
  width: 100%;
}

.mode-title>* {
  width: 100%;
  cursor: pointer;
  padding: 0.2rem;
  text-align: center;
  user-select: none;
}

.mode-title--selected {
  background-color: var(--color-background-soft);
}

.input-wrapper {
  display: inline-flex;
  padding: 0.2rem;
  margin: 0.2rem 0;
  background-color: var(--color-background-soft);
}

.input-wrapper>span {
  margin: 0.2rem;
}

.converted-message-wrapper {
  padding: 0.5rem;
  background-color: aquamarine;
  overflow-wrap: break-word;
}

.copy-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}

.copy-btn {
  background-color: transparent;
  color: black;
  padding: 0.2rem;
  outline: none;
  border: 1px solid grey;
  border-radius: 3px;
  display: block;
}

.copy-btn:hover {
  background-color: rgb(0, 0, 0, 0.1);
}
</style>