import { BASE_URL, API_TOKEN } from '../config/apiConfig';

export const getSportsList = async () => {
  const response = await fetch(`${BASE_URL}/sports/`, {
    headers: {
      'X-Api-Token': API_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
