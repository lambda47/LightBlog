from .. import mongo
from bson.objectid import ObjectId
from bson import errors
from ..lib.result import result
import datetime


class ModelMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['cx'] = mongo.cx
        if len(bases) == 0:
            attrs['db'] = mongo.db
        else:
            attrs['db'] = getattr(mongo.db, name.lower())
        return type.__new__(cls, name, bases, attrs)


class Model(metaclass=ModelMetaclass):
    #　软删除
    soft_del_key = None
    # 是否添加时间字段（创建时间，更新时间）
    timestamps = False

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
            try:
                id = ObjectId(id)
            except errors.InvalidId:
                return result(None, cls)
        query = {'_id': id}
        if cls.soft_del_key is not None:
            query[cls.soft_del_key] = False
        data = cls.db.find_one(query)
        return result(data, cls)

    @classmethod
    def find_all(cls, query = None, **kwargs):
        """ 获取全部数据

        :return: 查找结果
        """
        if query is None:
            query = {}
        query.update(kwargs)
        if cls.soft_del_key is not None:
            query[cls.soft_del_key] = False
        return result(cls.db.find(query), cls)

    @classmethod
    def add(cls, attrs = None, **kwattrs):
        """添加文档

        param attr: 对象属性(Dict类型)
        param kwattrs: 对象属性
        :return： 添加后对象
        """
        return cls(attrs, **kwattrs).save()

    def save(self):
        """如果存在_id属性,修改文档，否则添加文档"""
        if '_id' in self._data:
            if self.timestamps:
                self.updated_at = datetime.datetime.utcnow()
            return self.db.find_one_and_update({'_id': self._id},
                {'$set': {k: v for k, v in self._data.items() if k != '_id'}})
        else:
            if self.soft_del_key is not None:
                setattr(self, self.soft_del_key, False)
            if self.timestamps:
                now = datetime.datetime.utcnow()
                self.created_at = now
                self.updated_at = now
            self._id = self.db.insert_one(self.as_dict()).inserted_id
            return self

    def as_dict(self):
        """转换为字典格式"""
        return self._data

    def remove(self):
        """删除文档"""
        if self.soft_del_key is None:
            return self.db.delete_one({'_id': self.id})
        else:
            setattr(self, self.soft_del_key, True)
            self.updated_at = datetime.datetime.utcnow()
            return self.save()

    def filter(self, *args, **kwargs):
        """过滤属性，转换为dict"""
        result = {}
        for arg in args:
            result[arg] = getattr(self, arg, None)
        for key, val in kwargs.items():
            if callable(val):
                result[key] = val(self)
            else:
                result[key] = getattr(self, val, None)
        return result
