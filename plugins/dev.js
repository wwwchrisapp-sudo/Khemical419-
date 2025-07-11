const { malvin, commands } = require('../malvin');

malvin({
    pattern: "owner",
    alias: ["developer", "dev"],
    desc: "Displays the developer info",
    category: "owner",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "there";

        const caption = `
╭─⌈ *👨‍💻 ᴘᴇᴀᴄᴇ ʜᴜʙ ᴅᴇᴠᴇʟᴏᴘᴇʀ* ⌋─
│
│ 👋 Hello, *${name}*!
│ 
│ '🧠 *ᴘᴇᴀᴄᴇᴍᴀᴋᴇʀ* ᴄᴏᴅᴇᴅ ᴛʜɪꜱ ᴡɪᴛʜ ʟᴏᴠᴇ 💚
│   ' ꜱᴍᴀʀᴛ, ꜱᴀꜰᴇ & ꜱᴜᴘᴇʀ ʀᴇꜱᴘᴏɴꜱɪᴠᴇ
│
│ 👨‍💻 *ᴏᴡɴᴇʀ ɪɴꜰᴏ:*
│ ──────────
│ 🧠 *Name:* ᴘᴇᴀᴄᴇᴍᴀᴋᴇʀ
│ 🎂 *Age:* +22
│ 📞 *Contact:* wa.me/254752818245
╰─────────

> ⚡ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴇᴀᴄᴇ ʜᴜʙ
        `.trim();

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/uykxm4.jpg' },
                caption: caption,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363421564278292@newsletter',
                        newsletterName: 'ᴘᴇᴀᴄᴇ ʜᴜʙ',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: "> 🚀 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴇᴀᴄᴇ ʜᴜʙ",
                        body: "ᴄᴏᴅᴇᴅ ᴡɪᴛʜ 💚 ʙʏ ᴘᴇᴀᴄᴇᴍᴀᴋᴇʀ",
                        thumbnailUrl: 'https://files.catbox.moe/uykxm4.jpg',
                        mediaType: 1,
                        renderSmallerThumbnail: true,
                        showAdAttribution: true,
                        mediaUrl: "https://youtube.com/@Peacemaker-q-n8",
                        sourceUrl: "https://youtube.com/@Peacemaker-q-n8"
                    }
                }
            },
            { quoted: mek }
        );
    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
