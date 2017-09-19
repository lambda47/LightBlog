from flask import Blueprint
from flask import render_template

user = Blueprint('view_admin_user', __name__)

@user.route('/login', methods=['GET'])
def login():
    return render_template('admin/login.html')