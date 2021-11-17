from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Class


class _UserAdmin(UserAdmin):
    def __init__(self, *args, **kwargs):
        super(_UserAdmin, self).__init__(*args, **kwargs)
        self.list_display = ('username', 'student_name', 'student_number',
                             'class_info', 'admin_type')
        self.search_fields = ('student_name', 'student_number',
                              'class_info', 'admin_type')

    def changelist_view(self, request, extra_context=None):
        self.fieldsets = ((None, {'fields': ('username', 'password',)}),
                          (u'用户信息', {'fields': ('student_name', 'student_number')}),
                          (u'用户权限', {'fields': ('is_active', 'is_staff', 'is_superuser', 'admin_type')}),
                          (u'用户足迹', {'fields': ('last_login', 'date_joined')}),)
        return super(_UserAdmin, self).changelist_view(request)


class ClassAdmin(admin.ModelAdmin):
    list_display = ('class_name', 'class_number', 'teacher')


admin.site.register(User, _UserAdmin)
admin.site.register(Class, ClassAdmin)
