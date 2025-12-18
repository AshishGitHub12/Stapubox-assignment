import { BASE_URL, API_TOKEN } from '../config/apiConfig';

export const savePlayerData = async (token: string, playerData: any) => {
  const response = await fetch(`${BASE_URL}/trial/player`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Api-Token': API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      player_data: playerData,
    }),
  });

  return response.json();
};

export const getPlayerData = async (token: string) => {
  const response = await fetch(`${BASE_URL}/trial/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Api-Token': API_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
