from django.contrib import admin
from api.models import (
    UserDetails,
    Post,
    Project,
    Tag,
    Tool,
    Social,
    Skill,
    Education,
    Experience,
    Rating,
    PostComment,
    ProjectComment,
    Share,
    Like,
)

admin.site.register(UserDetails)
admin.site.register(Project)
admin.site.register(Post)
admin.site.register(Tag)
admin.site.register(Tool)
admin.site.register(Social)
admin.site.register(Skill)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Rating)
admin.site.register(PostComment)
admin.site.register(ProjectComment)
admin.site.register(Share)
admin.site.register(Like)
