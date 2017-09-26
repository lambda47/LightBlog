from flask import Blueprint
from flask import render_template

index = Blueprint('view_admin_index', __name__)

@index.route('/', methods=['GET'])
def main():
    return render_template('admin/index.html')