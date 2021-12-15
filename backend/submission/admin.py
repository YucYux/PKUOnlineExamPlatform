from django.contrib import admin

# Register your models here.

from .models import Submission

class SubmissionAdmin(admin.ModelAdmin):
    list_display = {'sub_id', 'sub_time', 'result', 'user_id'}

admin.site.register(Submission, SubmissionAdmin)
