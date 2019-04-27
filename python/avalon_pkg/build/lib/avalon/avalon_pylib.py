# -*- coding: utf-8 -*-
# author: romain.121@hotmail.fr

"""This functions are used is the RESTful web service of Avalon"""

import os
from random import shuffle

from flask import Flask, jsonify, make_response, request, abort, send_file, Response
import rethinkdb

app = Flask(__name__)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/restart_bdd', methods=['POST'])
def restart_bdd():
    """This function deletes all tables in the post request and initializes them"""
    with rethinkdb.RethinkDB().connect() as conn:
        for key in request.json.values():
            if key in rethinkdb.RethinkDB().db('test').table_list().run(conn):
                rethinkdb.RethinkDB().table_drop(key).run(conn)
            
            if key == "rules":
                # initialize table rules
                rethinkdb.RethinkDB().table_create("rules").run(conn)
                rethinkdb.RethinkDB().table("rules").insert([
                    {"nb_player": 5, "BLUE": 3, "RED": 2, "q1": 2, "q2": 3, "q3": 2, "q4": 3, "q5": 3},
                    {"nb_player": 6, "BLUE": 4, "RED": 2, "q1": 2, "q2": 3, "q3": 4, "q4": 3, "q5": 4},
                    {"nb_player": 7, "BLUE": 4, "RED": 3, "q1": 2, "q2": 3, "q3": 3, "q4": 4, "q5": 4},
                    {"nb_player": 8, "BLUE": 5, "RED": 3, "q1": 3, "q2": 4, "q3": 4, "q4": 5, "q5": 5},
                    {"nb_player": 9, "BLUE": 6, "RED": 3, "q1": 3, "q2": 4, "q3": 4, "q4": 5, "q5": 5},
                    {"nb_player": 10, "BLUE": 6, "RED": 4, "q1": 3, "q2": 4, "q3": 4, "q4": 5, "q5": 5}]).run(conn)

            elif key == "games":
                # initialize table games
                rethinkdb.RethinkDB().table_create("games").run(conn)
                rethinkdb.RethinkDB().table("games").insert([
                    {'players': [{'name': 'Chacha', 'role': 'Oberon', 'color': 'RED'},
                                 {'name': 'Romain', 'role': 'Blue', 'color': 'BLUE'},
                                 {'name': 'Elsa', 'role': 'Mordred', 'color': 'RED'},
                                 {'name': 'Mathieu', 'role': 'Assassin', 'color': 'RED'},
                                 {'name': 'Flo', 'role': 'Merlin', 'color': 'BLUE'},
                                 {'name': 'Eglantine', 'role': 'Blue', 'color': 'BLUE'},
                                 {'name': 'Richard', 'role': 'Blue', 'color': 'BLUE'},
                                 {'name': 'Quentin', 'role': 'Blue', 'color': 'BLUE'}],
                     'rules': {"BLUE": 5, "RED": 3, "q1": 3, "q2": 4,
                               "q3": 4, "q4": 5, "q5": 5}}]).run(conn)
            else:
                # initialize table in post request
                rethinkdb.RethinkDB().table_create(key).run(conn)

    return jsonify({"request": "succeeded"})


@app.route('/view/<name>', methods=['GET'])
def view_(name):
    """This function gives a table depending on the name"""
    response = {name: []}
    with rethinkdb.RethinkDB().connect() as conn:
        cursor = rethinkdb.RethinkDB().table(name).run(conn)
        for document in cursor:
            response[name].append(document)

    return jsonify(response)


@app.route('/new_game', methods=['PUT'])
def new_game():
    """This functions inserts a new game in the database and returns the id created"""
    with rethinkdb.RethinkDB().connect() as conn:
        insert = rethinkdb.RethinkDB().table("games").insert([
                    {"players": [],
                     "rules": {}}]).run(conn)
    return jsonify({"id": insert["generated_keys"][0]})


#######################################################################################################################
#######################################################################################################################

