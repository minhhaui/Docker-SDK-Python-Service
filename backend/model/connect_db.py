import sqlite3
from flask import g

DATABASE = './database/DbSmartOffice.db'


class DatabaseDriver:
    class __DatabaseDriver:
        def __init__(self):
            self.db = self.get_db()

        def get_db(self):
            db = getattr(g, '_database', None)
            if db is None:
                db = g._database = sqlite3.connect(DATABASE, check_same_thread=False)
                db.row_factory = dict_factory
            return db

        def query_db(self, query, args=(), one=False):
            cur = self.db.execute(query, args)
            rv = cur.fetchall()
            cur.close()
            return (rv[0] if rv else None) if one else rv

        def exec_command(self, query, args=()):
            cur = self.db.execute(query, args)
            lastrowid = cur.lastrowid
            self.db.commit()
            cur.close()
            return lastrowid
    instance = None

    def __init__(self):
        if not DatabaseDriver.instance:
            DatabaseDriver.instance = DatabaseDriver.__DatabaseDriver()

    def __getattr__(self, name):
        return getattr(self.instance, name)


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
