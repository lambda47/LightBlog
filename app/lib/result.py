from pymongo.cursor import Cursor
from functools import wraps


def result(result, t):
    """ 包装查找结果

    :param result: 查找结果
    :param t: 数据类型
    :return: 包装后结果
    """
    if result is None:
        return None
    # 查找结果为单个文档
    elif isinstance(result, dict):
        return t(result)
    # 查找结果为多个文档集合
    elif isinstance(result, Cursor):
        return ResultList(t, result)
    else:
        raise Exception('参数类型错误')


class ResultList:
    """ 查询结果的可迭代对象，成员为指定类型的实例"""

    def __init__(self, t, results_list):
        self.results = results_list
        self.type = t
        self.iter = iter(self.results)

    def __getattr__(self, item):
        """映射 pymongo Cursor；方法和属性"""
        attr = getattr(self.results, item)
        if callable(attr):
            @wraps(attr)
            def func(*args, **kwargs):
                result = attr(*args, **kwargs)
                if isinstance(result, Cursor):
                    self.results = result
                    return self
                else:
                    return result
            return func
        else:
            return attr


    def __iter__(self):
        return self

    def __next__(self):
        return self.type(next(self.iter))