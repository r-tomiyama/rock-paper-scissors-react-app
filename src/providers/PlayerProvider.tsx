import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Player = {
  id?: string;
  name?: string;
};

type PlayerContextType = {
  player: Player;
  setId: (_v: string) => void;
  setName: (_v: string) => void;
};
const PlayerContext = createContext<PlayerContextType>({
  player: {},
  setId: (_v) => {
    void 0;
  },
  setName: (_v) => {
    void 0;
  },
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player>({});

  const setId = (id: string) => {
    setPlayer({ ...player, id });
    window.localStorage.setItem('playerId', id);
  };
  const setName = (name: string) => {
    setPlayer({ ...player, name });
    window.localStorage.setItem('playerName', name);
  };

  useEffect(() => {
    const playerId = window.localStorage.getItem('playerId');
    if (playerId) {
      setId(playerId);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const newId = uuidv4() as string;
      setId(newId);
    }
  }, []);

  useEffect(() => {
    const playerName = window.localStorage.getItem('playerName');
    if (playerName) {
      setName(playerName);
    }
  }, []);

  return (
    <PlayerContext.Provider value={{ player, setId, setName }}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
