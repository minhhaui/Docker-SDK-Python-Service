import docker
client = docker.from_env()
class DockerService:
   
    @staticmethod
    def pull(image_name):
        """pull image"""
        return client.images.pull('{}:latest'.format(image_name))
    @staticmethod
    def pull_image(image_name):
        try:
            """pull image by name and check image """
            images = client.images.list()
            list_images_name = []
            for image in images:
                list_images_name.append(image.tags)
            if '{}:latest'.format(image_name) in list_images_name:
                return True
            else:
                pull_image = DockerService.pull(image_name)
                name = pull_image.tags
                if '{}:latest'.format(image_name) == name[0]:
                    return True
                else:
                    return False
        except:
            return False

    @staticmethod
    def start_container(image_name, cpu, memory, port, password):
        try:
            env = ['VNC_PASSWORD = {}'.format(password)]
            ports = {'5900/tcp': port}
            print('before running contaner')
            run_container = client.containers.run('{}:latest'.format(image_name), cpu_count = int(cpu), mem_limit = memory, environment = env, ports = ports, detach = True)
            print('running contaner')
            if run_container.status == 'created':
                return True

            else:
                return False
        except Exception as e:
            print(e)
            return False



    @staticmethod
    def check_size_image(image_name):
        """return size image"""
        img = DockerService.pull(image_name)

        id_image = img.short_id.split(':')[1]

        temp = client.images.get(id_image)

        results = temp.attrs["Size"]

        return round(results/(1024*1024*1024), 3)

    @staticmethod
    def container_docker_id(image_name, cpu, memory, port, password):
        try:
            env = ['PASSWORD = {}'.format(password)]
            ports = {'5900/tcp': port}
            run_container = client.containers.run('{}:latest'.format(image_name), cpu_count = cpu, mem_limit = memory, environment = env, ports = ports, detach = True)
            results = run_container.short_id
        except Exception as e:
            print(e)
            return False
        return results


    @staticmethod
    def delete_container(container_docker_id):
        """delete container by container docker id"""
        obj_container = client.containers.get(container_docker_id)
        obj_container.stop()
        obj_container.reload()
        if obj_container.status == 'exited':
            return True
        else:
            return False

    @staticmethod
    def update_container(container_docker_id, image_name, cpu, memory, port, password):

        if DockerService.delete_container(container_docker_id):
            check = DockerService.start_container(image_name, cpu, memory, port, password)
            if check:
                return True
            else:
                return False
        else:
            return False
