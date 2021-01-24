from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from app.models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    list_display = ('id', 'phone', 'date_joined', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('partner', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('phone', 'email', 'first_name', 'last_name')
    readonly_fields = ('last_login', 'date_joined')
    fieldsets = (
        (None, {'fields': ('phone', 'email', 'partner', 'city')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'middle_name',)}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    ordering = ('-date_joined', 'id',)
