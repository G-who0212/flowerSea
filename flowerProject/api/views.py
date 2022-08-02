##################UserInfo 구현###############

from http import server
from logging import raiseExceptions
from msilib.schema import ServiceInstall
from django.contrib.auth.models import AbstractUser
from django.shortcuts import get_object_or_404
from customer.models import UserInfo
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import PickUpLocationCreateSerializer, RegisterSerializer, LoginSerializer, MyPageSerializer, MyAddressSerializer

class RegisterView(generics.CreateAPIView): # 회원가입
    queryset = UserInfo.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    
    
class MyPageAPIView(APIView):
    def get(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            serializer = MyPageSerializer(myinfo, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def put(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            serializer = MyPageSerializer(myinfo, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class UserDeleteAPIView(APIView):
    def delete(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            myinfo.delete()
            return Response("UserInfo successfully deleted!")
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class UserAddressAPIView(APIView):
    def get(self, request):
        if request.user:
            myinfo = UserInfo.objects.filter(username = request.user.username)
            serializer = MyAddressSerializer(myinfo, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
##############################################

###############PickUpLocation 구현#############

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import veiwsets 
from customer.models import PickUpLocation
from .serializers import PickUpLocationSerializer

class PickUpLocationAPIView(APIView):

    def post(self, request): 
        serializer = PickUpLocationCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        pickuplocation = PickUpLocation.objects.filter.all() 
        serializer = PickUpLocationSerializer(pickuplocation, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        pickuplocation = get_object_or_404(PickUpLocation, id=pk) 
        serializer = PickUpLocationCreateSerializer(pickuplocation, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

##############################################

##############BunchOfFlowers 구현##############
from rest_framework import generics
from seller.models import BunchOfFlowers
from .serializers import BunchOfFlowersSerializer, BunchOfFlowersDetailSerializer
from rest_framework import api_view 

@api_view(['GET'])
def BunchOfFlowersView(request, shop):
    bunchofflowers = BunchOfFlowers.objects.filter(shop=shop) 
    serializer = BunchOfFlowersSerializer(bunchofflowers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def BunchOfFlowersDetailView(request, shop, idx):
    bunchofflowers = BunchOfFlowers.objects.filter(shop=shop, idx=idx) 
    serializer = BunchOfFlowersDetailSerializer(bunchofflowers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    # 특정 꽃집 꽃다발의 세부정보 

##############################################