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

    @classmethod
    def change_tag_num(cls, origin_tags, new_tags):
        deleted_tags = list(set(origin_tags).difference(set(new_tags)))
        added_tags = list(set(new_tags).difference(origin_tags))

        cls.db.update_many({'_id': {'$in': deleted_tags}}, {'$inc': {'num': -1}}, False, True)
        cls.db.update_many({'_id': {'$in': added_tags}}, {'$inc': {'num': 1}}, False, True)