
user = {
    '_state': <django.db.models.base.ModelState object at 0x00000223B41E2E10>,
    'id': 1,
    'password': 'pbkdf2_sha256$600000$ZlEiOpjzVx22fKttldHCpF$TBnWKH3GSRk5JE+ciMfNCka2H3MUvpfwIIkzdAsXTeQ=',
    'last_login': datetime.datetime(2024, 3, 18, 7, 45, 8, 659896, tzinfo=datetime.timezone.utc),
    'is_superuser': True,
    'username': 'admin',
    'first_name': '',
    # 'middle_name': '',
    'last_name': '',
    # 'career': '',
    # 'bio': 'user intro paragraph',
    # 'location': 'user intro paragraph',
    # 'about': 'user about paragraph',
    'email': 'johnd@gmail.com',
    # 'resume': '/file',
    # 'Phone': '+4345  985 45 48 896',
    # 'primary_color': 'img',
    # 'secondary_color': 'img',
    # 'picture': 'img',
    'is_staff': True,
    'is_active': True,
    'date_joined': datetime.datetime(2023, 11, 30, 13, 43, 31, 111943, tzinfo=datetime.timezone.utc),
    }

post = {
    'id':"pk",
    'tags':"",
    'user':"",
    'title':"",
    'slug':"",
    'created_at':"",
    'updated_at':"",
    'post_image':"",
    'content':"",
    'publish':"Boolean",
    'shared':"",
}

project = {
    'id':"pk",
    'user':"",
    'title':"",
    'contributors':"",
    'slug':"",
    'created_at':"",
    'updated_at':"",
    'project_image':"",
    'demo':"video",
    'content':"",
    'publish':"Boolean",
}

tags = {
    'id':"pk",
    'user':"fk",
    'post':"fk",
    'project':"fk",
    'tag':"",
    'created_at':"",
    'updated_at':"",
    }

tools = {
    'id':"pk",
    'user':"fk",
    'project':"fk",
    'icon':"svg",
    'tool':"",
    'created_at':"",
    'updated_at':"",
    }

socials = {
    'id':"pk",
    'user':"fk",
    'created_at':"",
    'updated_at':"",
    'icon': "svg",
    'name':"",
    'url':"",
}

skill = {
    'id':"pk",
    'user':"fk",
    'created_at':"",
    'updated_at':"",
    'name':"",
    'detail':"",
}

education = {
    'id':"pk",
    'user':"fk",
    'created_at':"",
    'updated_at':"",
    'institute':"",
    'degree':"",
    'start_date':"",
    'end_date':"",
    'detail':"",
}

experience = {
    'id':"pk",
    'user':"fk",
    'created_at':"",
    'updated_at':"",
    'company':"",
    'position':"",
    'start_date':"",
    'end_date':"",
    'detail':"",
}

rating = {
    'id':"pk",
    'user':"fk",
    'project':"fk",
    'rate':"max=5",
    'complement':"",
    'created_at':"",
    'updated_at':"",
    }

comment = {
    'id':"pk",
    'user':"fk",
    'post':"fk",
    'comment':"",
    'created_at':"",
    'updated_at':"",
}

reply = {
    'id':"pk",
    'user':"fk",
    'post':"fk",
    'project':"fk",
    'comment':"fk",
    'reply':"",
    'created_at':"",
    'updated_at':"",
}

share = {
    'id':"pk",
    'user':"fk",
    'post':"fk",
    'project':"fk",
    'thought':"",
    'created_at':"",
    'updated_at':"",
}

like = {
    'id':"pk",
    'user':"fk",
    'post':"fk",
    'project':"fk",
    'comment':"fk",
    'reply':"fk",
    'share':"fk",
    'like':"",
    'created_at':"",
}
