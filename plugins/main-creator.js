let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Nao;;\nFN:Nao\nORG:Nao\nTITLE:\nitem1.TEL;waid=5215554705747:5215554705747\nitem1.X-ABLabel:Nao\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Nao\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
