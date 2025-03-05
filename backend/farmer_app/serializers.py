from rest_framework import serializers
from .models import Farmer, Product, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

class FarmerDashboardSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    total_products = serializers.SerializerMethodField()
    total_orders = serializers.SerializerMethodField()

    class Meta:
        model = Farmer
        fields = ['user', 'location', 'phone_number', 'products', 'total_products', 'total_orders']

    def get_total_products(self, obj):
        return obj.products.count()

    def get_total_orders(self, obj):
        return Order.objects.filter(product__farmer=obj).count()
