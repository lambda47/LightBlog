import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import Separator from './Separator.vue'
import SubMenu from './SubMenu.vue'

export default {
    install (Vue) {
        Vue.component('lb-menu', Menu);
        Vue.component('lb-menu-item', MenuItem);
        Vue.component('lb-separator', Separator);
        Vue.component('lb-sub-menu', SubMenu);
    }
}