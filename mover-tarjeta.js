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

function putRequest(url, data = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

(async () => {
    if (!TRELLO_ID) {
        console.log("No se detectó ID de tarjeta en el commit.");
        return;
    }

    const url = `https://api.trello.com/1/lists/${LIST_IN_PROGRESS}/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
    const cards = await getJSON(url);
    const card = cards.find(c => c.name.includes(TRELLO_ID));

    if (!card) {
        console.log(`No se encontró tarjeta con ID: ${TRELLO_ID}`);
        return;
    }

    console.log(`✅ Tarjeta encontrada: ${card.name}`);

    // 1. Mover a la lista "Hecho"
    const moveUrl = `https://api.trello.com/1/cards/${card.id}?idList=${LIST_DONE}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
    await putRequest(moveUrl);
    console.log(`📦 Tarjeta ${card.id} movida a 'Hecho'`);

    // 2. Verificar si tiene due (fecha de vencimiento)
    if (!card.due) {
        const now = new Date().toISOString(); // Fecha actual en formato ISO
        const dueUrl = `https://api.trello.com/1/cards/${card.id}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
        await putRequest(dueUrl, { due: now });
        console.log("🕒 Fecha de vencimiento asignada automáticamente.");
    }

    // 3. Marcar como completada
    const completeUrl = `https://api.trello.com/1/cards/${card.id}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
    await putRequest(completeUrl, { dueComplete: true });
    console.log("✅ Tarjeta marcada como completada.");
    console.log(`TRELLO_CARD_NAME=${card.name}`);
})();