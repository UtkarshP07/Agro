from django.db import models

class User(models.Model):
    ACCOUNT_CHOICES = [
        ('farmer', 'Farmer'),
        ('manufacturer', 'Manufacturer'),
        ('transporter', 'Transporter'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # Store hashed passwords securely
    phone = models.CharField(max_length=15)
    account_type = models.CharField(max_length=15, choices=ACCOUNT_CHOICES)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    agreed = models.BooleanField(default=False)

    def __str__(self):
        return self.email
    