const https = require('https');

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const LIST_IN_PROGRESS = process.env.TRELLO_LIST_ID_IN_PROGRESS;
const LIST_DONE = process.env.TRELLO_LIST_ID_DONE;
const TRELLO_ID = process.env.TRELLO_CARD_ID;

function getJSON(url) {
    return new Promise((resolve, reject) => {
    https.get(url, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
    });
}

function moveCard(cardId) {
    const url = `https://api.trello.com/1/cards/${cardId}?idList=${LIST_DONE}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
    https.request(url, { method: 'PUT' }, res => {
        console.log(`Tarjeta ${cardId} movida a 'Hecho' (Done)`);
    }).end();
}

(async () => {
    if (!TRELLO_ID) {
        console.log("No se detectó ID de tarjeta en el commit.");
    return;
    }

const url = `https://api.trello.com/1/lists/${LIST_IN_PROGRESS}/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
const cards = await getJSON(url);
const card = cards.find(c => c.name.includes(TRELLO_ID));

if (card) {
    console.log(`Tarjeta encontrada: ${card.name}`);
    moveCard(card.id);
} else {
    console.log(`No se encontró tarjeta con ID: ${TRELLO_ID}`);
}
})();