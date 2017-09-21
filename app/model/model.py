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

    def __init__(self, attrs = None, **kwattrs):
        if attrs is None:
            attrs = dict()
        attrs.update(kwattrs)
        self.__dict__['_data'] = attrs

    def __getattr__(self, item):
        return self._data[item]

    def __setattr__(self, key, value):
        self._data[key] = value
