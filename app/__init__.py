from flask import Flask
from flask_session import Session
from flask_login import LoginManager
from flask_pymongo import PyMongo
from flask_uploads import UploadSet
from flask_uploads import IMAGES
from flask_uploads import configure_uploads
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
app.app_context().push()

# jinja模板
app.jinja_env.variable_start_string = '${'
app.jinja_env.variable_end_string = '}'

# session
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# flask-login
app.config['SESSION_PROTECTION'] = 'strong'
login_manager = LoginManager()
login_manager.init_app(app)

# MongoDB
app.config['MONGO_HOST'] = 'localhost'
app.config['MONGO_PORT'] = 27017
app.config['MONGO_DBNAME'] = 'lightblog'
mongo = PyMongo(app)

# 上传
app.config['UPLOADED_IMAGE_DEST'] = os.path.abspath(os.path.dirname(
    os.path.abspath(__file__))+ '/../upload')
app.config['UPLOADED_IMAGE_URL'] = '/upload/'
app.config['UPLOADED_IMAGE_ALLOW'] = IMAGES
images = UploadSet('image', IMAGES)
configure_uploads(app, images)

app.config['SECRET_KEY'] = 'LIGHTBLOG'

# 管理后台首页
from .admin.index import index as view_admin_index
app.register_blueprint(view_admin_index, url_prefix='/admin')
# 管理后台用户登录页
from .admin.user import user as view_admin_user
app.register_blueprint(view_admin_user, url_prefix='/admin/user')
# 管理后台标签设置页
from .admin.tag import tag as view_admin_tag
app.register_blueprint(view_admin_tag, url_prefix='/admin/tags')
# 管理后台文章管理页
from .admin.article import article as view_admin_article
app.register_blueprint(view_admin_article, url_prefix='/admin/article')
# 文件上传接口
from .api.upload import upload as api_upload
app.register_blueprint(api_upload, url_prefix='/upload')
# 用户接口
from .api.user import user as api_user
app.register_blueprint(api_user, url_prefix='/user')
# 标签接口
from .api.tag import tag as api_tag
app.register_blueprint(api_tag, url_prefix='/tag')
# 文章接口
from .api.article import article as api_article
app.register_blueprint(api_article, url_prefix='/article')

# 上传文件显示
from .index.upload import upload as view_upload
app.register_blueprint(view_upload, url_prefix='/upload')