<template>
    <Layout>
        <template #description>
            <p>
                Send a message to your loved one.
            </p>

            <div class="config-wrapper">
                <span>🔑</span>
                <input class="key-input" type="text" placeholder=" k e y 🔑 - the encryption key 🗝 that can be used to unlock 🔐 the message later" v-model="key" />
            </div>
        </template>
        <template #content>
            <div class="editor">
                <QuillEditor :placeholder="senderPlaceholder" theme="snow" v-model:content="message"
                    contentType="html" />
            </div>
            <div class="converted-message-wrapper" v-show="message?.length > 0">
                <div class="copy-btn-wrapper">
                    <Button @click="copyText()" class="copy-btn">Copy text</Button>
                </div>
                <span v-html="converted"></span>
            </div>
        </template>
    </Layout>
</template>

<script setup lang="ts">
import type { ToasterController } from '@/components/toaster/Toaster';
import { copyTextToClipboard } from '@/utils/common';
import { AES } from 'crypto-js';
import { ref, computed, inject } from 'vue';
import { KEY_PREFIX } from '@/shared/constants';
import Button from '@/components/Button/Button.vue';
import { QuillEditor } from '@vueup/vue-quill';
import Layout from '@/layout/layout.vue';


const senderPlaceholder = `Write your message here. e.g.
Deer Diana,
How are you? Is it the rain or are you crying? I'll assume it's the rain.
Anyway, ....`;

const key = ref("");
const message = ref("");

const $toaster = inject<ToasterController>('toaster');

const converted = computed(() => {
    return encryptText(message.value, key.value);
});

const encryptText = (text: string, key: string) => {
    return AES.encrypt(text, `${KEY_PREFIX}${key}`).toString();
}

const copyText = () => {
    copyTextToClipboard(converted.value);
    $toaster?.show("Copied to clipboard");
}
</script>

<style scoped lang="scss">
.editor {
    width: 50%;
    height: 92%;
    /* padding needed to make sure the last line isn't hidden on overflow */
    padding-bottom: 1rem;
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