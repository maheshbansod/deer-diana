<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { AES, enc } from 'crypto-js';
import { copyTextToClipboard } from "@/utils/common";
import type { ToasterController } from "@/components/toaster/Toaster";
import Button from '@/components/Button/Button.vue';
import Typewriter from '@/components/Typewriter.vue';
import Toggle from '@/components/Toggle.vue';

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

const $toaster = inject<ToasterController>('toaster');

// TODO: Create a toggle for this
const slowTypewriterMode = ref(true);

const KEY_PREFIX = "secret key prefix";

const encryptText = (text: string, key: string) => {
  return AES.encrypt(text, `${KEY_PREFIX}${key}`).toString();
}

const decryptText = (text: string, key: string) => {
  try {
    return AES.decrypt(text, `${KEY_PREFIX}${key}`).toString(enc.Utf8);
  } catch {
    return "Invalid"
  }
}

const converted = computed(() => {
  return state.value === ControlState.ENCRYPTER ?
    encryptText(message.value, key.value)
    : decryptText(message.value, key.value);
});

const setMode = (value: ControlState) => {
  message.value = "";
  state.value = value;
};

const copyText = (html = false) => {
  if (html) {
    // extract text from string containing HTML tags
    const text = converted.value.replace(/<[^>]*>?/gm, '');
    copyTextToClipboard(text);
  } else {
    copyTextToClipboard(converted.value);
  }
  $toaster?.show("Copied to clipboard");
}

</script>

<template>
  <main>
    <h1>Hii</h1>
    <div class="mode-area">
      <div class="mode-title">
        <span>&nbsp;</span>
        <div @click="setMode(ControlState.ENCRYPTER)"
          :class="{ 'mode-title--selected': state === ControlState.ENCRYPTER }">
          Encrypt
        </div>
        <div @click="setMode(ControlState.DECRYPTER)"
          :class="{ 'mode-title--selected': state === ControlState.DECRYPTER }">
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

        <div class="config-wrapper">
          <span>Key</span>
          <input type="text" placeholder="Key" v-model="key" />
        </div>
        <Toggle v-if="state === ControlState.DECRYPTER" v-model="slowTypewriterMode">
          Enable animation
        </Toggle>
      </div>
    </div>
    <div class="content">
      <template v-if="state === ControlState.ENCRYPTER">
        <div class="editor">
          <QuillEditor :placeholder="senderPlaceholder" theme="snow" v-model:content="message" contentType="html" />
        </div>
      </template>
      <template v-else>
        <!-- the decryption plain text editor -->
        <textarea class="editor" :class="{
          'editor--error': message.length > 0 && (!converted || converted.length === 0 || converted === 'Invalid')
        }" :placeholder="receivedPlaceholder" v-model="message" spellcheck="false" data-gramm="false">
        </textarea>
      </template>
      <div class="converted-message-wrapper" v-show="message?.length > 0">
        <div class="copy-btn-wrapper">
          <Button @click="copyText(state === ControlState.DECRYPTER)" class="copy-btn">Copy text</Button>
        </div>
        <span v-if="state === ControlState.ENCRYPTER" v-html="converted"></span>
        <Typewriter v-else :text="converted" :disableTypewriter="!slowTypewriterMode" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.editor {
  width: 50%;
  height: 70vh;
  /* padding needed to make sure the last line isn't hidden on overflow */
  padding-bottom: 1rem;
}

.editor--error {
  color: red;
}

.mode-area {
  background-color: var(--color-background-mute);
  padding: 0.2rem;
}

.mode-title {
  display: flex;
  width: 100%;
}

.mode-title>div {
  width: 50%;
  cursor: pointer;
  position: absolute;
  transform: translateX(100%);
  transition: transform 0.2s;
}

.mode-title>* {
  padding: 0.2rem;
  text-align: center;
  user-select: none;
}

div.mode-title--selected {
  background-color: var(--color-background-soft);
  transform: translate(0);
}

.config-wrapper {
  display: inline-flex;
  padding: 0.2rem;
  margin: 0.2rem 0;
  margin-right: 1rem;
  background-color: var(--color-background-config);
}

.config-wrapper>span {
  margin: 0.2rem;
}

.converted-message-wrapper {
  width: 50%;
  padding: 0.5rem;
  background-color: aquamarine;
  color: black;
  overflow-wrap: break-word;
  white-space: pre-line;
}

.copy-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}

.content {
  display: flex;
}

@media only screen and (max-width: 600px) {
  .content {
    display: block;
  }

  .editor,
  .converted-message-wrapper {
    width: 100%;
  }

  .editor {
    display: flex;
    flex-direction: column;
  }

  .editor> :deep(.ql-container) {
    flex: 1;
  }
}
</style>