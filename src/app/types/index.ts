export interface PutPlayerBody {
  names: string[];
  roles: string[];
}

export interface Player {
  id: string;
  ind_player: number;
  name: string;
  role: string;
  team: string;
  assassin?: boolean;
}

export interface GameResult {
  status: boolean;
  merlin_id?: string;
}

export interface Game {
  id: string;
  players: Player[];
  current_id_player: string;
  current_quest: number;
  quests: Quest[];
  nb_quest_unsend: number;
  result?: GameResult;
}

export interface Quest {
  nb_votes_to_fail: number;
  nb_players_to_send: number;
  votes?: boolean[];
  status?: boolean;
}

export interface QuestResult {
  votes: boolean[];
  status: boolean;
}

export interface Rule {
  blue: number;
  red: number;
  quests: {
    nb_votes_to_fail: number,
    nb_players_to_send: number
  }[];
}

export interface Rules {
  [nbPlayers: number]: Rule;
}
