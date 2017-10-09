from flask import redirect
from flask import url_for
from flask_login import current_user
from functools import wraps

def _admin_loggedin():
    return current_user.is_authenticated == True and \
                    current_user.is_active == True and \
                    current_user.is_admin == True

def admin_login_require(func, mode = 'web'):

    @wraps(func)
    def auth_validate(*args, **kwargs):
        if _admin_loggedin():
            return func(*args, **kwargs)
        else:
            if mode == 'api':
                raise Exception('AUTH_FAILURE')
            else:
                return redirect(url_for('view_admin_user.login'))
    return auth_validate