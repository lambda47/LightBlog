from flask import Flask
from flask_session import Session
from flask_login import LoginManager
from flask_pymongo import PyMongo

app = Flask(__name__, static_folder='static', template_folder='templates')
app.app_context().push()

app.jinja_env.variable_start_string = '${'
app.jinja_env.variable_end_string = '}'

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

app.config['SESSION_PROTECTION'] = 'strong'
login_manager = LoginManager()
login_manager.init_app(app)

app.config['MONGO_HOST'] = 'localhost'
app.config['MONGO_PORT'] = 27017
app.config['MONGO_DBNAME'] = 'lightblog'
mongo = PyMongo(app)

from .admin.user import user as view_admin_user
app.register_blueprint(view_admin_user, url_prefix = '/admin/user')
from .api.user import user as api_user
app.register_blueprint(api_user, url_prefix = '/user')

app.config['SECRET_KEY'] = 'LIGHTBLOG'