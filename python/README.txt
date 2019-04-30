
Avoir docker-compose d'installer...

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


5. Nouveau tour:
GET: http://localhost/1b8ad78c-da1d-41c1-8552-d2456ae13823/new_turn
---> {"name_player": "Elsa, "turn": 1, "nb_echec": 2, "nb_mission": 0, "nb_in_mission": 3}
("name_player" --> nom de la personne qui envoie les gens,
 "turn" --> numéro du tour dans la partie compris entre 1 et 5,
 "nb_echec" --> nombre d'échecs pour que la mission échoue,
 "nb_mission" --> nombre de missions échouées (0 car nouveau tour),
 "nb_in_mission" --> nombre de personnes à envoyer en mission)


6. Vote:
POST: http://localhost/1b8ad78c-da1d-41c1-8552-d2456ae13823/vote
Body: {"vote": "refused"}
---> {"request": "succeeded"}

Body: {"vote": "osef"}
--->
{
    "players": [
        {
            "color": "BLUE",
            "ind_player": 0,
            "name": "Chacha",
            "role": "Blue"
        },
        {
            "color": "BLUE",
            "ind_player": 1,
            "name": "Romain",
            "role": "Blue"
        },
        {
            "color": "BLUE",
            "ind_player": 2,
            "name": "Elsa",
            "role": "Perceval"
        },
        {
            "color": "RED",
            "ind_player": 3,
            "name": "Mathieu",
            "role": "Morgan"
        },
        {
            "color": "BLUE",
            "ind_player": 4,
            "name": "Flo",
            "role": "Blue"
        },
        {
            "color": "RED",
            "ind_player": 5,
            "name": "Eglantine",
            "role": "Assassin"
        },
        {
            "color": "BLUE",
            "ind_player": 6,
            "name": "Richard",
            "role": "Blue"
        },
        {
            "color": "RED",
            "ind_player": 7,
            "name": "Quentin",
            "role": "Oberon"
        },
        {
            "color": "BLUE",
            "ind_player": 8,
            "name": "Thomas",
            "role": "Merlin"
        }
    ]
}


7. Nouvelle mission:
GET: http://localhost/1b8ad78c-da1d-41c1-8552-d2456ae13823/new_mission
---> {"name_player": "Elsa, "turn": 1, "nb_echec": 2, "nb_mission": nb_mission, "nb_in_mission": 3}
("name_player" --> nom de la personne qui envoie les gens,
 "turn" --> numéro du tour dans la partie compris entre 1 et 5,
 "nb_echec" --> nombre d'échecs pour que la mission échoue,
 "nb_mission" --> nombre de missions échouées,
 "nb_in_mission" --> nombre de personnes à envoyer en mission)


8. Mélange des votes:
POST: http://localhost/088b2e91-d711-4add-9995-0a4e3ae59275/shuffle_vote
Body: {"Chacha": "FAIL", "Romain":"SUCCESS", "Elsa": "SUCCESS"}
--->
{
    "result": "FAIL",
    "vote1": "FAIL",
    "vote2": "SUCCESS",
    "vote3": "SUCCESS"
}
