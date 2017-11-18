import re
import pymongo

from .model import Model

class Tag(Model):
    soft_del_key = 'deleted'
    timestamps = True

    @classmethod
    def find_by_name(cls, name):
        """根据名称模糊匹配标签"""
        if name:
            name_rexexp = re.compile('.*{}.*'.format(name), re.IGNORECASE)
            return cls.find_all({'name': name_rexexp}).sort({'created_at': -1})
        else:
            return cls.find_all().sort('created_at', pymongo.DESCENDING)