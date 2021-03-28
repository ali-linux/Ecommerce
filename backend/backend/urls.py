from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls.AccountUrls')),
    path('api/', include('base.api.urls.OrderUrls')),
    path('api/', include('base.api.urls.ProductUrls')),
    # path('api/', include('base.api.urls.AccountUrls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
