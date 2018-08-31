from model.connect_db import DatabaseDriver


class Images:

    @staticmethod
    # get  information image_name
    def get_image_name(image_id):
        query = 'select * from images where image_id = ?'
        args = [image_id]
        result = DatabaseDriver().query_db(query, args, one=True)
        return result

    @staticmethod
    # get image_name
    def get_image_name():


        driver = DatabaseDriver()
        query = """select image_name from images"""

        result = driver.query_db(query)
        #print(result)

        return result

    @staticmethod
    # get all information image
    def get_all_images():
        query = 'select * from images'
        result = DatabaseDriver().query_db(query)
        return result


    @staticmethod
    # get one information image
    def get_image(image_id):

        try:
            query = """select * from images where image_id = ?"""
            args = [image_id]
            result = DatabaseDriver().query_db(query, args, one=True)
        except Exception as e:
            print(e)
            return False
        return result

    @staticmethod
    # get one information image id
    def get_image_id(image_name):

        try:
            query = """select image_id from images where image_name = ?"""
            args = [image_name]
            result = DatabaseDriver().query_db(query, args, one=True)
        except Exception as e:
            print(e)
            return False
        return result





    @staticmethod
    # create image
    def create_image(name, group):
        try:
            driver = DatabaseDriver()
            args = [name, group]
            new_id = driver.exec_command("""insert into images(image_name, igroup) values (?, ?)""", args)
            return new_id
        except Exception as e:
            print(e)
            
            return False

    @staticmethod
    # get size image
    def insert_size(image_name):

        try:
            driver = DatabaseDriver()
            args = [image_name]
            new_id = driver.exec_command("""insert into images(isize) values (?)""", args)
            return new_id
        except Exception as e:
            print(e)

            return False

    @staticmethod
    # edit image
    def edit_image(image_id, image_name, igroup):

        try:
            driver = DatabaseDriver()
            args = [ image_name, igroup, image_id]
            driver.exec_command('update images set image_name = ?,  igroup = ? where image_id = ?', args)
        except Exception as e:
            print(e)
            return False
        return True


    @staticmethod
    # delete image
    def delete_image(image_id):


        try:
            driver = DatabaseDriver()
            args = [image_id]
            driver.exec_command("""delete from images where image_id = ?""", args)
        except Exception as e:
            print(e)
            return False
        return True

    @staticmethod
    # === get image
    def get_information_image(image_name):

        driver = DatabaseDriver()
        args = [image_name]
        result = driver.query_db(""" select * from images where image_name= ? """, args)
        print("get_information_image {}".format(result))
        return  result

