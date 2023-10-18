from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from .models import User, Course
from .serializers import UserSerializer, UserLoginSerializer, CourseSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class UserCreateView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None): 
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_protect, name='dispatch')
class FacultyCreateView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None): 
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.create_faculty(request.data)
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
                return Response({'Success': 'Logged in'}, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

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
    
@method_decorator(csrf_protect, name='dispatch')
class DisplayUserAccounts(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        users = User.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)
    
@method_decorator(csrf_protect, name='dispatch')
class DisplayUserInformation(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = UserSerializer(request.user)
        return Response(user.data)
    
@method_decorator(csrf_protect, name='dispatch')    
class DisplayRegisteredCourses(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = self.request.user
        courses = Course.objects.filter(students=user.id)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@method_decorator(csrf_protect, name='dispatch')    
class DisplayTaughtCourses(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = self.request.user
        courses = Course.objects.filter(professor_id=user.id)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    

@method_decorator(csrf_protect, name='dispatch') 
class DisplayCourses(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = self.request.user
        courses = Course.objects.exclude(students=user.id)
        courses = CourseSerializer(courses, many=True)
        return Response(courses.data)
    

@method_decorator(csrf_protect, name='dispatch') 
class CourseRegister(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        user = request.user

        for i in request.data:
            course = Course.objects.get(pk=i)
            if Course.objects.filter(id=course.id, students=user.id):
                return Response({'error': 'Already registered for course'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                course.students.add(user)
        return Response({'success': 'Student registered'}, status=status.HTTP_202_ACCEPTED)
                
@method_decorator(csrf_protect, name='dispatch') 
class CourseDrop(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        user = request.user

        for i in request.data:
            course = Course.objects.get(pk=i)
            if Course.objects.filter(id=course.id, students=user.id):
                course.students.remove(user)
            else:
                return Response({'error': 'Student could not be dropped from the course'}, status=status.HTTP_400_BAD_REQUEST) 

        return Response({'success': 'You have dropped the courses you requested'}, status=status.HTTP_202_ACCEPTED)

@method_decorator(csrf_protect, name='dispatch')
class CourseDelete(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def post(request, format=None):
        currentUser = request.user

        if currentUser.is_staff:
            
            for i in request.data:
                course = Course.objects.get(pk=i)
        
                if course:
                    course.delete()
                else:
                    return Response({'Error': 'Course could not be deleted'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'Success': 'Course was deleted'}, status=status.HTTP_202_ACCEPTED) 
        return Response({'Error': 'Must be authenticated to create courses.'}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch') 
class CreateCourse(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def post(request, format=None):
        currentUser = request.user

        if currentUser.is_staff:
            data = request.data
            serializer = CourseSerializer(data=data)

            if serializer.is_valid():
                course = serializer.create(data)
                course.professor_id = currentUser.id
                course.save()
                return Response({'success': 'course created'}, status=status.HTTP_201_CREATED) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Error': 'Must be authenticated to create courses.'}, status=status.HTTP_400_BAD_REQUEST)

