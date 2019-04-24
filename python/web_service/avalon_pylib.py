# -*- coding: utf-8 -*-
# authors : romain.121@hotmail.fr

import os
import pickle

from random import shuffle

#######################################################################################################################
#######################################################################################################################

def check_roles(dict_roles, red_rules, blue_rules):
    """Check the validity of proposed roles
    cases break rules : - 1. Morgan in the game but Perceval is not
                        - 2. Perceval in the game but Morgan is not
                        - 3. Unvalid role
                        - 4. Too many red in the game (or too many blue in the game, checked but impossible)
                        - 5. Same roles (always checked beacause list(set(dict.keys)) always = dict.keys())"""

    # case break rule 1
    if "Morgan" in dict_roles.keys() and "Perceval" not in dict_roles.keys():
        print "ERROR 1 -> Morgan is in the game but Perceval is not"

    # case break rule 2
    if "Perceval" in dict_roles.keys() and "Morgan" not in dict_roles.keys():
        print "ERROR 2 -> Perceval is in the game but Morgan is not"

    nb_red, nb_blue = 1, 1
    list_roles = ["Merlin", "Assassin"]
    for role in dict_roles.keys():
        if role in ["Mordred", "Morgan", "Oberon"]:
            nb_red += 1
            list_roles.append(role)
        elif role == "Perceval":
            nb_blue += 1
            list_roles.append(role)
        # case break rule 3
        else:
            print "ERROR 3 -> can't add this role: "+str(role)

    if nb_red <= red_rules and nb_blue <= blue_rules:
        list_roles.extend(["Red"]*(red_rules-nb_red))
        list_roles.extend(["Blue"]*(blue_rules-nb_blue))
    # case break rule 4
    else:
        print "ERROR 4 -> too many red or blue"

    shuffle(list_roles)

    return list_roles

#######################################################################################################################
#######################################################################################################################

class Player(object):
    """Class Player"""

    def __init__(self):
        self.name = None
        self.role = None
        self.color = None

    def __strPlayer__(self):
        """Print attributs of a player"""
        print "\nname:", self.name
        print "role:", self.role
        print "color:", self.color

    def add_name(self, name):
        """Add a name to a player"""
        self.name = name


    def add_role(self, role):
        """Add a role and a color to a player"""
        if role in ["Blue",  "Merlin", "Perceval"]:
            self.role = role
            self.color = "BLUE"
        elif role in ["Red", "Mordred", "Morgan", "Assassin", "Oberon"]:
            self.role = role
            self.color = "RED"
        else:
            print "ERROR -> can't add this role: "+str(role)

class GameAvalon(object):
    """Class GameAvalon"""

    def __init__(self):
        self.players = {}
        self.rules = [{"nb_player": 5, "BLUE": 3, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 2, "quete_4": 3, "quete_5": 3},
                      {"nb_player": 6, "BLUE": 4, "RED": 2, "quete_1": 2, "quete_2": 3, "quete_3": 4, "quete_4": 3, "quete_5": 4},
                      {"nb_player": 7, "BLUE": 4, "RED": 3, "quete_1": 2, "quete_2": 3, "quete_3": 3, "quete_4": 4, "quete_5": 4},
                      {"nb_player": 8, "BLUE": 5, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
                      {"nb_player": 9, "BLUE": 6, "RED": 3, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5},
                      {"nb_player": 10, "BLUE": 6, "RED": 4, "quete_1": 3, "quete_2": 4, "quete_3": 4, "quete_4": 5, "quete_5": 5}]
        self.player_rules = None
        self.list_roles = None

    def __strGame__(self):
        """Print attributs of a game"""
        print "\n\nplayers:"
        for player in self.players.values():
            print player.__strPlayer__()
        print "\n\nplayers_rules:", self.player_rules


    def add_nb_player(self, nb_player):
        """Create 'nb_player' new players"""
        if nb_player < 5 or nb_player > 10:
            print "ERROR -> the number of players "+str(nb_player)+"is not between 5 and 10"

        for rule in self.rules:
            if rule["nb_player"] == nb_player:
                self.player_rules = rule

        for player in range(nb_player):
            self.players[player] = Player()

    def add_names_to_player(self, list_names):
        """Add names to player in the same order"""
        if len(self.players.keys()) != len(list_names):
            print "ERROR -> the number of players ("+str(len(self.players.keys()))+") and names ("+str(len(list_names))+") are different"

        for player in self.players.keys():
            self.players[player].add_name(list_names[player])

    def add_roles_to_player(self, dict_roles):
        """Add roles randomly to each player"""
        self.list_roles = check_roles(dict_roles, self.player_rules["RED"], self.player_rules["BLUE"])
        if len(self.players.keys()) != len(self.list_roles):
            print "ERROR -> the number of players ("+str(len(self.players.keys()))+") and roles ("+str(len(self.list_roles))+") are different"

        for player in self.players.keys():
            self.players[player].add_role(self.list_roles[player])

    def create_mp3(self):
        """Create mp3 file depending on roles in the game"""
        list_to_merge = ["init.mp3", "serv_mord.mp3"]
        if "Oberon" in self.list_roles:
            list_to_merge.append("oberon.mp3")
        list_to_merge.append("red_identi.mp3")

        if "Morgan" in self.list_roles and "Perceval" in self.list_roles:
            list_to_merge.append("add_per_mor.mp3")

        list_to_merge.append("serv_mord.mp3")
        if "Mordred" in self.list_roles:
            list_to_merge.append("mordred.mp3")
        list_to_merge.extend(["merlin_identi.mp3", "end.mp3"])

        str_command = "cat "
        for i in range(len(list_to_merge)):
            str_command += "data/"+list_to_merge[i]+" "
        str_command += " > data/roles.mp3"
        os.system(str_command)

        # Forgiving players like mplayer can handle the resulting files without any issue.
        # Still, it’s recommended to fix the file header e.g. using avconv.
        # avconv -i combined_files.mp3 -acodec copy combined_files_fixed.mp3


#######################################################################################################################
#######################################################################################################################

if __name__ == '__main__':

    newGame = GameAvalon()
    newGame.add_nb_player(8)
    newGame.add_names_to_player(["Chacha", "Romain", "Elsa", "Mathieu", "Flo", "Eglantine", "Richard", "Quentin"])
    newGame.add_roles_to_player({"Mordred": True, "Oberon": True})
    newGame.create_mp3()

    for player in newGame.players.values():
        player.__strPlayer__()


    # checker les cas où il faut 2 échecs pour les rouges et trouver un moyen de les prendre en compte
    # s'organiser avec mathieu pour ce qui est gardé en mémoire, - json où on add tous les nouveaux éléments
    #                                                            - un fichier pickle qui permet d'utiliser une classe
    # comment on fait les votes pour les missions ? à main levé ou on passe le téléphone à chacun
    # comment on fait pour les succés/échecs -> on passe le téléphone aux personnes concernées
    # comment on prend en compte le fait des missions qui ne partent pas (limite à 5..)
    # on rajoute une diplomatie ? équivalent de la dame blanche
    # why not un fichier a actualisé avec le pourcentage de win en fonction de chaque prénom
    # générer les binaires à écouter pour mathieu
