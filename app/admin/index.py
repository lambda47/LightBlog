from flask import Blueprint
from flask import render_template
from ..lib.auth import admin_login_require

index = Blueprint('view_admin_index', __name__)


@index.route('/', methods=['GET'])
@admin_login_require()
def main():
    return render_template('admin/index.html')