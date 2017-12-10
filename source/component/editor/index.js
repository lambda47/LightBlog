import Editor from './editor.vue';

export default Editor.install = function (Vue) {
    Vue.component('lb-editor', Editor);
}