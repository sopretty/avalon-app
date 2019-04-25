# -*- coding: utf-8 -*-
# authors : romain.121@hotmail.fr

"""This script allows you to use the web service used in Avalon's game"""

import argparse
import httplib
import json
import multiprocessing
import os

from tqdm import tqdm

#######################################################################################################################
#######################################################################################################################

class InternalServerError(Exception):

    """ Class InternalServerError.
    Class related to specific exception when Error 500 appears.
    """
    def __init__(self, msg):
        self.msg = msg
        Exception.__init__(self, msg)

class BadRequestError(Exception):

    """ Class BadRequestError.
    Class related to specific exception when Error 400 appears.
    """
    def __init__(self, msg):
        self.msg = msg
        Exception.__init__(self, msg)


def post_request(host, port, reference_method):
    """
    Post a JSON request to a webservice and get the response.
    Require to launch the webservice before executing this function.
    @params :  - host : host of the computer (ex : ('127.0.0.1') or 'localhost')
               - port : port of the computer (ex : 8080)
               - reference_method : name of the reference method called in the webservice
               - dict_params: dictionnary to post to the webservice.
    @return : response data
    """
    headers = {'Content-type':'application/json', 'Accept': '*/*'}
    conn = httplib.HTTPConnection(host, port)
    conn.request('POST', '/' + reference_method,"lala", headers)
    response = conn.getresponse()

    if response.status == 200:
        data = response.read()
        conn.close()
        return json.loads(data)

    elif response.status == 400:
        error_message = str(response.read())
        conn.close()
        print "ERROR MSG : \n" + error_message + "\n"
        raise BadRequestError("Error 400 !! " + response.reason)

    elif response.status == 500:
        error_message = str(response.read())
        conn.close()
        print "ERROR MSG : \n" + error_message + "\n"
        raise InternalServerError("Error 500 !! " + response.reason)

    print "STATUS : ", response.status
    print "REASON : ", response.reason
    conn.close()
    return None

def para_flask(traj):

    try:
        response = post_request(host=HOST, port=PORT, reference_method=REFERENCE_METHOD)
        if response is not None:
            with open('test_out', 'wb') as file_output:
                json.dump(response, file_output)
    except InternalServerError:
        msg = traj + " : !!! Erreur 500 \n"
    except BadRequestError:
        msg = traj + " : !!! Erreur 400 \n"

if __name__ == '__main__':

    # read positional and optional arguments
    PARSER = argparse.ArgumentParser()
    # PARSER.add_argument("raw_trips_path", type=str, help="path of the folder that contains raw data trips")
    # PARSER.add_argument("preprocess_trips_path", type=str, help="path of the folder that contains preprocess data")

    PARSER.add_argument("-ho", "--host", type=str, help="host for the webservice (default 'localhost')")
    PARSER.add_argument("-p", "--port", type=str, help="port for the webservice (default '8080')")
    PARSER.add_argument("-m", "--reference_method", type=str, help="reference method for the webservice (default 'new_game')")
    # PARSER.add_argument("-ncpus", "--number_ncpus", type=int, help="number of ncpus (default 'max ncpus')")

    ARGS = PARSER.parse_args()

    HOST = 'localhost'
    if ARGS.host is not None:
        HOST = ARGS.host

    PORT = '8080'
    if ARGS.port is not None:
        PORT = ARGS.port

    REFERENCE_METHOD = 'names_to_players'
    if ARGS.reference_method is not None:
        REFERENCE_METHOD = ARGS.reference_method


    para_flask("lala")



