from .model import Model


class Setting(Model):

    @classmethod
    def set(cls, title, intro, draft, content):
        """
        修改设置(设置信息不存在时创建，存在时修改)
        param self:
        param title: 标题
        param intro: 简介
        param draft: 详细信息(markdown)
        param content: 详细信息(html)
        """
        setting = cls.db.find_one()
        if setting:
            setting = cls(setting)
            setting.title = title
            setting.intro = intro
            setting.draft = draft
            setting.content = content
            return setting.save()
        else:
            return cls.add({
                title: title,
                intro: intro,
                draft: draft,
                content: content
            })

    @classmethod
    def get(cls):
        """获取设置信息"""
        setting = cls.db.find_one()
        if setting is not None:
            setting = cls(setting)
        else:
            setting = cls({
                'title': '',
                'intro': '',
                'draft': '',
                'content': ''
            })
        return setting
