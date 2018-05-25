from flask import Blueprint
from flask import request
from ..lib.apiview import apiview
from ..lib.auth import admin_login_require
from ..model.setting import Setting

setting = Blueprint('api_setting', __name__)


@setting.route('/info/save', methods=['POST'])
@apiview
@admin_login_require('api')
def save_info_setting():
    """保存设置信息"""
    title = request.form.get('title')
    intro = request.form.get('intro')
    draft = request.form.get('draft')
    content = request.form.get('content')
    Setting.set(title, intro, draft, content)


@setting.route('/info', methods=['POST'])
@apiview
@admin_login_require('api')
def get_info_setting():
    """获取设置信息"""
    setting = Setting.get()
    return {'setting': setting.filter('title', 'intro', 'draft')}