from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Course


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(username=clean_data['username'],
					   first_name = clean_data['first_name'], last_name=clean_data['last_name'],
			 password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.set_password(clean_data['password'])
		user_obj.save()
		return user_obj
	

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()

	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])    
		if user is None:
			return None
		else:
			return user
    
class FacultyRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(username=clean_data['username'],
					   first_name = clean_data['first_name'], last_name=clean_data['last_name'],
			 password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.set_password(clean_data['password'])
		user_obj.is_staff = True
		user_obj.save()
		return user_obj


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('username', 'first_name', 'last_name', 'is_staff')


class CourseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Course
		fields = '__all__'

class CreateCourseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Course
		fields = ('name', 'building', 'time', 'start_date', 'end_date', 'available') 

	def create(self, clean_data):
		course = Course.objects.create(name=clean_data['name'], building=clean_data['building'],
				 time=clean_data['time'], start_date=clean_data['start_date'], end_date=clean_data['end_date'],
				 available=clean_data['available'])
		
		course.save()
		return course
