import { api } from './api';

export const getSportsList = () => {
  return api.get('/sports/');
};

export const getPlayerData = () => {
  return api.get('/trial/player');
};

export const savePlayerData = (playerData: any) => {
  return api.post('/trial/player', {
    player_data: playerData,
  });
};