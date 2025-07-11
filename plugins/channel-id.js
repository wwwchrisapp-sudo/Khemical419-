const { malvin } = require("../malvin");

malvin({
  pattern: "newsletter",
  alias: ["cjid", "id"],
  react: "📡",
  desc: "Get WhatsApp Channel info from link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
  try {
    if (!q)
      return reply(`❎ *Please provide a WhatsApp Channel link.*\n\n📌 *Example:*\n.newsletter https://whatsapp.com/channel/xxxxxxxxxx`);

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match)
      return reply(`⚠️ *Invalid channel link!*\n\nMake sure it looks like:\nhttps://whatsapp.com/channel/xxxxxxxxx`);

    const inviteId = match[1];
    let metadata;

    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch {
      return reply("🚫 *Failed to fetch channel info.*\nDouble-check the link and try again.");
    }

    if (!metadata?.id)
      return reply("❌ *Channel not found or inaccessible.*");

    const infoText = `
╭─❍『 📡 ᴄʜᴀɴɴᴇʟ ɪɴꜰᴏ 』❍─
│
│ 🔖 *ɪᴅ:* ${metadata.id}
│ 🗂️ *ɴᴀᴍᴇ:* ${metadata.name}
│ 👥 *ꜰᴏʟʟᴏᴡᴇʀꜱ:* ${metadata.subscribers?.toLocaleString() || "N/A"}
│ 🗓️ *ᴄʀᴇᴀᴛᴇᴅ:* ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString("id-ID") : "Unknown"}
│
╰─⭓ > ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴇᴀᴄᴇ ʜᴜʙ
`;

    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText
      }, { quoted: m });
    } else {
      reply(infoText);
    }

  } catch (err) {
    console.error("❌ Newsletter Error:", err);
    reply("⚠️ *An unexpected error occurred while fetching the channel info.*");
  }
});
