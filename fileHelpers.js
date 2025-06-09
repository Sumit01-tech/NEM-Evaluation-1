const fs = require('fs')
const path = require('path');

const dbPath = path.join(__dirname, "../db.json");
async function readDB() {
    const data = await fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
}
async function writeDB() {
    await fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };