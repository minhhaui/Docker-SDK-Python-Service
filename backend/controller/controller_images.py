from model import images
from model.connect_db import DatabaseDriver
from model.images import Images
import json
from flask import request
from dockers.service import DockerService


# ============ get size of Image from docker
def get_size():
    list_image_name = Images.get_image_name()
    for i in list_image_name:

        size_docker = DockerService.check_size_image(i['image_name'])
        result = Images.insert_size(size_docker)
    
     return json.dumps({'result': True}) if result else json.dumps({'result': False})

# ===================show all information of images
def show_all_images(request):
    result = Images.get_all_images()
    return json.dumps(result)

# ============== show one information of iamges
def get_image(request):
    params = request.get_json()
    image_id = params['image_id']
    result = Images.get_image(image_id)
    return json.dumps(result)

# =========== create image ===========
def create_image(request):
    params = request.get_json()
    image_name = params['image_name']
    igroup = params['igroup']

    if image_name == '':
        return json.dumps({'result': False, 'mess':"Dien image_name"})
    else:
        result = Images.get_information_image(image_name)
        #return json.dumps({'result':result})
        if len(result) == 0:
            result_pull = DockerService.pull_image(image_name)
            if result_pull :
                Images.create_image(image_name, igroup)
                return json.dumps({'result': True})
            else:
                return json.dumps({'result': False, 'mess': 'khong ton tai image'})

        else:
            return json.dumps({'result': False, 'mess': 'Da ton tai'})


# ================== delete images =============
def delete_image(request):
    params = request.get_json()
    image_id = params['image_id']
    result = Images.delete_image(image_id)
    return json.dumps({'result': True}) if result else json.dumps({'result': False})

# ======== edit images===========
def edit_image(request):
    params = request.get_json()
    image_id = params['image_id']
    image_name= params['image_name']
    igroup = params['igroup']
    result = Images.edit_image(image_id, image_name, igroup)
    return json.dumps({'result': True}) if result else json.dumps({'result': False})

