from flask import Flask, render_template, request
from controller import users_controller
from controller import controller_images
from controller import  containers_controller
import json
from dockers.service import  DockerService

app = Flask(__name__)
app.config.from_pyfile('./config.cfg')


# ================ home ======================
@app.route('/', methods=["GET", "POST"])
def show():
    return render_template('index.html')

# =========== logout ===========
@app.route('/logout', methods=["GET", "POST"])
def logout():
    return json.dumps({'result': True})

# ========== login =============================
@app.route('/login', methods=["GET", "POST"])
def login():
    result = users_controller.do_login(request)
    return result


# ========================= User Controller ==================================
# ------------------------- create user --------------------------------------
@app.route('/users/create', methods=["GET", "POST"])
def create_user():
    return users_controller.create_user(request)


# --------------------------------show all information user---------------------
@app.route('/users', methods=["GET", "POST"])
def show_all_info_user():
    return users_controller.show_all_info_user(request)


# ------------------------- detail user --------------------------------------

@app.route('/users/info', methods=["GET", "POST"])
def get_user():
    return users_controller.get_user(request)


@app.route('/users/delete', methods=["GET", "POST"])
def delete_user():
    return users_controller.delete_user(request)


@app.route('/users/update', methods=["GET", "POST"])
def edit_user():
    return users_controller.edit_user(request)


# =============================================== Image controller ==============
@app.route('/images', methods=["GET", "POST"])
def show_all_images():

    return controller_images.show_all_images(request)



# ========== edit images -------
@app.route('/images/update', methods=["GET", "POST"])
def edit_image():
    return controller_images.edit_image(request)

# ======== get information one image =============
@app.route('/images/info', methods=["GET", "POST"])
def get_image():
    return controller_images.get_image(request)

# ==== create image
@app.route('/images/create', methods=["GET", "POST"])
def create_image():
    return controller_images.create_image(request)

# ==== delete image
@app.route('/images/delete', methods=["GET", "POST"])
def delete_image():
    return controller_images.delete_image(request)




# ============== Container ===========

# ---------------- show all -----------
@app.route('/containers', methods=["GET", "POST"])
def show_all_container():
    return containers_controller.show_all_container(request)

# ---------- show one ----------

@app.route('/containers/info', methods=["GET", "POST"])
def show_container():
    return containers_controller.show_container_detail(request)

# ----- delete ----------
@app.route('/containers/delete', methods=["GET", "POST"])
def delete_container():
    return containers_controller.delete_container(request)

# ------- edit -----------
@app.route('/containers/update', methods=["GET", "POST"])
def edit_container():
    return containers_controller.update_container(request)

# ----------- create --------
@app.route('/containers/create', methods=["GET", "POST"])
def create_container():
    return containers_controller.create_container(request)
