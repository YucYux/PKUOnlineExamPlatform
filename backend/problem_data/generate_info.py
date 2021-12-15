import os
import re
import hashlib
import zipfile
import json


class ZipError(Exception):
    def __init__(self, msg, err=None):
        self.err = err
        self.msg = msg
        super().__init__(err, msg)


def natural_sort_key(s, _nsre=re.compile(r"(\d+)")):
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split(_nsre, s)]


def filter_name_list(name_list, dir=""):
    ret = []
    prefix = 1
    while True:
        in_name = f"{prefix}.in"
        out_name = f"{prefix}.out"
        if f"{dir}{in_name}" in name_list and f"{dir}{out_name}" in name_list:
            ret.append(in_name)
            ret.append(out_name)
            prefix += 1
            continue
        else:
            return sorted(ret, key=natural_sort_key)


for path, file_dirs, _ in os.walk('./'):
    for dir in file_dirs:
        path = os.path.join(path, dir)
        try:
            zip_path = os.path.join(path, "test_case.zip")
            zip_file = zipfile.ZipFile(zip_path, "r")
        except zipfile.BadZipFile:
            raise ZipError("Bad zip file")
        name_list = zip_file.namelist()
        test_case_list = filter_name_list(name_list)
        if not test_case_list:
            raise ZipError("Empty file")

        size_cache = {}
        md5_cache = {}

        for item in test_case_list:
            with open(os.path.join(path, item), "wb") as f:
                content = zip_file.read(f"{item}").replace(b"\r\n", b"\n")
                size_cache[item] = len(content)
                if item.endswith(".out"):
                    md5_cache[item] = hashlib.md5(content.rstrip()).hexdigest()
                f.write(content)
        test_case_info = {"test_cases": {}}

        info = []

        test_case_list = zip(*[test_case_list[i::2] for i in range(2)])
        for index, item in enumerate(test_case_list):
            data = {"stripped_output_md5": md5_cache[item[1]],
                    "input_size": size_cache[item[0]],
                    "output_size": size_cache[item[1]],
                    "input_name": item[0],
                    "output_name": item[1]}
            info.append(data)
            test_case_info["test_cases"][str(index + 1)] = data

        with open(os.path.join(dir, "info"), "w", encoding="utf-8") as f:
            f.write(json.dumps(test_case_info, indent=4))

        for item in os.listdir(dir):
            os.chmod(os.path.join(dir, item), 0o640)

        os.remove(zip_path)