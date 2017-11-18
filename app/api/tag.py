from flask import Blueprint
from flask import request
from ..model.tag import Tag
from ..lib.auth import admin_login_require
from ..lib.apiview import apiview
from .. import images

tag = Blueprint('api_tag', __name__)

@tag.route('/find', methods=['POST'])
@apiview
@admin_login_require('api')
def all_tags():
    """根据名称查找标签"""
    name = request.form.get('name', '')
    tags = Tag.find_by_name(name)
    return {
        'tags': [{
                    'id': str(tag._id),
                    'logo': images.url(tag.logo),
                    'name': tag.name
                } for tag in tags]
    }

@tag.route('/add', methods=['POST'])
@apiview
@admin_login_require('api')
def add_tag():
    """添加标签"""
    name = request.form.get('name', '')
    logo = request.form.get('logo', '')
    if name == '':
        raise Exception('TAG_NAME_PARAM_EMPTY')
    if logo == '':
        raise Exception('TAG_LOGO_PARAM_EMPTY')
    tags = Tag.find_by_name(name, False)
    if tags is not None:
        raise Exception('TAG_ALREADY_EXIST')
    id = Tag.add(Tag(name=name, logo=logo))
    return {'id': str(id)}

@tag.route('/edit', methods=['POST'])
@apiview
@admin_login_require('api')
def edit_tag():
    """编辑标签"""
    id = request.form.get('id', '')
    name = request.form.get('name', '')
    logo = request.form.get('logo', '')

    tag = Tag.find(id)
    if tag is None:
        raise Exception('TAG_NOT_EXIST')

    tag.name = name
    tag.logo = logo
    tag.save()