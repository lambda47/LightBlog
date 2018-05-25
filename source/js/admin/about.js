import 'admin/about.scss';
import {urls} from 'admin/common';
import Editor from 'editor';
import Message from 'message';
import Vue from 'vue';
import Menu from 'menu'
import settingService from './service/setting';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);
    Vue.use(Message, {transitionName: 'message-fade', duration: 2, classPre: 'admin'});
    Vue.use(Editor);

    let vm = new Vue({
        el: '#app',
        data: {
            title: '',
            intro: '',
            uploadAction: urls.api_upload_image
        },
        computed: {
            editorMinHeight() {
                return document.body.clientHeight - 240;
            }
        },
        watch: {
            draft(draft) {
                this.$refs.editor.markdown(draft);
            }
        },
        methods: {
            async getAboutInfo() {
                let {code, msg, data} = await settingService.get();
                if (code === 1000) {
                    const setting = data.setting;
                    this.title = setting.title;
                    this.intro = setting.intro;
                    this.$refs.editor.markdown(setting.draft);
                } else {
                    this.$message.error(msg);
                }
            },
            async saveAboutInfo() {
                let {code, msg} = await settingService.set(this.title, this.intro,
                    this.$refs.editor.markdown(), this.$refs.editor.html());
                if (code === 1000) {
                    this.$message.info('保存成功');
                } else {
                    this.$message.error(msg);
                }
            },
            cancelEdit() {
                this.getAboutInfo();
            }
        },
        created() {
            this.getAboutInfo();
        }
    });
}, false);