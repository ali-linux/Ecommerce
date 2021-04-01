from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Account
from ..serializers.AccountSerializers import (
  MyTokenObtainPairSerializer,
  UserSerializer,
  UserSerializerWithToken
)
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from base.customValidators.validators import validate_email, validate_username

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer
# GET USER PROFILE
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)
# UPDATE USER PROFILE
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
  user = request.user
  serializer = UserSerializerWithToken(user, many=False)
  data = request.data
  user.first_name = data['first_name']
  user.last_name = data['last_name']

  try:
    if data['password'] != '':
      user.password = make_password(data['password'])
  except Exception:
    pass
  user.save()
  return Response(serializer.data)
# GET ALL USERS ADMIN FUNCTIONALITY
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
  users = Account.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)
# CREATE USER
@api_view(['POST'])
def SignupView(request):
  data = request.data
  try:
    username = (" ".join(data['username'].split())).replace(' ','')
    first_name = (" ".join(data['first_name'].split())).replace(' ','')
    last_name = (" ".join(data['last_name'].split())).replace(' ','')
    email = (" ".join(data['email'].split())).replace(' ', '')
    if (first_name == ''):
      first_name = ' '
    if (last_name == ''):
      last_name = ' ';
    if (validate_email(data['email'])):
      if (validate_username(username)):
        return Response({'details': 'username is required field and it should contain only letters or underscores '})
      else:
        user = Account.objects.create(
        email=email,
        username=username,
        first_name=first_name,
        last_name=last_name,
        password=make_password(data['password']),
      )
      serializer = UserSerializerWithToken(user, many=False)
      return Response(serializer.data)
    else:
      return Response({'details': 'please enter a valid email'})
  except Exception:
    message = {'details': 'User with this email address already exists','data':data}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
  userForDeletation = Account.objects.get(id=pk)
  userForDeletation.delete()
  return Response({'details': 'deleted user successfully'})
  
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
  user = Account.objects.get(id=pk)
  serializer = UserSerializer(user, many=False)
  return  Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUserById(request,pk):
  user = Account.objects.get(id=pk)
  data = request.data
  user.email = data['email']
  user.is_staff = data['isAdmin']
  user.username = data['username']

  user.save()
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)
