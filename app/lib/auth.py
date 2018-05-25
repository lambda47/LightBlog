from flask import redirect
from flask import url_for
from flask_login import current_user
from functools import wraps, partial


def is_logged_in(is_admin=False):
    """用户是否登录"""
    logged_in = current_user.is_authenticated == True and \
                    current_user.is_active == True
    if is_admin:
        logged_in = logged_in and current_user.is_admin
    return logged_in


admin_is_logged_in = partial(is_logged_in, True)


def admin_login_require(mode = 'web'):
    def _admin_login_require(func):
        @wraps(func)
        def auth_validate(*args, **kwargs):
            if admin_is_logged_in():
                return func(*args, **kwargs)
            else:
                if mode == 'api':
                    raise Exception('AUTH_FAILURE')
                else:
                    return redirect(url_for('view_admin_user.login'))
        return auth_validate
    return _admin_login_require


def login_require(mode = 'web'):
    def _login_require(func):
        @wraps(func)
        def auth_validate(*args, **kwargs):
            if is_logged_in():
                return func(*args, **kwargs)
            else:
                if mode == 'api':
                    raise Exception('AUTH_FAILURE')
                else:
                    return redirect(url_for('view_user.login'))
        return auth_validate
    return _login_require