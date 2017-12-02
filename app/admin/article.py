from flask import Blueprint
from flask import render_template
from ..lib.auth import admin_login_require

article = Blueprint('view_admin_article', __name__)

@article.route('/new', methods=['GET'])
@admin_login_require()
def add_article():
    return render_template('admin/article/editor.html', title='写文章')

@article.route('/edit/<id>', methods=['GET'])
@admin_login_require()
def edit_article(id):
    return render_template('admin/article/editor.html', title='编辑',
                           article_id=id)