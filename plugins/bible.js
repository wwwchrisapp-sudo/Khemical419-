/*
Project Name : PEACE HUB
Creator      : Peacemaker
Repo         : https://github.com/Peacemaker-cyber/PEACE-HUB
*/   

const axios = require("axios");
const { malvin } = require("../malvin");

// Command: bible
malvin({
    pattern: "bible",
    desc: "Fetch Bible verses by reference.",
    category: "download",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        // Check if a reference is provided
        if (args.length === 0) {
            return reply(`⚠️ *Please provide a Bible reference.*\n\n📝 *Example:*\n.bible John 1:1`);
        }

        // Join the arguments to form the reference
        const reference = args.join(" ");

        // Call the API with the reference
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
        const response = await axios.get(apiUrl);

        // Check if the response contains data
        if (response.status === 200 && response.data.text) {
            const { reference: ref, text, translation_name, book_name, chapter, verse } = response.data;

            // Format the response with more metadata
            reply(
                `🌟 *ʙɪʙʟᴇ ᴅʀᴏᴘ ᴀʟᴇʀᴛ!*\n\n` +
                `🆔 *ʀᴇꜰᴇʀᴇɴᴄᴇ:* ${ref}\n` +
                `📘 *ʙᴏᴏᴋ:* ${book_name}\n` +
                `🔎 *ᴄʜᴀᴘᴛᴇʀ:* ${chapter}\n` +
                `🔡 *ᴠᴇʀꜱᴇ:* ${verse}\n\n` +
                `💬 *ᴠᴇʀꜱᴇ ᴛᴇxᴛ:* ${text}\n\n` +
                `🌐 *ᴛʀᴀɴꜱʟᴀᴛɪᴏɴ:* ${translation_name}\n\n` +
                `> 🚀 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴇᴀᴄᴇ ʜᴜʙ`
            );
        } else {
            reply("❌ *Verse not found.* Please check the reference and try again.");
        }
    } catch (error) {
        console.error(error);
        reply("⚠️ *An error occurred while fetching the Bible verse.* Please try again.");
    }
});
