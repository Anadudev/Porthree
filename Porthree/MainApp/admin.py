from django.contrib import admin
from .models import (
    UserDetails,
    PostTags,
    Post,
    Comment,
    Skill,
    Social,
    Hero,
    Theme,
    Project,
    ProjectTools,
    ProjectSkills,
    PorthreeAbout,
    PorthreeFAQ,
)

# Register your models here.

admin.site.register(UserDetails)
admin.site.register(PostTags)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Skill)
admin.site.register(Social)
admin.site.register(Hero)
admin.site.register(Theme)
admin.site.register(Project)
admin.site.register(ProjectTools)
admin.site.register(ProjectSkills)
admin.site.register(PorthreeAbout)
admin.site.register(PorthreeFAQ)
