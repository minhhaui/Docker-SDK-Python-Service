from model.connect_db import DatabaseDriver


class Users:
    @staticmethod
    def confirm_account(mail, user_password):
        try:
            query = """select * from users
                        where mail = ? and user_password = ?"""
            args = [mail, user_password]
            result = DatabaseDriver().query_db(query, args, one=True)
        except Exception as e:
            print(e)
            return False
        return result

    @staticmethod
    def get_users():
        try:
            result = DatabaseDriver().query_db("""select * from users""")
        except Exception as e:
            print(e)
            return False
        return result

    @staticmethod
    def find_mail(mail):
        try:
            query = """select mail from users where mail = ?"""
            args = [mail]
            result = DatabaseDriver().query_db(query, args, one=True)
            if result is not None:
                return True
        except Exception as e:
            return False
        return False

    @staticmethod
    def get_user(user_id):
        try:
            query = """select * from users where user_id = ?"""
            args = [user_id]
            result = DatabaseDriver().query_db(query, args, one=True)
        except Exception as e:
            print(e)
            return False
        return result

    @staticmethod
    def create_user(mail, user_password, name, position):
        try:
            driver = DatabaseDriver()
            args = [mail, user_password, name, position]
            new_id = driver.exec_command("""insert into users(mail, user_password, user_name, position)
                                            values (?, ?, ?, ?)""", args)
            return new_id
        except Exception as e:
            print(e)
            return False

    @staticmethod
    def edit_user(user_id, mail, password, name, position):
        try:
            driver = DatabaseDriver()
            args = [ mail, password, name, position, user_id]
            driver.exec_command("""update users set 
                                    mail=?, 
                                    user_password=?, 
                                    user_name=?,
                                    position = ?
                                    where user_id=?""", args)
        except Exception as e:
            print(e)
            return False
        return True

    @staticmethod
    def del_user(user_id):
        try:
            driver = DatabaseDriver()
            args = [user_id]
            driver.exec_command("""delete from users where user_id=?""", args)
        except Exception as e:
            print(e)
            return False
        return True
