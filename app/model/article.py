from .model import Model
import re
from datetime import datetime
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
            begin_date = datetime.utcfromtimestamp(
                time.mktime(time.strptime("{} 00:00:00".format(date), '%Y-%m-%d %H:%M:%S')))
            end_date = datetime.utcfromtimestamp(
                time.mktime(time.strptime("{} 23:59:59".format(date), '%Y-%m-%d %H:%M:%S')))
            query['published_at'] = {'$gte': begin_date, '$lte': end_date}
        return cls.find_all(query)
