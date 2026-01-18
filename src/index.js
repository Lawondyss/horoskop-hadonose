import { openings, tensions, metas, symbols, karmas } from './data.js';

// Jednoduchý LCG generátor pro deterministický výběr podle seedu
function createGenerator(seed) {
    return function() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

// Funkce pro vytvoření seedu z aktuálního data (YYYYMMDD)
function getDateSeed() {
    const now = new Date();
    // Použijeme UTC, aby to bylo konzistentní v GitHub Actions
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    return parseInt(`${year}${month}${day}`, 10);
}

function pick(arr, random) {
    return arr[Math.floor(random() * arr.length)];
}

async function postToMastodon(text) {
    const instance = process.env.MASTODON_INSTANCE;
    const token = process.env.MASTODON_TOKEN;

    if (!instance || !token) {
        console.warn('Chybí MASTODON_INSTANCE nebo MASTODON_TOKEN. Výstup pouze do konzole.');
        return;
    }

    try {
        const response = await fetch(`${instance}/api/v1/statuses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Idempotency-Key': String(getDateSeed()) // Zabrání duplicitnímu postování
            },
            body: JSON.stringify({ status: text })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Odesláno na Mastodon: ${data.url}`);
    } catch (error) {
        console.error('Chyba při odesílání na Mastodon:', error);
        process.exit(1);
    }
}

function buildHoroscope() {
    const seed = getDateSeed();
    const random = createGenerator(seed);

    const opening = pick(openings, random);
    const tension = pick(tensions, random);
    const karma = pick(karmas, random);
    const meta = pick(metas, random);
    const symbol = pick(symbols, random);

    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };

    return `${new Date().toLocaleDateString('cs-CZ', dateOptions)}

${opening} ${tension}

${karma}

Symbol dne: ${symbol}

${meta}

#hadonos #horoskop #satira`;
}

async function main() {
    const horoscope = buildHoroscope();
    console.log(horoscope);
    
    // Pokud jsme v GitHub Actions nebo máme nastavené proměnné, odešleme
    if (process.env.CI || (process.env.MASTODON_INSTANCE && process.env.MASTODON_TOKEN)) {
        await postToMastodon(horoscope);
    }
}

main();
