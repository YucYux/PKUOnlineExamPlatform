from django import forms


class TestCaseUploadForm(forms.Form):
    file = forms.FileField()