from django.contrib import admin
from django.urls import path, include,re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
urlpatterns = [
    re_path(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    re_path(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('',TemplateView.as_view(template_name='index.html') ),
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls.AccountUrls')),
    path('api/', include('base.api.urls.OrderUrls')),
    path('api/', include('base.api.urls.ProductUrls')),
    # path('api/', include('base.api.urls.AccountUrls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
