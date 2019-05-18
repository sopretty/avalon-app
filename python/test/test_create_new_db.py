import rethinkdb
with rethinkdb.RethinkDB().connect() as conn:
    rethinkdb.RethinkDB().table("rules").delete().run(conn)

import sys
sys.exit(1)

r = rethinkdb.RethinkDB()
r.connect("localhost", 28015).repl()

r.table_create("rules").run()
r.table("rules").insert([
    {"nb_player": 5, "BLUE": 3, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 2, "quete_4": 3, "quete_5": 3},
    {"nb_player": 6, "BLUE": 4, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 4, "quete_4": 3, "quete_5": 4},
    {"nb_player": 7, "BLUE": 4, "RED": 3, "quete_1": 2, "quete_2": 3, "quete_3": 3, "quete_4": 4, "quete_5": 4},
    {"nb_player": 8, "BLUE": 5, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
    {"nb_player": 9, "BLUE": 6, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
    {"nb_player": 10, "BLUE": 6, "RED": 4, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5}
]).run()

cursor = r.table("rules").run()
for document in cursor:
    print(document['BLUE'])

cursor = r.table("rules").filter(r.row["quete_1"] == 2).run()
for document in cursor:
    print(document["quete_1"])

print r.table('rules').get('7644aaf2-9928-4231-aa68-4e65e31bf219').run()

# update all documents in the rules table:
print r.table("rules").update({"type": "fictional"}).run()





# https://www.rethinkdb.com/docs/guide/python/


# docker run -it -d -p 8080:8080 -p 28015:28015 -p 29015:29015 rethinkdb

# from /avalon-app/python :
# docker build -t avalon-app -f docker/Dockerfile .
# docker run -it avalon-app
