from bson.objectid import ObjectId
from flask_login import UserMixin

from ..lib.result import result

from .. import login_manager
from .model import Model


@login_manager.user_loader
def load_user(userid):
    return User.find(userid)

class User(UserMixin, Model):
    """用户"""

    def get_id(self):
        """返回用户Id"""
        return self._id

    @classmethod
    def findByUsername(cls, username):
        """根据用户名查找用户

        :param username: 用户名
        :return: 查找结果
        """
        user = User.db.find_one({'username': username})
        return result(user, cls)