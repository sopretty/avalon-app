# -*- coding: utf-8 -*-
# author: romain.121@hotmail.fr

"""This script is the RESTful web service used in Avalon"""

import pandas as pd
from flask import Flask, jsonify, make_response, request, abort

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
    AvalonGame['nb_player'] = request.json['title']
    rules_data = pd.read_csv('./data/rules.csv')
    print rules_data
         # request.json
    return jsonify(AvalonGame), 201

# GET game
@app.route('/game', methods=['GET'])
def get_game():
    return jsonify({'game': AvalonGame})

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
    app.run(debug=True)


# curl -H "Content-Type: application/json" -X PUT -d '{"title":"Read a book"}' http://localhost:5000/game
# curl -i http://localhost:5000/game/names/Mathieuu
