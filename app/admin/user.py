from flask import Blueprint
from flask import redirect
from flask import url_for
from flask import render_template
from ..lib.auth import admin_loggedin

user = Blueprint('view_admin_user', __name__)

@user.route('/login', methods=['GET'])
def login():
    if admin_loggedin():
        return redirect(url_for('view_admin_index.main'))
    else:
        return render_template('admin/login.html')