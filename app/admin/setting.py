from flask import Blueprint
from flask import render_template
from ..lib.auth import admin_login_require

setting = Blueprint('view_admin_setting', __name__)


@setting.route('/password', methods=['GET'])
@admin_login_require()
def password():
    """修改密码页"""
    return render_template('admin/password.html')


@setting.route('/about', methods=['GET'])
@admin_login_require()
def about():
    """个人信息页"""
    return render_template('admin/about.html')