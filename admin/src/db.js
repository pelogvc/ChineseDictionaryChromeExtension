import Dexie from 'dexie';

const db = new Dexie('dictionary');
db.version(1).stores({
    recentlyWords: `++id, query, created, title, url`
});
db.open();

async function getRecentlyList(page) {
    let offset = ((page || 1) - 1) * 20;
    return await db.dictionary.reverse().offset(offset).limit(20);
}

async function getRecentlyCount() {
    return await db.dictionary.count();
}

async function getRecentlyPages() {
    return await getRecentlyCount() / 20 + 1;
}

export default {
    getRecentlyList,
    getRecentlyCount,
    getRecentlyPages,
};