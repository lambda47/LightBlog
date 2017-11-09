from ..lib.result import result
import re

from .model import Model

class Tag(Model):

    @classmethod
    def find_by_name(cls, name):
        """根据名称模糊匹配标签"""
        if name:
            name_rexexp = re.compile('.*{}.*'.format(name), re.IGNORECASE)
            return result(cls.db.find({'name': name_rexexp}), cls)
        else:
            return cls.find_all()