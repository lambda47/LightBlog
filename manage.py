from flask import Flask
from app.admin.admin import admin as admin_blueprint

app = Flask(__name__, static_folder='app/static', template_folder='app/templates')

app.jinja_env.variable_start_string = '${'
app.jinja_env.variable_end_string = '}'

app.register_blueprint(admin_blueprint, url_prefix = '/admin/user')

if __name__ == '__main__':
    app.run(debug=True)