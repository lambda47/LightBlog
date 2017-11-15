from datetime import datetime
import random

def rand_filename(suffix):
    """
    生成随机文件名（时间+随机数）
    :param suffix: 文件后缀（.xxx）
    :return: 随机文件名
    """
    date_str = datetime.now().strftime("%Y%m%d%H%M%S")
    rand_str = '{:0>6}'.format(random.randint(0, 999999))
    return date_str + rand_str + suffix