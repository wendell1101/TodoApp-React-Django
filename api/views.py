from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view

from .models import Todo
from .serializers import TodoSerializer

@api_view(['GET'])
def todo_list(request):
    if request.method == 'GET':
        todos = Todo.objects.all().order_by('-created_at')
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def todo_create(request):
	serializer = TodoSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['GET'])
def todo_detail(request,pk):
    if request.method == 'GET':
        todos = Todo.objects.get(id=pk)
        serializer = TodoSerializer(todos)
        return Response(serializer.data)


@api_view(['PUT'])
def update_todo(request,pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Http404

    if request.method == 'PUT':
        serializer = TodoSerializer(todo,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_todo(request,pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Http404
    
    if request.method == 'DELETE':
        todo.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
