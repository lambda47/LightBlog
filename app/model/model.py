from flask import current_app

class MongoProxy:

    @property
    def cx(self):
        return current_app.extensions['pymongo']['MONGO'][0]

    @property
    def db(self):
        return current_app.extensions['pymongo']['MONGO'][1]

class Model:
    mongo = MongoProxy()