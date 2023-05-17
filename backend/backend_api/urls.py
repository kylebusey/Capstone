from django.urls import path
from .views import UserCreateView, FacultyCreateView, GetCSRFToken, LoginView, DisplayUserAccounts, DisplayUserInformation

urlpatterns = [
    path('register/', UserCreateView.as_view(), name="create_user"),
    path('faculty/register/', FacultyCreateView.as_view(), name="create_faculty_user"),
    path('login/', LoginView.as_view(), name='login_user'),
    path('auth/token/', GetCSRFToken.as_view(), name='token_create'),
    path('displayaccounts/', DisplayUserAccounts.as_view(), name="display_accounts"),
    path('userinfo/', DisplayUserInformation.as_view(), name="get_user_info"),
]