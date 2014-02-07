from django.db import models

# Create your models here.

class Basket(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=140)
