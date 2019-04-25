import rethinkdb as r

rdb = r.RethinkDB()

print rdb.connect( "localhost", 28015).repl()
# print rdb.db("test").table_create("rules").run()
# rdb.table("rules").insert([
#     {"nb_player": 5, "BLUE": 3, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 2, "quete_4": 3, "quete_5": 3},
#     {"nb_player": 6, "BLUE": 4, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 4, "quete_4": 3, "quete_5": 4},
#     {"nb_player": 7, "BLUE": 4, "RED": 3, "quete_1": 2, "quete_2": 3, "quete_3": 3, "quete_4": 4, "quete_5": 4},
#     {"nb_player": 8, "BLUE": 5, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
#     {"nb_player": 9, "BLUE": 6, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
#     {"nb_player": 10, "BLUE": 6, "RED": 4, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5}
# ]).run()

cursor = rdb.table("rules").run()
for document in cursor:
    print(document['BLUE'])

# https://www.rethinkdb.com/docs/guide/python/