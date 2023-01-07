
import { ref, type Plugin } from 'vue';

// plugin
export const Toaster = {
    install: (app, options) => {
        app.provide('toaster', new ToasterController());
    }
} satisfies Plugin;

export class ToasterController {
    message = ref("");
    maxShowTime = 4000;

    private showTimeout?: NodeJS.Timer;

    get isVisible() {
        return this.message.value !== "";
    }

    show(message: string) {
        if (this.showTimeout !== undefined) {
            this.clearTimeout();
        }

        this.message.value = message;

        this.showTimeout = setInterval(() => {
            this.message.value = "";
            this.clearTimeout();
        }, this.maxShowTime);
    }

    private clearTimeout() {
        clearTimeout(this.showTimeout);
        this.showTimeout = undefined;
    }
}