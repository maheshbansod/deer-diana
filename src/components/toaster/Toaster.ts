
import type { Plugin } from 'vue';
import { reactive } from 'vue';

// plugin
export const Toaster = {
    install: (app, options) => {
        app.provide('toaster', new ToasterController());
    }
} satisfies Plugin;

export class ToasterController {
    toast = reactive({ message: "" });
    maxShowTime = 4000;

    private showTimeout?: NodeJS.Timer;

    get isVisible() {
        return this.toast.message !== "";
    }

    show(message: string) {
        if (this.showTimeout !== undefined) {
            this.clearTimeout();
        }

        this.toast.message = message;

        this.showTimeout = setInterval(() => {
            this.toast.message = "";
            this.clearTimeout();
        }, this.maxShowTime);
    }

    private clearTimeout() {
        clearTimeout(this.showTimeout);
        this.showTimeout = undefined;
    }
}