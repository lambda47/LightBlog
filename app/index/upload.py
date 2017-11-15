from flask import Blueprint
from flask import send_from_directory
from .. import app

upload = Blueprint('view_upload', __name__)

@upload.route('/<path:filename>')
def display_file(filename):
    """
    显示上传文件
    :param filename: 文件路径
    :return: 文件流
    """
    return send_from_directory(app.config['UPLOADED_IMAGE_DEST'], filename)