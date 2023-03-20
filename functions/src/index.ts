import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import axios, { AxiosError } from 'axios';

const client = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

admin.initializeApp();

const steamApiKey = defineSecret('STEAM_API_KEY');
const STEAM_ID = '76561197998637344';

exports.updateOwnedGames = functions
  .runWith({ secrets: [steamApiKey] })
  .pubsub.schedule('0 0 * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    const STEAM_API_KEY = steamApiKey.value();
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true`;

    const data = await client
      .get(url)
      .then(response => response?.data.response)
      .catch((err: AxiosError) => console.error(`${err.request.baseURL}${err.request.path}`));

    const writeResult = await admin
      .firestore()
      .collection(`ownedGames`)
      .add({ steamId: STEAM_ID, timestamp: Date.now(), ...data });

    return writeResult;
  });
