from bson.objectid import ObjectId
from .model import Model
from flask_login import UserMixin

class User(UserMixin, Model):

    @classmethod
    def find(self, id):
        id = ObjectId(id)
        return User.mongo.db.user.find_one({'_id': id})