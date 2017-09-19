from flask import Blueprint
from flask import render_template

admin = Blueprint('view_admin_admin', __name__)

@admin.route('/login', methods=['GET'])
def login():
    return render_template('admin/login.html')