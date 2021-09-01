from django.contrib import admin
from .models import Todo
# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    # Define list to display, name should be consistent with models
    list_display = ('title', 'description', 'completed')

admin.site.register(Todo, TodoAdmin)