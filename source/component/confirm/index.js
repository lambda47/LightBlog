import Confirm from './Confirm.vue';
import Vue from 'vue';

let instance = null;
let setting = {
    resolve: null,
    reject: null
};

Vue.prototype.$confirm = (message) => {
    if (!instance) {
        let ConfirmConstruct = Vue.extend(Confirm);
        instance = new ConfirmConstruct({
            el: document.createElement('div')
        });
        instance.callback = (type) => {
            if (type === 'confirm') {
                setting.resolve();
            } else {
                setting.reject();
            }
        };
        document.querySelector('body').appendChild(instance.$el);
    }
    instance.message = message;
    instance.show = true;
    return new Promise((resolve, reject) => {
        setting.resolve = resolve;
        setting.reject = reject;
    });
};