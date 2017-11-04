from flask import Blueprint
from flask import redirect
from flask import url_for
from flask import render_template
from flask import session
from flask_login import logout_user
from ..lib.auth import admin_loggedin
from ..lib.auth import admin_login_require

user = Blueprint('view_admin_user', __name__)

@user.route('/login', methods=['GET'])
def login():
    if admin_loggedin():
        return redirect(url_for('view_admin_index.main'))
    else:
        return render_template('admin/login.html')

@user.route('/logout', methods=['GET'])
@admin_login_require()
def logout():
    if 'user' in session:
        del session['user']
    logout_user()
    return redirect(url_for('view_admin_user.login'))