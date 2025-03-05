from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Product, Order, Farmer
from .serializers import ProductSerializer, OrderSerializer, FarmerDashboardSerializer

class FarmerDashboardView(generics.RetrieveAPIView):
    """Fetch farmer's products & orders (for dashboard)"""
    serializer_class = FarmerDashboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.farmer_profile

class ProductCreateView(generics.CreateAPIView):
    """Farmers can add new products"""
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user.farmer_profile)

class ProductListView(generics.ListAPIView):
    """Retrieve all products for a farmer"""
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(farmer=self.request.user.farmer_profile)

class OrderListView(generics.ListAPIView):
    """Retrieve all orders placed for farmer's products"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(product__farmer=self.request.user.farmer_profile)
