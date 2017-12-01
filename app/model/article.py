from .model import Model

# state
DRAFT = 0
PUBLISHED = 1

class Article(Model):
    soft_del_key = 'deleted'
    timestamps = True