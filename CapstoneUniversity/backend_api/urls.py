from django.urls import path
from .views import UserCreateView, FacultyCreateView, GetCSRFToken, LoginView, LogoutView, DisplayUserAccounts, DisplayUserInformation, DisplayCourses, CourseRegister, CreateCourse, CourseDrop, DisplayRegisteredCourses, DisplayTaughtCourses, CourseDelete

urlpatterns = [
    path('register/', UserCreateView.as_view(), name="create_user"),
    path('faculty/register/', FacultyCreateView.as_view(), name="create_faculty_user"),
    path('login/', LoginView.as_view(), name='login_user'),
    path('logout/', LogoutView.as_view(), name='logout_user'),
    path('auth/token/', GetCSRFToken.as_view(), name='token_create'),
    path('displayaccounts/', DisplayUserAccounts.as_view(), name="display_accounts"),
    path('userinfo/', DisplayUserInformation.as_view(), name="get_user_info"),
    path('courseinfo/', DisplayRegisteredCourses.as_view(), name='get_course_info'),
    path('coursestaught/', DisplayTaughtCourses.as_view(), name='get_courses_taught'),
    path('courses/display', DisplayCourses.as_view(), name='display_courses'),
    path('courses/register', CourseRegister.as_view(), name='student_course_register'),
    path('courses/drop', CourseDrop.as_view(), name='student_course_drop'),
    path('courses/create', CreateCourse.as_view(), name='faculty_course_create'),
    path('courses/delete', CourseDelete.as_view(), name='faculty_course_delete'),

]