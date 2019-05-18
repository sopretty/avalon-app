# -*- coding: utf-8 -*-
# author: romain.121@hotmail.fr

"""This script is the RESTful web service used in Avalon"""

import os
import pandas as pd
from flask import Flask, jsonify, make_response, request, abort, send_file, Response

import avalon_pylib


app = Flask(__name__)

# AvalonGame = {'id': 1,
#               'nb_player': 8,
#               'players': [{'name': 'Chacha', 'role': 'Oberon', 'color': 'RED'},
#                           {'name': 'Romain', 'role': 'Blue', 'color': 'BLUE'},
#                           {'name': 'Elsa', 'role': 'Mordred', 'color': 'RED'},
#                           {'name': 'Mathieu', 'role': 'Assassin', 'color': 'RED'},
#                           {'name': 'Flo', 'role': 'Merlin', 'color': 'BLUE'},
#                           {'name': 'Eglantine', 'role': 'Blue', 'color': 'BLUE'},
#                           {'name': 'Richard', 'role': 'Blue', 'color': 'BLUE'},
#                           {'name': 'Quentin', 'role': 'Blue', 'color': 'BLUE'}],
#               'rules': {"nb_player": 8, "BLUE": 5, "RED": 3, "quete_1": 3,
#                         "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5}}

AvalonGame = {'init': False,
              'nb_player': 0,
              'players': [],
              'rules': {}}


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


# PUT game
@app.route('/game', methods=['PUT'])
def add_nb_player():
    AvalonGame["init"] = True
    AvalonGame["nb_player"] = request.json["nb_player"]
    AvalonGame["players"] = request.json["names"]


    rules_data = pd.read_csv('./data/rules.csv')
    print rules_data
         # request.json
    return jsonify(AvalonGame), 201

# GET game
@app.route('/game', methods=['GET'])
def get_game():
    return jsonify({'game': AvalonGame})


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


####################################################        mp3
####################################################
@app.route("/mp3")
def streamwav():
    def generate():
        with open("data/roles.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/mpeg") # mimetype="audio/x-mp3", mimetype="audio/mp3"

@app.route('/game/mp3', methods=['POST'])
def post_mp3():
    mp3_file = create_mp3(request.json["roles"])
    print mp3_file
    # response = make_response(mp3_file)
    # print "lala"
    # response.headers.set('Content-Type', 'audio/mpeg')
    # response.headers.set('Content-Disposition', 'attachment', filename='%s.jpg' % pid)

    return send_file("./data/roles.mp3", attachment_filename='roles.mp3', mimetype='audio/mpeg')
####################################################
####################################################


# GET rules
@app.route('/game/rules', methods=['GET'])
def get_rules():
    return jsonify({'rules': AvalonGame['rules']})

# GET nb_player
@app.route('/game/nb_player', methods=['GET'])
def get_nb_player():
    return jsonify({'nb_player': AvalonGame['nb_player']})

# GET names
@app.route('/game/names', methods=['GET'])
def get_names():
    list_names = [player['name'] for player in AvalonGame['players']]
    return jsonify({'names': list_names})

# GET roles
@app.route('/game/roles', methods=['GET'])
def get_roles():
    list_roles = [player['role'] for player in AvalonGame['players']]
    return jsonify({'roles': list_roles})

@app.route('/game/roles/<name>', methods=['GET'])
def get_roles_name(name):
    role = [player['role'] for player in AvalonGame['players'] if player['name'] == name]
    if not role:
        abort(404)
    return jsonify({'role': role[0]})

# GET colors
@app.route('/game/colors', methods=['GET'])
def get_colors():
    list_colors = [player['color'] for player in AvalonGame['players']]
    return jsonify({'colors': list_colors})

@app.route('/game/colors/<name>', methods=['GET'])
def get_roles_color(name):
    color = [player['color'] for player in AvalonGame['players'] if player['name'] == name]
    if not color:
        abort(404)
    return jsonify({'color': color[0]})




# @app.route('/games/')

# @app.route('/todo/api/v1.0/tasks', methods=['POST'])
# def create_task():
#     if not request.json or not 'title' in request.json:
#         abort(400)
#     task = {
#         'id': tasks[-1]['id'] + 1,
#         'title': request.json['title'],
#         'description': request.json.get('description', ""),
#         'done': False
#     }
#     tasks.append(task)
#     return jsonify({'task': task}), 201

if __name__ == '__main__':


    RULES = [{"nb_player": 5, "BLUE": 3, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 2, "quete_4": 3, "quete_5": 3},
             {"nb_player": 6, "BLUE": 4, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 4, "quete_4": 3, "quete_5": 4},
             {"nb_player": 7, "BLUE": 4, "RED": 3, "quete_1": 2, "quete_2": 3, "quete_3": 3, "quete_4": 4, "quete_5": 4},
             {"nb_player": 8, "BLUE": 5, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
             {"nb_player": 9, "BLUE": 6, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
             {"nb_player": 10, "BLUE": 6, "RED": 4, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5}]

    app.run(debug=True)

# curl -H "Content-Type: application/json" -X PUT -d '{"id": 1, "nb_player": 8, "players": [{'name': 'Chacha', 'role': 'Oberon', 'color': 'RED'}, {'name': 'Romain', 'role': 'Blue', 'color': 'BLUE'}, {'name': 'Elsa', 'role': 'Mordred', 'color': 'RED'}, {'name': 'Mathieu', 'role': 'Assassin', 'color': 'RED'}, {'name': 'Flo', 'role': 'Merlin', 'color': 'BLUE'}, {'name': 'Eglantine', 'role': 'Blue', 'color': 'BLUE'}, {'name': 'Richard', 'role': 'Blue', 'color': 'BLUE'}, {'name': 'Quentin', 'role': 'Blue', 'color': 'BLUE'}], "rules": {"nb_player": 8, "BLUE": 5, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5}}' http://localhost:5000/game
# curl -i http://localhost:5000/game/names/Mathieuu
