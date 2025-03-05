
from django.contrib import admin
from .models import Farmer, Product, Order

@admin.register(Farmer)
class FarmerAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'phone_number')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'farmer', 'price', 'quantity', 'status', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('name', 'farmer__user__username')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('product', 'buyer', 'quantity', 'total_price', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('product__name', 'buyer__username')
