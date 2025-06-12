from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered
from .models import Product
from .models import UserProfile

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'image')
    search_fields = ('name',)

try:
    admin.site.register(Product)
    admin.site.register(UserProfile)
except AlreadyRegistered:
    pass

