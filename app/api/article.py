from flask import Blueprint
from flask import request
from bson.objectid import ObjectId
from ..lib.apiview import apiview
from ..lib.auth import admin_login_require
from ..model.article import Article
from ..model.tag import Tag
from .. import images
from bs4 import BeautifulSoup
from datetime import datetime
from dateutil import tz
import pymongo
import math

article = Blueprint('api_article', __name__)

DRAFT = 1
PUBLISH = 2


@article.route('/add', methods=['POST'])
@apiview
@admin_login_require('api')
def add_article():
    """添加文章"""
    type = int(request.form.get('type', DRAFT))
    title = request.form.get('title', '')
    draft = request.form.get('draft', '')
    content = request.form.get('content', '')
    img = request.form.get('img', '')
    tags = request.form.getlist('tags[]')
    article = {
        'title': title,
        'draft': draft,
        'content': content,
        'img': img,
        'status': type,
        'views': 0,
    }
    if type == PUBLISH:
        article['published_at'] = datetime.utcnow()
        if len(tags) > 0:
            article['tags'] = [ObjectId(tag_id) for tag_id in set(tags)]
    Article.add(article)


@article.route('/detail', methods=['POST'])
@apiview
@admin_login_require('api')
def article_detail():
    """文章详情"""
    id = request.form.get('id')
    if id is None:
        raise Exception('ARTICLE_NOT_EXIST')
    article = Article.find(id)
    if article is None:
        raise Exception('ARTICLE_NOT_EXIST')

    # 获取标签
    if article.tags is None:
        article.tags = []
    else:
        all_tags = Tag.find_all({'_id': {'$in': article.tags}})
        all_tags = {str(tag._id): {'id': str(tag._id), 'name': tag.name} for tag in all_tags}
        article.tags = [all_tags[str(id)] for id in article.tags if str(id) in all_tags]
    return {'article': article.filter('title', 'draft', 'tags')}


@article.route('/save', methods=['POST'])
@apiview
@admin_login_require('api')
def edit_detail():
    """保存文章"""
    id = request.form.get('id')
    type = int(request.form.get('type', DRAFT))
    title = request.form.get('title', '')
    draft = request.form.get('draft', '')
    content = request.form.get('content', '')
    img = request.form.get('img', '')
    tags = request.form.getlist('tags[]')

    if id is None:
        raise Exception('ARTICLE_NOT_EXIST')
    article = Article.find(id)
    if article is None:
        raise Exception('ARTICLE_NOT_EXIST')
    article.title = title
    article.draft = draft
    if type == PUBLISH:
        article.content = content
        # 首次发布，设置发布时间
        if article.type == DRAFT:
            article.published_at = datetime.utcnow()
        # 标签
        tags = [ObjectId(tag_id) for tag_id in set(tags)]
        article.tags = tags
        # 更新图片
        if img != '':
            article.img = img
    article.save()


@article.route('/find', methods=['POST'])
@apiview
@admin_login_require('api')
def find_articles():
    """查找文章"""
    title = request.form.get('title', '')
    date = request.form.get('date', '')
    page = int(request.form.get('page', 1))
    limit = int(request.form.get('limit', 10))
    query =  Article.find_by_condition(title, date)
    articles = query \
        .sort('updated_at', pymongo.DESCENDING) \
        .limit(limit) \
        .skip(limit * (page - 1))
    pages = math.ceil(query.count() / limit)
    return {
            'articles': [{
                'id': str(article._id),
                'title': article.title,
                'img': images.url(article.img) if article.img else '',
                'content': article.content,
                'summary': BeautifulSoup(article.content, "html.parser").get_text()[0:100],
                'status': article.status,
                'views': article.views,
                'published_at': datetime.strftime(article.published_at.astimezone(tz.gettz('CST')), '%Y-%m-%d %H:%M:%S')
                    if article.published_at else ''
            } for article in articles],
            'pages': pages
        }


@article.route('/del', methods=['POST'])
@apiview
@admin_login_require('api')
def del_article():
    """删除文章"""
    id = request.form.get('id', '')

    if id == '':
        raise Exception('ARTICLE_NOT_EXIST')
    article = Article.find(id)
    if article is None:
        raise Exception('ARTICLE_NOT_EXIST')
    article.remove()