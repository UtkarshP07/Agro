from django.db import models
from django.contrib.auth.models import User

class Farmer(models.Model):
    """Extends User model to store farmer-specific details"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="farmer_profile")
    location = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.user.username

class Product(models.Model):
    """Farmers can list products for sale"""
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    status = models.CharField(
        max_length=20,
        choices=[('available', 'Available'), ('sold', 'Sold'), ('out_of_stock', 'Out of Stock')],
        default='available'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.farmer.user.username}"

class Order(models.Model):
    """Orders placed for farmer's products"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orders")
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('completed', 'Completed'), ('cancelled', 'Cancelled')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.product.name} ({self.status})"
