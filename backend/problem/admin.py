from django.contrib import admin

from .models import Problem, ProblemTag


class ProblemAdmin(admin.ModelAdmin):
    list_display = ('_id', 'title', 'difficulty', 'type')


class ProblemTagAdmin(admin.ModelAdmin):
    list_display = ('name',)


admin.site.register(Problem, ProblemAdmin)
admin.site.register(ProblemTag, ProblemTagAdmin)