# -*- coding: utf-8 -*-
# author: romain.121@hotmail.fr

"""This script is the web service used in Avalon"""

import sys
import multiprocessing

import pickle
import pandas as pd
from flask import Flask, request, jsonify

import avalon_pylib
from avalon_pylib import check_roles, Player, GameAvalon


#######################################################################################################################
#######################################################################################################################


class HTTPError(Exception):
    """Class HTTPError"""

    status_code = 500

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """Function to return the output into a dictionary"""
        dic = dict(self.payload or ())
        dic['message'] = self.message
        dic['status_code'] = self.status_code
        return dic


class AvalonWebService(object):

    def __print_game(self):

        game = pickle.load(open('./current_game/game.pkl', 'rb'))
        game.__strGame__()

        return jsonify({"lala": "lolo"})

    def __new_game(self):

        game = GameAvalon()
        pickle.dump(game, open('./current_game/game.pkl', 'wb'), -1)

        return jsonify({"lala": "lolo"})

    def __add_nb_player(self):

        game = pickle.load(open('./current_game/game.pkl', 'rb'))
        game.add_nb_player(6)
        pickle.dump(game, open('./current_game/game.pkl', 'wb'), -1)

        return jsonify({"lala": "lolo"})

    def __add_names_to_players(self):

        game = pickle.load(open('./current_game/game.pkl', 'rb'))
        game.add_names_to_player(["Chacha", "Romain", "Elsa", "Mathieu", "Flo", "Eglantine"])
        pickle.dump(game, open('./current_game/game.pkl', 'wb'), -1)

        return jsonify({"lala": "lolo"})

    def __add_roles_to_players(self):
        """Exposed method add_names_to_player"""

        # try:
        #     result_json = request.json
        # except:
        #     raise HTTPError('The request must be a JSON request', 400)

        game = pickle.load(open('./current_game/game.pkl', 'rb'))
        game.add_roles_to_player({"Mordred": True})
        pickle.dump(game, open('./current_game/game.pkl', 'wb'), -1)

        return jsonify({"lala": "lolo"})


    def Run(self, host, port, processes, debug=False):
        """!@brief Informations exposed methods """

        app = Flask('Webservice')

        @app.route('/print_game', methods=['POST'])
        def print_game():
            return self.__print_game()

        @app.route('/new_game', methods=['POST'])
        def new_game():
            return self.__new_game()

        @app.route('/add_nb_player', methods=['POST'])
        def add_nb_player():
            return self.__add_nb_player()

        @app.route('/names_to_players', methods=['POST'])
        def names_to_players():
            return self.__add_names_to_players()

        @app.route('/roles_to_players', methods=['POST'])
        def roles_to_players():
            return self.__add_roles_to_players()

        @app.errorhandler(HTTPError)
        def handle_invalid_usage(error):
            """Function used if the handle is invalid"""
            response = jsonify(error.to_dict())
            response.status_code = error.status_code
            return response

        app.run(host=host, port=port, processes=processes, threaded=False, debug=debug)



#######################################################################################################################
#######################################################################################################################

if __name__ == '__main__':

    # Get Host
    try:
        HOST = sys.argv[1]
    except IndexError:
        HOST = '127.0.0.1'

    # Get Port
    try:
        PORT = int(sys.argv[2])
    except IndexError:
        PORT = 8080

    # Get number of thread
    try:
        PROCESSES = int(sys.argv[3])
    except IndexError:
        PROCESSES = multiprocessing.cpu_count()

    # Get Debug parameter
    try:
        DEBUG = int(sys.argv[4])
    except IndexError:
        DEBUG = 0

    WS = AvalonWebService()
    WS.Run(HOST, PORT, PROCESSES, DEBUG)
