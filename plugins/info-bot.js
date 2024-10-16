import fs from 'fs';
const handler = (m) => m;
handler.all = async function(m) {

const chat = global.db.data.chats[m.chat];
if (chat.isBaneed) return
if (/^bot$/i.test(m.text)) {
conn.reply(m.chat, `👸🏼 ¡Hola! Soy 𝐃𝐀𝐑𝐋𝐘 𝐁𝐎𝐓 ᡣ𐭩, en que puedo ayudarte hoy?\n\n🌸 Usa *.menu* para ver mis comandos.`, m, rcanal, )
}
  
if (/^.bermuda/i.test(m.text)) {
conn.reply(m.chat, `*Mapa Eligido Bermuda 🐉*`, m, rcanal, )
}

if (/^.alpes/i.test(m.text)) {
conn.reply(m.chat, `*Mapa Eligido Alpes 🐉*`, m, rcanal, )
}

if (/^.purgatorio/i.test(m.text)) {
conn.reply(m.chat, `*Mapa Eligido Purgatorio 🐉*`, m, rcanal, )
}
  
if (/^.kalahari$/i.test(m.text)) {
conn.reply(m.chat, `*Mapa Eligido Kalahari 🐉*`, m, rcanal, )
}

if (/^.nexterra$/i.test(m.text)) {
conn.reply(m.chat, `*Mapa Eligido NexTerra 🐉*`, m, rcanal, )
}
return !0;
};
export default handler;
