from django.urls import path
from .views import FarmerDashboardView, ProductCreateView, ProductListView, OrderListView

urlpatterns = [
    path('dashboard/', FarmerDashboardView.as_view(), name='farmer-dashboard'),
    path('products/add/', ProductCreateView.as_view(), name='add-product'),
    path('products/', ProductListView.as_view(), name='list-products'),
    path('orders/', OrderListView.as_view(), name='list-orders'),
]
