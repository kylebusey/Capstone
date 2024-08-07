from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    is_staff = models.BooleanField(default=False)

    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def get_name(self):
        return self.first_name + " " + self.last_name
    
    def get_user_type(self):
        return self.is_staff
    

class Course(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50, default='Course Name')
    professor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='instructor', null=True)
    building = models.CharField(max_length=50)
    time = models.CharField(max_length=30)
    start_date = models.DateField()
    end_date = models.DateField()
    students = models.ManyToManyField(User, related_name='registered', blank=True)
    available = models.PositiveIntegerField()
    
    def decrementSeats(self):
        if self.available > 0:
            self.available -= 1
            self.save()
        else:
            raise ValidationError("No available slots for this course")
        
    def incrementSeats(self):
        self.available += 1
        self.save()
    
        
    def __str__(self):
        return self.name




    

