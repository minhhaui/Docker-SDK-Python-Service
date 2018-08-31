from model.users import Users
import json


# ========================= User Controller ==================================
# ------------------------- create user --------------------------------------
def do_login(request):
    params = request.get_json()
    mail = params['mail']
    password = params['user_password']
    user = Users.confirm_account(mail, password)
    return json.dumps({'result': user is not None, 'user': user})


def create_user(request):
    params = request.get_json()
    name = params['user_name']
    mail = params['mail']
    password = params['user_password']
    position = params['position']

    if (name is not None) and (mail is not None):
        get_mail_ = Users.find_mail(mail)
        if get_mail_ is None:
            return json.dumps({'result': False, 'mess': 'mail is exited'})
        else:
            if Users.create_user(password, name, mail, position):
                return json.dumps({'result': True})
            else:
                return json.dumps({'result': False, 'mess': 'can not create user'})
    return json.dumps({'result': False, 'mess': 'Write Information'})


# --------------------------------show all information user---------------------
def show_all_info_user(request):
    result = Users.get_users()
    return json.dumps(result)


# ------------------------- detail user --------------------------------------
def get_user(request):
    params = request.get_json()
    user_id = params['user_id']
    result = Users.get_user(user_id)
    return json.dumps(result)


# ---------------------------------------------delete------------------------
def delete_user(request):
    params = request.get_json()
    user_id = params['user_id']
    result = Users.del_user(user_id)
    return json.dumps({'result': True}) if result else json.dumps({'result': False})


# ------------------------edit -----------------------------------------------
def edit_user(request):
    params = request.get_json()
    user_id = params['user_id']
    password = params['user_password']
    name = params['user_name']
    mail = params['mail']
    position = params['position']
    result = Users.edit_user(user_id, mail, password, name, position)
    return json.dumps({'result': True}) if result else json.dumps({'result': False})