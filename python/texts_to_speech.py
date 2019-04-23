# -*- coding: utf-8 -*-
# authors : romain.121@hotmail.fr



#######################################################################################################################
#######################################################################################################################


def create_break(duration):
    """Add a break time"""
    return '<break time="'+str(duration)+'s"/>\n'


def add_reds(script, boolean_oberon):

    str_oberon = ''
    if boolean_oberon:
        str_oberon = 'sauf oberon '

    str_reds = 'Les Serviteurs de Mordraid '+str_oberon\
             + "ouvrent les yeux et regardent autour d’eux afin de reconnaître les agents du Mal.\n"\
             + create_break(4)\
             + 'Les Serviteurs de Mordraid ferment les yeux.\n'\
             + create_break(2)

    script.writelines(str_reds)


def add_merlin(script, boolean_merlin, boolean_mordred):

    str_mordred = ''
    if boolean_mordred:
        str_mordred = ' sauf Mordraid lui-même'

    str_merlin = ''
    if boolean_merlin:
        str_merlin = 'Les serviteurs de Mordraid'+str_mordred\
                   + ' lèvent le pouce afin que Merlin puisse les identifier.\n'\
                   + create_break(1)\
                   + 'Merlin, ouvre les yeux et contemple les agents du Mal.\n'\
                   + create_break(4)\
                   + 'Les serviteurs de Mordraid, baissent le pouce.\n'\
                   + create_break(1)\
                   + 'Merlin, ferme les yeux.\n'\
                   + create_break(2)

    script.writelines(str_merlin)


def add_perceval_and_morgane(script, boolean_perc_morg):

    str_perc_morg = ''
    if boolean_perc_morg:
        str_perc_morg = 'Merlin et Morgane, lèvent le pouce afin que Perceval puisse les reconnaître.\n'\
                      + 'Perceval, ouvre les yeux afin de reconnaître Merlin et Morgane.\n'\
                      + create_break(4)\
                      + 'Merlin et Morgane, baissent le pouce.\n'\
                      + create_break(1)\
                      + 'Perceval, ferme les yeux.\n'\
                      + create_break(2)

    script.writelines(str_perc_morg)


#######################################################################################################################
#######################################################################################################################

if __name__ == '__main__':

    STR_INIT = 'Chacun ferme les yeux et tend son poing fermé devant lui.\n'\
             + create_break(1)

    STR_END = 'Tout le monde a les yeux fermés et a les pouces baissés.\n'\
            + create_break(1)\
            + 'Tout le monde peut ouvrir les yeux.\n'

    boolean_merlin = True

    boolean_perc_morg = True
    boolean_mordred = True
    boolean_oberon = True

    list_val = [False, True]
    for val1 in list_val:
        boolean_perc_morg = val1
        for val2 in list_val:
            boolean_mordred = val2
            for val3 in list_val:
                boolean_oberon = val3
                test_script = open('./texts/'+str(val1)+'_'+str(val2)+'_'+str(val3)+'.txt', 'w')

                test_script.writelines(STR_INIT)
                add_reds(test_script, boolean_oberon)
                add_perceval_and_morgane(test_script, boolean_perc_morg)
                add_merlin(test_script, boolean_merlin, boolean_mordred)
                test_script.writelines(STR_END)
