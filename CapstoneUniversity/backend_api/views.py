from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from .models import User, Course
from .serializers import UserSerializer, UserLoginSerializer, UserRegisterSerializer, FacultyRegisterSerializer, CourseSerializer, CreateCourseSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class UserCreateView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None): 
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_protect, name='dispatch')
class FacultyCreateView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None): 
        serializer = FacultyRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    @staticmethod
    def post(request, format=None):
        data = request.data
        serializer = UserLoginSerializer(data=data)

        if serializer.is_valid():
            user = serializer.check_user(data)
            if user is not None:
                login(request, user)
                return Response(serializer.data, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_protect, name='dispatch')  
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    @staticmethod
    def post(request, format=None):
        logout(request)
        return Response(status=status.HTTP_200_OK)
                

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'success': 'cookie set'})
    

class DisplayUserAccounts(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        users = User.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)
    

class DisplayUserInformation(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = UserSerializer(request.user)
        return Response(user.data)
    

@method_decorator(csrf_protect, name='dispatch') 
class DisplayCourses(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        courses = Course.objects.all()
        courses = CourseSerializer(courses, many=True)
        return Response(courses.data)
    

@method_decorator(csrf_protect, name='dispatch') 
class CourseRegister(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    pass

@method_decorator(csrf_protect, name='dispatch') 
class CreateCourse(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def post(request, format=None):
        currentUser = request.user

        if currentUser.is_staff:
            data = request.data
            serializer = CreateCourseSerializer(data=data)

            if serializer.is_valid():
                course = serializer.create(data)
                course.professor_id = currentUser.id
                course.save()
                return Response({'success': 'course created'}, status=status.HTTP_200_OK) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Error': 'Must be authenticated to create courses.'}, status=status.HTTP_400_BAD_REQUEST)

