import vueUploader from "./components/vue-uploader.vue";

export default {
  install(app) {
    app.component("VueUploader", vueUploader);
  },
};
