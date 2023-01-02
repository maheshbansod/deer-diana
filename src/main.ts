import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import "./assets/main.css";
import { Toaster } from "./components/toaster/Toaster";

const app = createApp(App);

app.use(router);
app.use(Toaster);
app.component('QuillEditor', QuillEditor);

app.mount("#app");
