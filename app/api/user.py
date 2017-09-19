from flask import Blueprint
from flask import request

user = Blueprint('api_user', __name__)

@user.route('/login', methods=['POST'])
def login():
    username = request.form.get('username', '')
    password = request.form.get('password', '')
    remember_me = int(request.form.get('remember_me', 0))