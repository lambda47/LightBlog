from flask import Blueprint
from flask import request

admin = Blueprint('api_admin', __name__)

@admin.route('/login', methods=['POST'])
def login():
    username = request.form.get('username', '')
    password = request.form.get('password', '')
    remember_me = int(request.form.get('remember_me', 0))