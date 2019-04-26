# -*- coding: utf-8 -*-
# author: romain.121@hotmail.fr

"""This script is the RESTful web service used in Avalon"""

from flask import Flask

import avalon
from avalon.avalon_pylib import app


if __name__ == '__main__':

    # Start the RESTful web service used in Avalon
    app.run(debug=True)

    # abf518fd-6d2e-4330-838f-5f290f744e5f
    # {"nb_player": 8, "names": ["Chacha", "Romain", "Elsa", "Mathieu", "Flo", "Eglantine", "Richard", "Quentin"], "roles": ["Oberon", "Mordred"]}

    # {"table1": "rules", "table2": "games"}
