from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..models import Product,Account
from django.contrib.auth.models import User
from django.core.validators import validate_email
import re
from .serializers import (
  ProductSerializer,
  MyTokenObtainPairSerializer,
  UserSerializer,
  UserSerializerWithToken
)
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getProducts(request):
  products = Product.objects.all()
  serializer = ProductSerializer(products, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
  product = Product.objects.get(_id=pk)
  serializer = ProductSerializer(product, many=False)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
  users = Account.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)

def validate_email(email):
  try:
    validate_email( email )
    return True
  except Exception:
    return False

def validate_username(username):
  regex = r'^[\w_]+\Z'
  if (username == '' or not re.match(regex, username)):
    return True
  else:
    return False

@api_view(['POST'])
def SignupView(request):
  data = request.data
  try:
    username = (" ".join(data['username'].split())).replace(' ','')
    first_name = (" ".join(data['first_name'].split())).replace(' ','')
    last_name = (" ".join(data['last_name'].split())).replace(' ','')
    email = (" ".join(data['email'].split())).replace(' ', '')
    if (validate_email(data['email'])):
      if (validate_username(username)):
        return Response({'detail': 'username is required field and it should contain only letters or underscores '})
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
      return Response({'detail': 'please enter a valid email'})
  except Exception:
    message = {'detail': 'User with this email address already exists', 'test': username, 'vall': validate_username(username)}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)
