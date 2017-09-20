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

    def __init__(self, attrs = None, **attrs_dict):
        attrs.update(attrs_dict)
        if attrs is not None:
            for attr, val in attrs.items():
                self.__dict__[attr] = val