from django.contrib import admin

from .models import Announcement


class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'create_time')


admin.site.register(Announcement, AnnouncementAdmin)
