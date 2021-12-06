from django.contrib import admin

from .models import Contest


class ContestAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_time', 'end_time', 'visible')


admin.site.register(Contest, ContestAdmin)