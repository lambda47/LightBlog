from bson.objectid import ObjectId
from .model import Model
from flask_login import UserMixin

class User(UserMixin, Model):

    def get_id(self):
        return self._id

    @classmethod
    def find(cls, id):
        id = ObjectId(id)
        user = User.mongo.db.user.find_one({'_id': id})
        if user is None:
            return None
        else:
            return User(user)

    @classmethod
    def findByUsername(cls, username):
        user = User.mongo.db.user.find_one({'username': username})
        if user is None:
            return None
        else:
            return User(user)