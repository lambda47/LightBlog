from flask import Blueprint
from flask import request
from .. import images
import os
from ..lib.tools import rand_filename
from ..lib.apiview import apiview
from ..lib.auth import admin_login_require
from ..lib.image import Image

upload = Blueprint('api_upload', __name__)

@upload.route('/image', methods=['POST'])
@apiview
@admin_login_require('api')
def upload_image():
    """图片上传"""
    type = request.form.get('type', 'article')

    if 'image' not in request.files:
        raise Exception('DONOT_HAVE_FILE')
    file = request.files['image']
    filename = rand_filename(os.path.splitext(file.filename)[-1].lower())
    filename = images.save(file, 'image', filename)
    if type == 'tag':
        abspath = images.path(filename)
        im = Image.open(abspath)
        im.thumb(90, 90)
        im.save(abspath)
    url = images.url(filename)
    return {'path': filename, 'url': url}
