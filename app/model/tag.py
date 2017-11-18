import re
import pymongo

from .model import Model

class Tag(Model):
    soft_del_key = 'deleted'
    timestamps = True

    @classmethod
    def find_by_name(cls, name, fuzzy = True):
        """根据名称模糊匹配标签"""
        if name:
            if fuzzy:
                name = re.compile('.*{}.*'.format(name), re.IGNORECASE)
            return cls.find_all({'name': name}).sort('created_at', pymongo.DESCENDING)
        else:
            return cls.find_all().sort('created_at', pymongo.DESCENDING)