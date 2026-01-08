from django.urls import path
from .views import BanUserView, LoginView, MeView, MemberListView, AdminBirthdayPreviewView, WalletView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('me/', MeView.as_view()),
    path('admin/members/', MemberListView.as_view()),
    path('admin/ban/<int:user_id>/', BanUserView.as_view()),
    path('admin/birthdays/', AdminBirthdayPreviewView.as_view()),
    path('wallet/', WalletView.as_view()),

]
