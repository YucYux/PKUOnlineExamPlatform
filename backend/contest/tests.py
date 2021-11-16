from django.test import TestCase

import copy
from datetime import datetime, timedelta

from django.utils import timezone
from django.urls import reverse
from utils.api_test import APITestCase
from .models import ContestAnnouncement, ContestRuleType, Contest
from django.http.request import HttpRequest

DEFAULT_CONTEST_DATA = {"title": "test title", "description": "test description",
                        "start_time": timezone.localtime(timezone.now()),
                        "end_time": timezone.localtime(timezone.now()) + timedelta(days=1),
                        "rule_type": ContestRuleType.ACM,
                        "password": "123",
                        "allowed_ip_ranges": [],
                        "visible": True, "real_time_rank": True}
DEFAULT_CONTEST_DATA2 = {"title": "test title", "description": "test description",
                        "start_time": timezone.localtime(timezone.now()),
                        "end_time": timezone.localtime(timezone.now()) + timedelta(days=1),
                        "rule_type": ContestRuleType.OI,
                        "password": "12353",
                        "allowed_ip_ranges": [],
                        "visible": True, "real_time_rank": True}


class MyUser(APITestCase):
    def setUp(self):
        user1=self.create_user(username='我是你爹',password="woshinidie")
        user2=self.create_user(username='我是你妈',password="woshinima")
        self.contest = Contest.objects.create(created_by=user1, **DEFAULT_CONTEST_DATA)
        self.contest = Contest.objects.create(created_by=user2, **DEFAULT_CONTEST_DATA2)
        self.url = reverse('contest_api')
        print(self.url)


    def test_get_contest_list2(self):
        print('now test contest list2')
        url = reverse("contest_list_api")
        #url = 'contest/contests'
        request_dir = {'rule_type':ContestRuleType.OI}
        response = self.client.get(url + "?rule_type=OI")
        print(response.data["data"]["results"])
        self.assertSuccess(response)
        self.assertEqual(len(response.data["data"]["results"]), 2)


    def test_get_contest_list(self):
        print('now test contest list')
        url = reverse("contest_list_api")
        #url = 'contest/contests'
        response = self.client.get(url + "?limit=10")
        print(response.data["data"]["results"])
        self.assertSuccess(response)
        self.assertEqual(len(response.data["data"]["results"]), 2)


