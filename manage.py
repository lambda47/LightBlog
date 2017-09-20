from flask import Flask
from flask_session import Session
from flask_login import LoginManager
from flask_pymongo import PyMongo

from app.admin.user import user as view_admin_user
from app.api.user import user as api_user
from app.model.user import User

app = Flask(__name__, static_folder='app/static', template_folder='app/templates')
app.app_context().push()

app.jinja_env.variable_start_string = '${'
app.jinja_env.variable_end_string = '}'

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

app.config['SESSION_PROTECTION'] = 'strong'
login_manager = LoginManager()
@login_manager.user_loader
def load_user(userid):
    return User.find(userid)
login_manager.init_app(app)

app.config['MONGO_HOST'] = 'localhost'
app.config['MONGO_PORT'] = 27017
app.config['MONGO_DBNAME'] = 'lightblog'
mongo = PyMongo(app)

app.register_blueprint(view_admin_user, url_prefix = '/admin/user')
app.register_blueprint(api_user, url_prefix = '/user')

if __name__ == '__main__':
    app.run(debug=True)