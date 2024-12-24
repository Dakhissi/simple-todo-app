from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todos.views import CategoryViewSet, TodoViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = [
    path('api/', include(router.urls)),
]