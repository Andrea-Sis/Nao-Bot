`PLUGUN PLAY YOUTUBE`

/* 
- BY KENISAWADEV 
- https://whatsapp.com/channel/0029VarbyoN2ZjCkcPW7q33F
*/

import fetch from "node-fetch"
import yts from 'yt-search'

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
      throw m.reply("✧ Ingresa una consulta de *YouTube*");
    }
  
  try {
    let res = await yts(text);
    let videoList = res.all;
    let video = videoList[0];

    let texto = `_*Reproduciendo  ${video.title}...*_`;

    await conn.sendMessage(m?.chat, {react: {text: `🎵`, key: m?.key}});

    await conn.sendMessage(m.chat, { 
      image: { url: video.thumbnail },  
      caption: texto 
    }, { quoted: m });

    let apiUrl = `https://stingy-lari-galaxy-api-309d0e83.koyeb.app/api/youtube?url=${encodeURIComponent(video.url)}`;
    let result = await (await fetch(apiUrl)).json();

      let audioUrl = result.downloadUrl;

      await conn.sendMessage(m.chat, { 
        audio: { url: audioUrl }, 
        mimetype: 'audio/mp4', 
      }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply('Error interno, intenta mas tarde.');
  }
}
handler.help = ['ply <consulta>']
handler.tags = ['downloader']
handler.command = /^(ply)$/i

handler.premium = false
handler.register = true

export default handler
