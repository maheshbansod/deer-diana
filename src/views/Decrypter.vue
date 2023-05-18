<template>
    <Layout>
        <template #description>
            <p>
                Received an encrypted message? Use this to read it.
            </p>

            <div class="config-wrapper-wrapper">
                <div class="config-wrapper">
                    <span>🔑</span>
                    <input class="key-input" type="text" placeholder=" k e y 🔑 - the encryption key 🗝 that was used to lock 🔐 the message" v-model="key" />
                </div>
                <Toggle v-model="slowTypewriterMode">
                    Enable animation
                </Toggle>
            </div>
        </template>
        <template #content>
            <!-- the decryption plain text editor -->
            <textarea class="editor" :class="{
                'editor--error': message.length > 0 && (!converted || converted.length === 0 || converted === 'Invalid')
            }" :placeholder="receivedPlaceholder" v-model="message" spellcheck="false" data-gramm="false">
            </textarea>
            <div class="converted-message-wrapper" v-show="message?.length > 0">
                <div class="copy-btn-wrapper">
                    <Button @click="copyText()" class="copy-btn">Copy text</Button>
                </div>
                <Typewriter :text="converted" :disableTypewriter="!slowTypewriterMode" />
            </div>
        </template>
    </Layout>
</template>

<script setup lang="ts">


import Button from '@/components/Button/Button.vue';
import type { ToasterController } from '@/components/toaster/Toaster';
import Toggle from '@/components/Toggle.vue';
import Typewriter from '@/components/Typewriter.vue';
import Layout from '@/layout/layout.vue';
import { KEY_PREFIX } from '@/shared/constants';
import { copyTextToClipboard } from '@/utils/common';
import { AES, enc } from 'crypto-js';
import { ref, computed, inject } from 'vue';

const receivedPlaceholder = `Paste the encrypted message here.`

const key = ref("");
const message = ref("");

const $toaster = inject<ToasterController>('toaster');

const slowTypewriterMode = ref(true);

const decryptText = (text: string, key: string) => {
    try {
        return AES.decrypt(text, `${KEY_PREFIX}${key}`).toString(enc.Utf8);
    } catch {
        return "Invalid"
    }
}

const converted = computed(() => {
    return decryptText(message.value, key.value);
});

const copyText = () => {
    const text = converted.value.replace(/<[^>]*>?/gm, '');
    copyTextToClipboard(text);
    $toaster?.show("Copied to clipboard");
}
</script>

<style scoped lang="scss">
.editor {
    width: 50%;
    /* padding needed to make sure the last line isn't hidden on overflow */
    padding-bottom: 1rem;
}

.editor--error {
    color: red;
}

.key-input {
    flex: 1;
}

.config-wrapper {
    display: inline-flex;
    margin: 0.2rem 0;
    margin-right: 1rem;
    background-color: var(--color-background-config);
    border-radius: 0.5rem;
    color:white;
    width: 70%;
}

.config-wrapper-wrapper {
    display: flex;
    align-items: center;
}

.config-wrapper>span {
    margin: 0.2rem;
    padding: 0.2rem;
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

@media only screen and (max-width: 600px) {

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