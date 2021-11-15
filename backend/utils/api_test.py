from django.urls import reverse
from django.test.testcases import TestCase
from rest_framework.test import APIClient

from account.models import AdminType, User


class APITestCase(TestCase):
    client_class = APIClient

    def create_user(self, username, password, admin_type=AdminType.STUDENT, login=True):
        user = User.objects.create(username=username, admin_type=admin_type)
        user.set_password(password)
        user.save()
        if login:
            self.client.login(username=username, password=password)
        return user

    def create_teacher(self, username="admin", password="admin", login=True):
        return self.create_user(username=username, password=password, admin_type=AdminType.TEACHER,
                                login=login)

    def create_assist(self, username="root", password="root", login=True):
        return self.create_user(username=username, password=password, admin_type=AdminType.TEACHING_ASSISTANT, login=login)

    def reverse(self, url_name, *args, **kwargs):
        return reverse(url_name, *args, **kwargs)

    def assertSuccess(self, response):
        if not response.data["error"] is None:
            raise AssertionError("response with errors, response: " + str(response.data))

    def assertFailed(self, response, msg=None):
        self.assertTrue(response.data["error"] is not None)
        if msg:
            self.assertEqual(response.data["data"], msg)