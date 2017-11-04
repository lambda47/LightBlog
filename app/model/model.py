from .. import mongo
from bson.objectid import ObjectId
from ..lib.result import result

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

    @classmethod
    def find(cls, id):
        """根据Id查找数据

        :param id: 用户Id
        :return: 查找结果
        """
        if not isinstance(id, ObjectId):
            id = ObjectId(id)
        data = cls.db.find_one({'_id': id})
        return result(data, cls)

    @classmethod
    def find_all(cls):
        """ 获取全部数据

        :return: 查找结果
        """
        return result(cls.db.find(), cls)

    @classmethod
    def add(cls, obj):
        """添加文档

        param obj: 文档数据
        :return
        """
        return cls.db.insert_one(obj._data).inserted_id

    def save(self):
        """保存文档"""
        id = self._id
        data = self._data
        del data['_id']
        return self.db.find_one_and_update({'_id': id}, {'$set': data})

    def as_dict(self):
        """转换为字典格式"""
        return self._data