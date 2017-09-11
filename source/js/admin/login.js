import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
import 'admin/login.scss';

import 'bootstrap-switch/dist/js/bootstrap-switch.js';

$(function() {
    $(":checkbox[name='remember_me']").bootstrapSwitch();
});