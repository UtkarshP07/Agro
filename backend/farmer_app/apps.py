from django.apps import AppConfig

class FarmersAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'farmer_app'

    def ready(self):
        import farmer_app.signals  
