from .. import mongo

class ModelMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['cx'] = mongo.cx
        if len(bases) == 0:
            attrs['db'] = mongo.db
        else:
            attrs['db'] = getattr(mongo.db, name.lower())
        return type.__new__(cls, name, bases, attrs)

class Model(metaclass=ModelMetaclass):
    def __init__(self, attrs = None, **kwattrs):
        if attrs is None:
            attrs = dict()
        attrs.update(kwattrs)
        self.__dict__['_data'] = attrs

    def __getattr__(self, item):
        if item in self._data:
            return self._data[item]
        else:
            return None

    def __setattr__(self, key, value):
        self._data[key] = value
