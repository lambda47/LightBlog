from flask import Blueprint
from flask import render_template
from ..lib.auth import admin_login_require

tag = Blueprint('view_admin_tag', __name__)

@tag.route('/', methods=['GET'])
@admin_login_require()
def tags():
    return render_template('admin/tag.html')