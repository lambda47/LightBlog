from flask_pymongo import PyMongo
from flask import current_app

class Model():

    def __init__(self):
        self.cx = current_app.mongo.cx
        self.db = current_app.mongo.db