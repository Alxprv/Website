from django.db import models
from django.contrib.auth.models import User

AUTH_USER_MODEL = 'accounts.CustomUser'

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='img/', blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    telegram_name = models.CharField(max_length=100, blank=True, null=True)
    NOTIFICATION_CHOICES = [
        ('telegram-notifications', 'Telegram notifications'),
        ('email-notifications', 'Email notifications'),
        ('marketing-notifications', 'Marketing notifications'),
    ]
    notification_setting = models.CharField(max_length=100, choices=NOTIFICATION_CHOICES, default='email')

    def __str__(self):
        return self.user.username
