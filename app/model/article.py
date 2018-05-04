from .model import Model
import re
import pymongo
import datetime
import time

# state
DRAFT = 0
PUBLISHED = 1


class Article(Model):
    soft_del_key = 'deleted'
    timestamps = True

    @classmethod
    def find_by_condition(cls, title='', date='', fuzzy=True):
        """查找文章

        :param title: 文章标题
        :param date: 发布日期
        """
        query = {}
        if title:
            if fuzzy:
                title = re.compile('.*{}.*'.format(title), re.IGNORECASE)
            query['title'] = title
        if date:
            begin_date = datetime.datetime.utcfromtimestamp(time.strptime(date, '%Y-%m-%d 0:0:0'))
            end_date = datetime.datetime.utcfromtimestamp(time.strptime(date, '%Y-%m-%d 23:59:59'))
            query['date'] = {'$gte': begin_date, '$lge': end_date}
        return cls.find_all(query).sort('updated_at', pymongo.DESCENDING)
