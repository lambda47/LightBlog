from flask import Blueprint
from flask import request
from ..lib.apiview import apiview
from ..lib.auth import admin_login_require
from ..model.article import Article

article = Blueprint('api_article', __name__)

DRAFT = 1
PUBLISH = 2

@article.route('/add', methods=['POST'])
@apiview
@admin_login_require('api')
def add_article():
    """添加文章"""
    type = request.form.get('type', 'draft')
    title = request.form.get('title', '')
    draft = request.form.get('draft', '')
    content = request.form.get('content', '')
    article = {'title': title, 'draft': draft, 'status': type}
    if type == DRAFT:
        article['content'] = content
    Article.add(article)

@article.route('/detail', methods=['POST'])
@apiview
@admin_login_require('api')
def article_detial():
    """文章详情"""
    id = request.form.get('id')
    if id is None:
        raise Exception('ARTICLE_NOT_EXIST')
    article = Article.find(id)
    if article is None:
        raise Exception('ARTICLE_NOT_EXIST')
    return {'article': {'id': id, 'title': article.title, 'draft': article.draft,
                        'tags': article.tags}}

__all__ = ['add_article', 'detail']
