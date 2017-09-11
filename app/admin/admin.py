from flask import Blueprint
from flask import render_template

admin = Blueprint('admin', __name__)

@admin.route('/login', methods=['GET'])
def login():
    return render_template('admin/login.html')