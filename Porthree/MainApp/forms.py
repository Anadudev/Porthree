"""
This module contains all forms for data posting
"""
from django.contrib.auth.models import User
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from .models import UserDetails, Skill, Project, Post


class UserDetailsForm(forms.ModelForm):
    class Meta:
        model = UserDetails
        fields = [
            "email",
            "first_name",
            "last_name",
            "career_title",
            "phone_number",
            "about_me",
            "resume",
        ]
        fields.append("profile_picture")
        widgets = {
            "resume": forms.FileInput(
                attrs={
                    "accept": "application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                }
            ),
            "email": forms.TextInput(attrs={"class": "form-control"}),
            "first_name": forms.TextInput(attrs={"class": "form-control"}),
            "last_name": forms.TextInput(attrs={"class": "form-control"}),
            "career_title": forms.TextInput(attrs={"class": "form-control"}),
            "phone_number": forms.TextInput(attrs={"class": "form-control"}),
            "about_me": forms.Textarea(attrs={"class": "form-control"}),
        }


class SkillForm(forms.ModelForm):
    class Meta:
        model = Skill
        fields = ["name"]
        widgets = {
            "name": forms.TextInput(
                attrs={"class": "form-control", "placeholder": "Skills here"}
            ),
        }


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ["title", "about", "comment", "rating"]
        widgets = {
            "title": forms.TextInput(
                attrs={"class": "form-control", "placeholder": "Project title here"}
            ),
            "about": forms.Textarea(
                attrs={"class": "form-control", "placeholder": "Write about project..."}
            ),
        }


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "post_image", "content"]

        widgets = {
                "title": forms.TextInput(
                    attrs={"class": "form-control", "placeholder": "Project title here"}
                ),
                "content": forms.Textarea(
                    attrs={"class": "form-control", "placeholder": "Write about project..."}
                ),
            }


class SignUpForm(UserCreationForm):
    # Add custom fields if needed
    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

        widgets = {
            "username": forms.TextInput(
                attrs={"class": "form-control", "placeholder": "Username"}
            ),
            "email": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "example@gmail.com",
                    "required": "required",
                }
            ),
            "password1": forms.PasswordInput(
                attrs={"class": "form-control", "placeholder": "Password"}
            ),
            "password2": forms.PasswordInput(
                attrs={"class": "form-control", "placeholder": "Confirm Password"}
            ),
        }


class LoginForm(AuthenticationForm):
    pass
