from django.urls import path, include
from .views import CreateAdView, ApprovedAdsListView, UploadPaymentProofView, UserAdsListView, PayWithCreditsView, AdminAdViewSet
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'admin-ads', AdminAdViewSet, basename='admin-ads')


urlpatterns = [
    path('create/', CreateAdView.as_view()),
    path('live/', ApprovedAdsListView.as_view()),
    path('<int:pk>/upload-proof/', UploadPaymentProofView.as_view()),
    path('my-ads/', UserAdsListView.as_view()),
    path('pay-with-credits/<int:ad_id>/', PayWithCreditsView.as_view()),
    path('', include(router.urls)),
    path('admin/pending/', views.pending_ads),
    path('admin/approve/<int:ad_id>/', views.approve_ad),

]




