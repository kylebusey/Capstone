from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate


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
		if user.is_authenticated:
			return user
		else:
			return None
    
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
