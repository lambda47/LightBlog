from functools import wraps
from flask import jsonify
from ..config.errno import errno
import traceback


def apiview(func):
    @wraps(func)
    def json_response(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            data = []
            if result is not None and (type(result) == list or type(result) == dict):
                data = result
            return jsonify({
                'code': 1000,
                'msg': '成功',
                'data': data
            })
        except Exception as err_type:
            err_type = str(err_type)
            if err_type in errno:
                err = errno[err_type]
                code, msg = err['code'], err['msg']
            else:
                traceback.print_exc()
                code, msg = 1001, '未知错误'
            return jsonify({
                'code': code,
                'msg': msg
            })
    return json_response
