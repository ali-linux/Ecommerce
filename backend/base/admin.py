from django.contrib import admin
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group


# class CustomModelAdmin(admin.ModelAdmin):
#   def __init__(self, model, admin_site):
#       self.list_display = [field.name for field in User._meta.fields if field.name != "id"]
#       super(CustomModelAdmin, self).__init__(User, admin_site)

class AccountAdmin(UserAdmin):
  list_display = ['id','email', 'username', 'first_name','date_join','last_login','is_admin','is_staff',]
  search_fields = ['email', 'username']
  readonly_fields = ['date_join', 'last_login']

  filter_horizontal = ()
  list_filter = ()
  fieldsets = ()

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.unregister(Group)
admin.site.register(Account,AccountAdmin)
# admin.site.register(User, CustomModelAdmin)
