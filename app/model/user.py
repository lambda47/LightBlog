from bson.objectid import ObjectId
from flask_login import UserMixin

from .. import login_manager
from .model import Model


@login_manager.user_loader
def load_user(userid):
    return User.find(userid)

class User(UserMixin, Model):

    def get_id(self):
        return self._id

    @classmethod
    def find(cls, id):
        id = ObjectId(id)
        user = User.db.find_one({'_id': id})
        if user is None:
            return None
        else:
            return User(user)

    @classmethod
    def findByUsername(cls, username):
        user = User.db.find_one({'username': username})
        if user is None:
            return None
        else:
            return User(user)