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
    elif isinstance(result, list):
        return ResultList(t, result)
    else:
        raise Exception('参数类型错误')

class ResultList:
    """ 查询结果的可迭代对象，成员为指定类型的实例"""

    def __init__(self, t, results_list):
        self.results = results_list
        self.type = t
        self.iter = iter(self.results)

    def __iter__(self):
        return self.iter

    def __next__(self):
        return self.type(next(self.iter))

    def __len__ (self):
        return len(self.results)