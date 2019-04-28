***********************************
*** Pour lancer l'app et la bdd ***

1. Importer l'image docker de la bdd: docker pull rethinkdb
2. Construire l'image docker de l'app: docker build -t avalon-pkg .
3. Lancer les containers: docker-compose up

---> http://localhost/

****************************
*** Exemples de requêtes ***

1. Initialiser la bdd (2 tables: "rules" et "games"):
POST: http://localhost/restart_bdd
Body: {"bdd1": "rules", "bdd2": "games"}

---> {"request": "succeeded"}


2. Visualiser une bdd (2 tables: "rules" et "games"):
GET: http://localhost/view/rules
GET: http://localhost/view/games

---> Affichage de la bdd


3. Démarrer une nouvelle partie:
PUT: http://localhost/new_game

---> {"id": "1b8ad78c-da1d-41c1-8552-d2456ae13823"}


4. Entrer le nom des joueurs d'une partie:
POST: http://localhost/1b8ad78c-da1d-41c1-8552-d2456ae13823/add_roles
Body: {"names": ["Chacha", "Romain", "Elsa", "Mathieu", "Flo", "Eglantine", "Richard", "Quentin", "Thomas"], "roles": ["Oberon", "Perceval", "Morgan"]}

---> 
{
    "players": [
        {
            "color": "BLUE",
            "name": "Chacha",
            "role": "Blue"
        },
        {
            "color": "BLUE",
            "name": "Romain",
            "role": "Perceval"
        },
        {
            "color": "RED",
            "name": "Elsa",
            "role": "Oberon"
        },
        {
            "color": "BLUE",
            "name": "Mathieu",
            "role": "Merlin"
        },
        {
            "color": "RED",
            "name": "Flo",
            "role": "Morgan"
        },
        {
            "color": "BLUE",
            "name": "Eglantine",
            "role": "Blue"
        },
        {
            "color": "BLUE",
            "name": "Richard",
            "role": "Blue"
        },
        {
            "color": "RED",
            "name": "Quentin",
            "role": "Assassin"
        },
        {
            "color": "BLUE",
            "name": "Thomas",
            "role": "Blue"
        }
    ]
}