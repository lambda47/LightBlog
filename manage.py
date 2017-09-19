from flask import Flask
from app.admin.admin import admin as view_admin_admin
from app.api.admin import admin as api_admin
from flask_session import Session

app = Flask(__name__, static_folder='app/static', template_folder='app/templates')

app.jinja_env.variable_start_string = '${'
app.jinja_env.variable_end_string = '}'

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

app.register_blueprint(view_admin_admin, url_prefix = '/admin/user')
app.register_blueprint(api_admin, url_prefix = '/admin/user')

if __name__ == '__main__':
    app.run(debug=True)