def roles_and_players(dict_names_roles, max_red, max_blue):
    """Check the validity of proposed roles
    cases break rules : - 1. Morgan in the game but Perceval is not
                        - 2. Perceval in the game but Morgan is not
                        - 3. Unvalid role
                        - 4. Too many red in the game (or too many blue in the game, checked but impossible)"""

    if "Morgan" in dict_names_roles["roles"] and "Perceval" not in dict_names_roles["roles"]:
        print "ERROR !!! Morgan is in the game but Perceval is not"

    if "Perceval" in dict_names_roles["roles"] and "Morgan" not in dict_names_roles["roles"]:
        print "ERROR !!! Perceval is in the game but Morgan is not"

    nb_red, nb_blue = 1, 1
    list_roles = ["Merlin", "Assassin"]
    for role in dict_names_roles["roles"]:
        if role in ["Mordred", "Morgan", "Oberon"]:
            nb_red += 1
            list_roles.append(role)
        elif role == "Perceval":
            nb_blue += 1
            list_roles.append(role)
        else:
            print "ERROR !!! can't add this role: "+str(role)

    if nb_red <= max_red and nb_blue <= max_blue:
        list_roles.extend(["Red"]*(max_red-nb_red))
        list_roles.extend(["Blue"]*(max_blue-nb_blue))

    else:
        print "ERROR !!! Too many red or blue"

    shuffle(list_roles)

    list_players = []
    for ind, role in enumerate(list_roles):
        if role in ["Merlin", "Perceval", "Blue"]:
            list_players.append({"name": dict_names_roles["names"][ind], "color": "BLUE", "role": role})
        else:
            list_players.append({"name": dict_names_roles["names"][ind], "color": "RED", "role": role})

    return list_players


@app.route('/<ident>/add_roles', methods=['POST'])
def add_roles(ident):
    """This functions adds rules and roles to players randomly"""
    with rethinkdb.RethinkDB().connect() as conn:
        # add rules
        rules = list(rethinkdb.RethinkDB().table("rules").filter({"nb_player": len(request.json["names"])}).run(conn))[0]
        del rules["id"]
        del rules["nb_player"]
        rethinkdb.RethinkDB().table("games").get(ident).update({"rules": rules}).run(conn)

        # add players
        players = roles_and_players(request.json, rules["RED"], rules["BLUE"])
        rethinkdb.RethinkDB().table("games").get(ident).update({"players": players}).run(conn)

        # get response
        response = rethinkdb.RethinkDB().table("games").get(ident).run(conn)

    return jsonify({"players": response["players"]})


#######################################################################################################################
#######################################################################################################################

def create_mp3(list_roles):
    """Create mp3 file depending on roles in the game"""
    list_to_merge = ["init.mp3", "serv_mord.mp3"]
    if "Oberon" in list_roles:
        list_to_merge.append("oberon.mp3")
    list_to_merge.append("red_identi.mp3")

    if "Morgan" in list_roles and "Perceval" in list_roles:
        list_to_merge.append("add_per_mor.mp3")

    list_to_merge.append("serv_mord.mp3")
    if "Mordred" in list_roles:
        list_to_merge.append("mordred.mp3")
    list_to_merge.extend(["merlin_identi.mp3", "end.mp3"])

    str_command = "cat "
    for i in range(len(list_to_merge)):
        str_command += "data/"+list_to_merge[i]+" "
    str_command += " > data/roles.mp3"
    os.system(str_command)
    print "\n\n"
    mp3_file = open('./data/roles.mp3', 'rb')
    print mp3_file
    os.system("rm -f /data/roles.mp3")

    return mp3_file

@app.route("/<ident>/mp3_2")
def streamwav():
    def generate():
        with open("data/roles.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/mpeg") # mimetype="audio/x-mp3", mimetype="audio/mp3"

@app.route('/<ident>/mp3', methods=['POST'])
def post_mp3():
    mp3_file = create_mp3(request.json["roles"])
    print mp3_file
    # response = make_response(mp3_file)
    # response.headers.set('Content-Type', 'audio/mpeg')
    # response.headers.set('Content-Disposition', 'attachment', filename='%s.jpg' % pid)

    return send_file("./data/roles.mp3", attachment_filename='roles.mp3', mimetype='audio/mpeg')

