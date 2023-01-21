<template>
    <div class="mode-description">
        <p>
            Use this to send a message to your loved one.
        </p>

        <div class="config-wrapper">
            <span>Key</span>
            <input class="key-input" type="text" placeholder="Key" v-model="key" />
        </div>
    </div>
    <div class="content">
        <div class="editor">
            <QuillEditor :placeholder="senderPlaceholder" theme="snow" v-model:content="message" contentType="html" />
        </div>
        <div class="converted-message-wrapper" v-show="message?.length > 0">
            <div class="copy-btn-wrapper">
                <Button @click="copyText()" class="copy-btn">Copy text</Button>
            </div>
            <span v-html="converted"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ToasterController } from '@/components/toaster/Toaster';
import { copyTextToClipboard } from '@/utils/common';
import { AES } from 'crypto-js';
import { ref, computed, inject } from 'vue';
import { KEY_PREFIX } from '@/shared/constants';
import Button from '@/components/Button/Button.vue';
import { QuillEditor } from '@vueup/vue-quill';


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
.mode-description {
    padding: 0.5rem;
    background-color: var(--color-background-description);
}

.editor {
    width: 50%;
    height: 70vh;
    /* padding needed to make sure the last line isn't hidden on overflow */
    padding-bottom: 1rem;
}

.key-input {
    width: 3rem;
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