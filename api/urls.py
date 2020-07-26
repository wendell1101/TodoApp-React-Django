from django.urls import path
from . import views

urlpatterns=[
    path('todo-list/', views.todo_list),
    path('todo-create/', views.todo_create),
    path('todo-detail/<int:pk>/', views.todo_detail),
    path('todo-update/<int:pk>/', views.update_todo),
    path('todo-delete/<int:pk>/', views.delete_todo),
]