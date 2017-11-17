from PIL import Image as PILImage
from functools import wraps

class Image:
    def __init__(self, im):
        self.im = im

    @staticmethod
    def open(filename):
        return Image(PILImage.open(filename))

    def __getattr__(self, item):
        """映射到PIL Image方法和属性"""
        attr = getattr(self.im, item)
        if callable(attr):
            @wraps(attr)
            def func(*args, **kwargs):
                self.im = attr(*args, **kwargs)
                return self
            return func
        else:
            return attr

    def thumb(self, width=None, height=None):
        """
        生成缩略图
        :param self:
        :param width:
        :param height:
        :return:
        """

        ori_w, ori_h = self.im.size

        # 原始宽高比
        ori_aspect_ratio = ori_w / ori_h

        if width is None and height is None:
            return self
        elif width is None:
            width = int(ori_aspect_ratio * height)
        elif height is None:
            height = int(width / ori_aspect_ratio)

        # 裁剪后宽高比
        dst_aspect_ratio = width / height

        # 纵向裁剪
        if ori_aspect_ratio <= dst_aspect_ratio:
            dst_w = ori_w
            dst_h = int(ori_w / dst_aspect_ratio)

            x = 0
            y = int((ori_h - ori_w) / 2)
        # 横向裁剪
        else:
            dst_h = ori_h
            dst_w = int(ori_h * dst_aspect_ratio)

            x = int((ori_w - ori_h) / 2)
            y = 0

        self.im = self.im.crop((x, y, dst_w + x, dst_h + y)) \
            .resize((width, height), PILImage.ANTIALIAS)
        return self