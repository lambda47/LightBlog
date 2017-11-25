import Message from 'message.vue';

export default {
    install(Vue, options) {
        let props = options || {duration: 2};

        const instance = new Vue({
            render: function (createElement) {
                return createElement(Message, {
                    props
                });
            }
        });

        const component = instance.$mount();
        document.body.appendChild(component.$el);
        const message = instance.$children[0];

        Vue.prototype.$message = {
            error: message.error,
            close: message.close
        };
    }
};
