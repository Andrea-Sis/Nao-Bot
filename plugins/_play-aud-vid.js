import fetch from 'node-fetch';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fs from 'fs';
import ytSearch from 'yt-search';

let limit1 = 100;
let limit2 = 400;
let limit_a1 = 50;
let limit_a2 = 400;

const handler = async (message, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `› *Hace falta el título del video de YouTube.*\n\n› *Ejemplo:* ${usedPrefix}${command} Midnight City - M83`;

    const searchResults = await search(args.join(' '));

    let fileType = '';
    if (command === 'play.aud') fileType = '.mp3';
    else if (command === 'play.vid') fileType = '.mp4';

    const resultMessage = `
› *Título:* ${searchResults[0].title}
› *Canal:* ${searchResults[0].author.name}
› *Duración:* ${secondString(searchResults[0].duration.seconds)}
› *Vistas:* ${MilesNumber(searchResults[0].views)}
› *Publicado:* ${searchResults[0].ago}
› *Enlace:* ${searchResults[0].url}
› *Tipo:* ${fileType}
› *Este comando está siendo procesado por La Darly Bot*
    `.trim();

    await conn.sendMessage(message.chat, {
        image: { url: searchResults[0].thumbnail },
        caption: resultMessage
    }, { quoted: message });

    if (command === 'play.aud') {
        try {
            const audioUrl = `https://api.cafirexos.com/api/v2/ytmp3?url=${searchResults[0].url}`;
            const audioTitle = await searchResults[0].title;
            const audioBuffer = await getBuffer(audioUrl);
            const audioSizeMB = audioBuffer.byteLength / (1024 * 1024);

            if (audioSizeMB >= limit_a2) {
                await conn.sendMessage(message.chat, { text: `› *Su archivo es demasiado grande, envíelo manualmente:* ${audioUrl}` }, { quoted: message });
                return;
            }
            if (audioSizeMB >= limit_a1 && audioSizeMB <= limit_a2) {
                await conn.sendMessage(message.chat, {
                    document: audioBuffer,
                    mimetype: 'audio/mpeg',
                    fileName: `${audioTitle}.mp3`
                }, { quoted: message });
                return;
            } else {
                await conn.sendMessage(message.chat, {
                    audio: audioBuffer,
                    mimetype: 'audio/mpeg',
                    fileName: `${audioTitle}.mp3`
                }, { quoted: message });
                return;
            }
        } catch {
            throw `› *Un error ocurrió. Inténtalo de nuevo más tarde, por favor.*`;
        }
    }

    if (command === 'play.vid') {
        try {
            const videoUrl = `https://api.cafirexos.com/api/v2/ytmp4?url=${searchResults[0].url}`;
            const videoTitle = await searchResults[0].title;
            const videoBuffer = await getBuffer(videoUrl);
            const videoSizeMB = videoBuffer.byteLength / (1024 * 1024);

            if (videoSizeMB >= limit2) {
                await conn.sendMessage(message.chat, { text: `› *Su archivo es demasiado grande, envíelo manualmente:* ${videoUrl}` }, { quoted: message });
                return;
            }
            if (videoSizeMB >= limit1 && videoSizeMB <= limit2) {
                await conn.sendMessage(message.chat, {
                    document: videoBuffer,
                    mimetype: 'video/mp4',
                    fileName: `${videoTitle}.mp4`
                }, { quoted: message });
                return;
            } else {
                await conn.sendMessage(message.chat, {
                    video: videoBuffer,
                    mimetype: 'video/mp4',
                    fileName: `${videoTitle}.mp4`
                }, { quoted: message });
                return;
            }
        } catch {
            throw `› *Un error ocurrió. Inténtalo de nuevo más tarde, por favor.*`;
        }
    }
};

handler.help = ['play.aud', 'play.vid'];
handler.command = /^(play.aud|play.vid)$/i;

export default handler;

async function search(query, options = {}) {
    const results = await ytSearch({ query, hl: 'es', gl: 'ES', ...options });
    return results.videos;
}

function MilesNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function secondString(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${secs + 's'}`;
}
