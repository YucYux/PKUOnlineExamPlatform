from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Class

admin.site.register(User)

admin.site.register(Class)