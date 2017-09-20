from flask import Blueprint
from flask import request
from werkzeug.security import check_password_hash
from flask_login import login_user
from ..lib.apiview import apiview
from ..model.user import User

user = Blueprint('api_user', __name__)

@user.route('/login', methods=['POST'])
@apiview
def login():
    username = request.form.get('username', '')
    password = request.form.get('password', '')
    remember_me = bool(request.form.get('remember_me', False))

    if username == '':
        raise Exception('REQUIRE_USERNAME')
    if password == '':
        raise Exception('REQUIRE_PASSWORD')
    user = User.findByUsername(username)
    if user is None:
        raise Exception('USER_NOT_EXIST')
    if not check_password_hash(user.password, password):
        raise Exception('PASSWORD_ERROR')
    login_user(user, remember_me)