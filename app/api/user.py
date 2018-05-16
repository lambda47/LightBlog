from flask import Blueprint
from flask import request
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_login import login_user
from ..lib.apiview import apiview
from ..model.user import User
from ..lib.auth import login_require
from flask_login import current_user

user = Blueprint('api_user', __name__)


@user.route('/login', methods=['POST'])
@apiview
def login():
    """用户登录"""
    username = request.form.get('username', '')
    password = request.form.get('password', '')
    remember_me = request.form.get('remember_me', '') == 'true'

    if username == '':
        raise Exception('REQUIRE_USERNAME')
    if password == '':
        raise Exception('REQUIRE_PASSWORD')
    user = User.find_by_username(username)
    if user is None:
        raise Exception('USER_NOT_EXIST')
    if not check_password_hash(user.password, password):
        raise Exception('PASSWORD_ERROR')
    login_user(user, remember_me)


@user.route('/password', methods=['POST'])
@apiview
@login_require('api')
def password():
    """修改密码"""
    old_password = request.form.get('old_password', '')
    new_password = request.form.get('new_password', '')
    confirm_password = request.form.get('confirm_password', '')
    if old_password == '':
        raise Exception('REQUIRE_OLD_PASSWORD')
    elif new_password == '':
        raise Exception('REQUIRE_NEW_PASSWORD')
    elif confirm_password != new_password:
        raise Exception('PASSWORD_NOT_SAME')
    elif not check_password_hash(current_user.password, old_password):
        raise Exception('OLD_PASSWORD_ERROR')
    current_user.password = generate_password_hash(new_password)
    current_user.save()