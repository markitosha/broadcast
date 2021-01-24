from django.db import models
from django.contrib.auth.models import AbstractUser

from phonenumber_field.modelfields import PhoneNumberField


# class TimeZone(models.IntegerChoices):
#     FIRST = 1
#     SECOND = 2


class User(AbstractUser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.set_password('password')

    phone = PhoneNumberField(
        verbose_name='phone', unique=True,
        error_messages={'unique': "Пользователь с таким номером телефона уже существует."},
    )
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'city', 'partner']

    first_name = models.CharField('first name', max_length=150)
    last_name = models.CharField('last name', max_length=150)
    middle_name = models.CharField('middle name', max_length=150, blank=True)
    email = models.EmailField('email address')
    city = models.CharField('city', max_length=255)
    partner = models.CharField('partner', max_length=255)

    # time_zone = models.CharField(choices=TimeZone.choices, default=TimeZone.FIRST)

    username = models.CharField('username', max_length=255, null=True, blank=True, default=None)

    def __str__(self):
        return self.phone.as_e164
