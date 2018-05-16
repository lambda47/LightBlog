from flask import session
from flask_login import UserMixin

from ..lib.result import result

from .. import login_manager
from .model import Model


@login_manager.user_loader
def load_user(userid):
    """查找指定Id的用户，会现查找session，然后查找Mongodb"""
    if 'user' in session and str(session['user']['_id']) == userid:
        return User(session['user'])
    else:
        user = User.find(userid)
        session['user'] = user.as_dict()
        return user


class User(UserMixin, Model):
    """用户"""

    def get_id(self):
        """返回用户Id"""
        return self._id

    @classmethod
    def find_by_username(cls, username):
        """根据用户名查找用户

        :param username: 用户名
        :return: 查找结果
        """
        user = User.db.find_one({'username': username})
        return result(user, cls)