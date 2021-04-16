﻿const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')

const fs = require("fs")
const FormData = require('form-data')
const request = require('request')
const moment = require('moment-timezone')

const { apikey, prefix, ownerNumber } = JSON.parse(fs.readFileSync('./config.json'))

const { fetchJson, getBuffer } = require('./lib/fetcher')
const { color } = require('./lib/color')
const { exec } = require("child_process")
const { getRandom, getGroupAdmins } = require('./lib/function')
const { help, rules, donate, islami, downloader, movsto, searching, rantext, ranimage, animanga, infoo, hiburr, makerr, tools, wibuh, nsfww, rohani } = require('./help/help')
const { exit } = require('process')
const speed = require('performance-now')
/*
]=====> FUNCTION <=====[
*/
function kyun(seconds){

  function pad(s){

    return (s < 10 ? '0' : '') + s;

  }

  var hours = Math.floor(seconds / (60*60));

  var minutes = Math.floor(seconds % (60*60) / 60);

  var seconds = Math.floor(seconds % 60);



  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function starts() {
    const lolhuman = new WAConnection()
    lolhuman.logger.level = 'warn'
    lolhuman.on('qr', () => {
        const time_connecting = moment.tz('Asia/Jayapura').format('HH:mm:ss')
        console.log(color(time_connecting, "white"), color("[  STATS  ]", "aqua"), "Scan QR Code with WhatsApp")
    })
    fs.existsSync('./lolhuman.json') && lolhuman.loadAuthInfo('./lolhuman.json')
    if (apikey == "") {
        ini_time = moment.tz('Asia/Jayapura').format('HH:mm:ss')
        console.log(color(ini_time, "white"), color("[  ERROR  ]", "aqua"), color("Apikey is empty, please check at config.json", 'red'))
        exit()
    }
    lolhuman.on('connecting', () => {
        const time_connecting = moment.tz('Asia/Jayapura').format('HH:mm:ss')
        console.log(color(time_connecting, "white"), color("[  STATS  ]", "aqua"), "Connecting...")
    })
    lolhuman.on('open', () => {
        const time_connect = moment.tz('Asia/Jayapura').format('HH:mm:ss')
        console.log(color(time_connect, "white"), color("[  STATS  ]", "aqua"), "Connected")
    })
    await lolhuman.connect({ timeoutMs: 30 * 1000 })
    fs.writeFileSync('./lolhuman.json', JSON.stringify(lolhuman.base64EncodedAuthInfo(), null, '\t'))

    lolhuman.on('group-participants-update', async(chat) => {
        try {
            mem = chat.participants[0]
            try {
                var pp_user = await lolhuman.getProfilePicture(mem)
            } catch (e) {
                var pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (chat.action == 'add') {
                ini_user = lolhuman.contacts[mem]
                ini_img = await getBuffer(`http://api.lolhuman.xyz/api/welcomeimage?apikey=${apikey}&img=${pp_user}&text=${ini_user.notify}`)
                group_info = await lolhuman.groupMetadata(chat.jid)
                welkam = `${ini_user.notify}, Welcome to ${group_info.subject}`
                lolhuman.sendMessage(chat.jid, ini_img, MessageType.image, { caption: welkam })
            }
            if (chat.action == 'remove') {
                ini_user = lolhuman.contacts[mem]
                ini_out = `${ini_user.notify}, Sayonara 👋`
                lolhuman.sendMessage(chat.jid, ini_out, MessageType.text)
            }
        } catch (e) {
            console.log('Error :', e)
        }
    })

    lolhuman.on('chat-update', async(lol) => {
        try {
            const time = moment.tz('Asia/Jayapura').format('HH:mm:ss')
            if (!lol.hasNewMessage) return
            lol = JSON.parse(JSON.stringify(lol)).messages[0]
            if (!lol.message) return
            if (lol.key && lol.key.remoteJid == 'status@broadcast') return
            if (lol.key.fromMe) return
            global.prefix
            const content = JSON.stringify(lol.message)
            const from = lol.key.remoteJid
            const type = Object.keys(lol.message)[0]
            const insom = from.endsWith('@g.us')
            const nameReq = insom ? lol.participant : lol.key.remoteJid
            pushname2 = lolhuman.contacts[nameReq] != undefined ? lolhuman.contacts[nameReq].vname || lolhuman.contacts[nameReq].notify : undefined

            const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

            body = (type === 'conversation' && lol.message.conversation.startsWith(prefix)) ? lol.message.conversation : (type == 'imageMessage') && lol.message.imageMessage.caption.startsWith(prefix) ? lol.message.imageMessage.caption : (type == 'videoMessage') && lol.message.videoMessage.caption.startsWith(prefix) ? lol.message.videoMessage.caption : (type == 'extendedTextMessage') && lol.message.extendedTextMessage.text.startsWith(prefix) ? lol.message.extendedTextMessage.text : ''
            budy = (type === 'conversation') ? lol.message.conversation : (type === 'extendedTextMessage') ? lol.message.extendedTextMessage.text : ''
            var Link = (type === 'conversation' && lol.message.conversation) ? lol.message.conversation : (type == 'imageMessage') && lol.message.imageMessage.caption ? lol.message.imageMessage.caption : (type == 'videoMessage') && lol.message.videoMessage.caption ? lol.message.videoMessage.caption : (type == 'extendedTextMessage') && lol.message.extendedTextMessage.text ? lol.message.extendedTextMessage.text : ''
            const messagesLink = Link.slice(0).trim().split(/ +/).shift().toLowerCase()
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const isCmd = body.startsWith(prefix)
            lolhuman.chatRead(from)
            
            const DevApi = 'KhaelSan21'
            const XteamKey = 'KhaelSan21'
            const ffmpeg = require('fluent-ffmpeg')
            const botNumber = lolhuman.user.jid
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? lol.participant : lol.key.remoteJid
            const groupMetadata = isGroup ? await lolhuman.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const totalchat = await lolhuman.chats.all()
            const ban = JSON.parse(fs.readFileSync('./database/user/banned.json'))
            const premium = JSON.parse(fs.readFileSync('./database/user/premium.json'))
            const isBanned = ban.includes(sender)
            const isPrem = premium.includes(sender)
            const isOwner = ownerNumber.includes(sender)
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const isGroupAdmins = groupAdmins.includes(sender) || false
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Khael\n'
            + 'ORG: Sayu kawaii;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6282248192917:+62 822-4819-2917\n' 
            + 'END:VCARD'


            const isUrl = (ini_url) => {
                return ini_url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
            }
            const reply = (teks) => {
                lolhuman.sendMessage(from, teks, text, { quoted: lol })
            }
            const sendMess = (hehe, teks) => {
                lolhuman.sendMessage(hehe, teks, text)
            }
            const costum = (pesan, tipe, target, target2) => {
                lolhuman.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
            }
            const mentions = (teks, memberr, id) => {
                (id == null || id == undefined || id == false) ? lolhuman.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }): lolhuman.sendMessage(from, teks.trim(), extendedText, { quoted: lol, contextInfo: { "mentionedJid": memberr } })
            }
            async function faketoko(teks, url_image, title, code, price) {
                var punya_wa = "0@s.whatsapp.net"
                var ini_buffer = await getBuffer(url_image)
                const ini_cstoko = {
                    contextInfo: {
                        participant: punya_wa,
                        remoteJid: 'status@broadcast',
                        quotedMessage: {
                            productMessage: {
                                product: {
                                    currencyCode: code,
                                    title: title,
                                    priceAmount1000: price,
                                    productImageCount: 1,
                                    productImage: {
                                        jpegThumbnail: ini_buffer
                                    }
                                },
                                businessOwnerJid: "0@s.whatsapp.net"
                            }
                        }
                    }
                }
                lolhuman.sendMessage(from, teks, text, ini_cstoko)
            }

            colors = ['red', 'white', 'black', 'blue', 'yellow', 'green', 'aqua']
            const isMedia = (type === 'imageMessage' || type === 'videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

            if (!isGroup && !isCmd) console.log(color(time, "red"), color("[ PRIVATE ]", "blue"), color(budy, "white"), "from", color(sender.split('@')[0], "aqua"))
            if (isGroup && !isCmd) console.log(color(time, "red"), color("[  GROUP  ]", "blue"), color(budy, "white"), "from", color(sender.split('@')[0], "aqua"), "in", color(groupName, "aqua"))
            if (!isGroup && isCmd) console.log(color(time, "red"), color("[ COMMAND ]", "blue"), color(budy, "white"), "from", color(sender.split('@')[0], "aqua"))
            if (isGroup && isCmd) console.log(color(time, "red"), color("[ COMMAND ]", "blue"), color(budy, "white"), "from", color(sender.split('@')[0], "aqua"), "in", color(groupName, "aqua"))

            switch (command) {
            	//api.fdci.se chara menu / wibu menu
// case by @khael !!
            	case 'menherachan':
                 if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=menhera-chan`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lolhuman.sendMessage(from, pok, image, { quoted: lol })
					break
					case 'menherakun':
                 if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=menhera-kun`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lolhuman.sendMessage(from, pok, image, { quoted: lol })
					break
					case 'miku':
					case 'nakanomiku':
					case 'mikunakano':
                 if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					lolhuman.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=nakano%20miku`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lolhuman.sendMessage(from, pok, image, { quoted: lol })
					break
					case 'yotsuba':
					case 'nakanoyotsuba':
					case 'yotsubanakano':
                 if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					lolhuman.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=nakano%20yotsuba`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lolhuman.sendMessage(from, pok, image, { quoted: lol })
					break
					case 'nino':
					case 'nakanonino':
					case 'ninonakano':
                 if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					lolhuman.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=nakano%20nino`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lolhuman.sendMessage(from, pok, image, { quoted: lol })
					break
					case 'itsuki':
					case 'nakanoitsuki':
					case 'isukinakano':
                 if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					lolhuman.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=nakano%20itsuki`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lolhuman.sendMessage(from, pok, image, { quoted: lol })
					break
					case 'ichika':
					case 'nakanoichika':
					case 'ichikanakano':
                 if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					lolhuman.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=nakano%20ichika`, {method: 'get'})
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					lolhuman.sendMessage(from, pok, image, { quoted: lol })
					break
//Group Menu
case 'apakah':
           if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					apakah = body.slice(1)
					const apa =['Iya','Tidak','Bisa Jadi','Mungkin Iya','Mungkin Tidak',]
					const kah = apa[Math.floor(Math.random() * apa.length)]
					lolhuman.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: lol })
					break
case 'bisakah':
				if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					bisakah = body.slice(1)
					const bisa =['Tentu Saja Bisa!','Gak Bisa Ajg Aowkwowk','Hmm Gua Gak Tau Yaa, tanya ama bapakau','Ulangi Tod Gua Ga Paham','Ha? Gimana²?','Tidak Bisa','Iya bisa','Iya Mungkin Bisa',]
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					lolhuman.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: lol })
					break
case 'kapankah':
				if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					kapankah = body.slice(1)
					const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi','Sebentar Lagi','kemarin']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					lolhuman.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: lol })
					break
case 'rate':
				if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					rate = body.slice(1)
					const ra =['3','4','5','6','7','8','9','10']
					const te = ra[Math.floor(Math.random() * ra.length)]
					lolhuman.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'/10', text, { quoted: lol })
					break
case 'hobby':
           if (isBanned) return reply(nad.baned())
           if (!isRegistered) return reply(nad.noregis())
           if (isLimit(sender)) return reply(nad.limitend(pusname))
					hobby = body.slice(1)
					const hob =['Desah Di Game','Stalking sosmed','Kau kan gak punya hobby awokawok','Memasak','Nolep','Mabar','Nobar','Nobar hentong','Sosmedtan','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					lolhuman.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: lol })
					break
case 'cekbapak': 
                if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
				const bapak =['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs','Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda','Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v','Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Ramlan ID']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					lolhuman.sendMessage(from, cek, text, { quoted: lol})
					await limitAdd(sender)
					break
case 'add':
                  if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					if (!isBotGroupAdmins) return reply(`「 *BOT MUST BE AN ADMIN* 」\n_BOT HARUS JADI ADMIN_`)
					if (!isGroupAdmins) return reply(`「 *ONLY ADMIN GROUP*」`)
					if (args.length < 1) return reply(`Yang mau di add siapa? Contoh: ${prefix}add 628xxxxxx`)
					if (args[0].startsWith('08')) return reply('Gunakan kode bahasa kak')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						lolhuman.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('[❗] Gagal menambahkan target\nMungkin nomornya tidak terdaftar atau\nWa nya fi private')
					}
					break
case 'kick':
                  if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					if (!isGroupAdmins) return reply(`「 *ONLY ADMIN GROUP*」`)
					if (!isBotGroupAdmins) return reply(`「 *BOT MUST BE AN ADMIN* 」\n_BOT HARUS JADI ADMIN_`)
					if (lol.message.extendedTextMessage === undefined || lol.message.extendedTextMessage === null) return reply('*TAG TARGET YANG INGIN DI KICK!*')
					mentioned = lol.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teys = ''
						for (let _ of mentioned) {
							teys += `Asik dapat jatah kick niieehh🗿 :\n`
							teys += `@_.split('@')[0]`
						}
						mentions(teys, mentioned, true)
						lolhuman.groupRemove(from, mentioned)
					} else {
						mentions(`Asik dapat jatah kick nieeh, siap-siap yah @${mentioned[0].split('@')[0]}`, mentioned, true)
						lolhuman.groupRemove(from, mentioned)
					}
					break
case 'admin':
                  if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					if (!isGroupAdmins) return reply(`「 *ONLY ADMIN GROUP*」`)
					teus = `「 *LIST ADMIN GROUP* 」${groupMetadata.subject}\nTOTAL : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teus += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teus, groupAdmins, true)
					break
case 'group':
case 'grup':
                  if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					if (!isGroupAdmins) return reply(`「 *ONLY ADMIN GROUP*」`)
					if (!isBotGroupAdmins) return reply(`「 *BOT MUST BE AN ADMIN* 」\n_BOT HARUS JADI ADMIN_`)
					if (args[0] === 'buka') {
					    reply(`*successfully opened the group*\n_berhasil membuka grup_`)
						lolhuman.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`*successfully closed the group*\n_berhasil menutup grup_`)
						lolhuman.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
case 'promote':
                if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					if (!isBotGroupAdmins) return reply(`「 *BOT MUST BE AN ADMIN* 」\n_BOT HARUS JADI ADMIN_`)
					if (!isGroupAdmins) return reply(`「 *ONLY ADMIN GROUP*」`)
					if (lol.message.extendedTextMessage === undefined || lol.message.extendedTextMessage === null) return reply('*TAG TARGET YANG INGIN DI PROMOTE*')
					mentioned = lol.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						tems = ''
						for (let _ of mentioned) {
							tems += `Yeee🥳 Kamu naik jabatan >_< :\n`
							tems += `@_.split('@')[0]`
						}
						mentions(tems, mentioned, true)
						lolhuman.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`*Omedetou*🥳 @${mentioned[0].split('@')[0]} Kamu sekarang adalah admin grup`, mentioned, true)
						lolhuman.groupMakeAdmin(from, mentioned)
					}
					break
case 'demote':
                if (isBanned) return reply(`Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
					if (!isBotGroupAdmins) return reply(`「 *BOT MUST BE AN ADMIN* 」\n_BOT HARUS JADI ADMIN_`)
					if (!isGroupAdmins) return reply(`「 *ONLY ADMIN GROUP*」`)
					if (lol.message.extendedTextMessage === undefined || lol.message.extendedTextMessage === null) return reply('*TAG TARGET YANG INGIN DI DEMOTE*')
					mentioned = lol.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						tews = ''
						for (let _ of mentioned) {
							tews += `*jabatan kamu di copot*🏃 :\n`
							tews += `@_.split('@')[0]`
						}
						mentions(tews, mentioned, true)
						lolhuman.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`*Sekarang kamu adalah member!* @${mentioned[0].split('@')[0]} jangan nangis yah...`, mentioned, true)
						lolhuman.groupDemoteAdmin(from, mentioned)
					}
					break
case 'unblock':
                    lolhuman.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerb())
				    lolhuman.blockUser (`${body.slice(9)}@c.us`, "remove")
					lolhuman.sendMessage(from, `Perintah diterima, Membuka ${body.slice(9)}@c.us`, text)
					break
// Xteam Random Image
case 'cosplay':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
					anu = await fetchJson(`https://api.xteam.xyz/asupan/lasegar?APIKEY=${XteamKey}`, {method: 'get'})
					buffing = await getBuffer(anu.result.link)
					tekss = `Username : ${anu.result.username}\nDescription : ${anu.result.caption}\nLikes : ${anu.result.like}`
					lolhuman.sendMessage(from, buffing, image, { quoted: lol, caption: tekss})
					break
case 'kpopgirls':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/blackpink?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol, caption: 'PLASTIQUE'})
					break
case 'kpopboys':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/bts?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol, caption: 'PLASTIQUE'})
					break
case 'kpopboys2':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/exo?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol, caption: 'PLASTIQUE'})
					break	
case 'meme':
case 'nsfwneko':
case 'sfwneko':
case 'ass':
case 'bdsm':
case 'cuckold':
case 'glasses':
case 'jahy':
case 'mstrb':
case 'orgy':
case 'panties':
case 'tentacles':
case 'thighs':
case 'uniform':
case 'zettairyouiki':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/${command}?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ] JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'paha':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/ass?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ] JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'hentaigif':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `https://api.xteam.xyz/randomimage/hentaigif?APIKEY=${XteamKey}`
                    exec(`wget "${ini_buffer}" -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                        lolhuman.sendMessage(from, buff, sticker, { quoted: lol })
                        fs.unlinkSync(rano)
                    })
					break
case 'husbu2':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/husbu?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'waifu2':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/anime/waifu?APIKEY=${KhaelSan21}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'ahegao2':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/ahegao?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'doujin':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/manga?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'pussy2':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/pussy?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'blowjob2':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/blowjob?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break	
case 'ero2':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/ero?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break	
case 'megane':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/glasses?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'pantsu':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/panties?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'hentai2':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/hentai?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break	
case 'wpdesktop':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/wallpaper?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'wpmobile':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/wpmobile?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
case 'wpnsfw':
if (!isPrem) return reply(`*[❗] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`https://api.xteam.xyz/randomimage/wpnsfwmobile?APIKEY=${XteamKey}`, {method: 'get'})
					reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
					lolhuman.sendMessage(from, anu, image, { quoted: lol})
					break
// Xteam Edukasi Api
case 'chord':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.xteam.xyz/chord?lagu=${query}&APIKEY=${XteamKey}`)
                    reply(get_result.result)
                    break
case 'brainly2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.xteam.xyz/brainly?soal=${query}&APIKEY=${XteamKey}`)
                    reply(get_result.jawaban)
                    break  
case 'wikipedia2':
case 'wiki2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Tahu`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.xteam.xyz/wiki?q=${query}&APIKEY=${XteamKey}`)
                    get_result = get_result.result
                    reply(get_result)
                    break 
//Xteam Tools Menu
case 'removebg':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://id.pinterest.com/pin/696580267364426905/`)
                    ini_url = args[0]
                    ini_url = await getBuffer(`https://api.xteam.xyz/removebg?url=${ini_url}&APIKEY=${XteamKey}`)
                    await lolhuman.sendMessage(from, ini_url, image, { quoted: lol })
                    break
case 'attp':
			if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
				attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
				lolhuman.sendMessage(from, attp2, sticker, {quoted: lol })
				break
case 'ttp5':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    ini_buffer = await getBuffer(`https://api.xteam.xyz/ttp?file&text=${body.slice(7)}`)
                    lolhuman.sendMessage(from, ini_buffer, sticker, { quoted: lol })
                    break
//Docs Jojo Api
case 'waifu3':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await fetchJson(`http://docs-jojo.herokuapp.com/api/waifu2`, {method: 'get'})
					data = await getBuffer(anu.img)
					lolhuman.sendMessage(from, data, image, { quoted: lol})
					break
case 'waifu4':
         if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
         anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/waifu`)
         buffering = await getBuffer(anu.image)
         teksss = `Name : ${anu.name}\nDescription : ${anu.desc}\nSource : ${anu.source}`
         await lolhuman.sendMessage(from, buffering, image, { quoted: lol, caption: teksss})
         break
case 'husbu3':
         if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
         anu = await fetchJson(`http://docs-jojo.herokuapp.com/api/husbuando`)
         buffering = await getBuffer(anu.image)
         teksss = `Name : ${anu.waifu}`
         await lolhuman.sendMessage(from, buffering, image, { quoted: lol, caption: teksss})
         break
case 'loli2':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`http://docs-jojo.herokuapp.com/api/randomloli`, {method: 'get'})
					lolhuman.sendMessage(from, anu, image, { quoted: lol, caption: 'hallo om pedo'})
					break
case 'baguette':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await getBuffer(`http://docs-jojo.herokuapp.com/api/random_baguette`, {method: 'get'})
					lolhuman.sendMessage(from, anu, image, { quoted: lol })
					break
case 'wikipedia3':
case 'wiki3':
if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Tahu`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://docs-jojo.herokuapp.com/api/wiki?q=${query}`)
                    get_result = get_result.result
                    reply(get_result)
                    break 
case 'nekonime':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					anu = await fetchJson(`http://docs-jojo.herokuapp.com/api/nekonime`)
					nekok = await getBuffer(anu.result)
					lolhuman.sendMessage(from, nekok, image, { quoted: lol})
					break
case 'chord2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://docs-jojo.herokuapp.com/api/chord?q=${query}`)
                    reply(get_result.result)
                    break
case 'renungan':
         if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
         anu = await fetchJson(`http://docs-jojo.herokuapp.com/api/renungan`)
         teksss = `Judul : *${anu.judul}*\n${anu.Isi}\nPesan : ${anu.pesan}`
         reply(teksss)
         break
case 'cariayat':
         if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
         if (args.length == 0) return reply(`Contoh: ${prefix + command} Matius 20:5`)
         query = args.join(" ")
         data = await fetchJson(`http://docs-jojo.herokuapp.com/api/alkitabsearch?q=${query}`)
         teks = '────────────────────\n\n'
				for (let i of data.result) {
					teks += `*${i.ayat}\n${i.isi}\n\nLink : ${i.link}\n\n────────────────────\n`
				}
				reply(teks.trim())
         break
case 'alkitabsong':
         if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
         if (args.length == 0) return reply(`Contoh: ${prefix + command} I Have Decided`)
         query = args.join(" ")
         anu = await fetchJson(`http://docs-jojo.herokuapp.com/api/alkitab_songs?q=${query}`)
         buffering = await getBuffer(anu.result.audio)
         teksss = `Judul : ${anu.result.judul}\nNada Dasar : ${anu.result.nada_dasar}\nLirik : ${anu.result.lirik}`
         reply(teksss)
         lolhuman.sendMessage(from, buffering, audio, {mimetype: 'audio/mp4', quoted: lol})
         break
case 'play2':
case 'p2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                anu = await fetchJson(`http://docs-jojo.herokuapp.com/api/yt-play?q={body.slice(7)}`)
                if (anu.error) return reply(anu.error)
     infomp3 = `*Lagu Ditemukan*\n→ Judul : ${anu.title}\n→ Size : ${anu.filesize}\n→ Link Donwload : ${anu.link}\n\n*[❗] Loading*`
     bumfer = await getBuffer(anu.thumb)
     lamgu = await getBuffer(anu.link)
     lolhuman.sendMessage(from, bumfer, image, {quoted: lol, caption: infomp3})
     lolhuman.sendMessage(from, lamgu, audio, {mimetype: 'audio/mp4', quoted: lol})
                break
case 'gaminglogo':
case 'logogaming':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://docs-jojo.herokuapp.com/api/gaming?text=${ini_txt}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
//LoL-Human api
                case 'help':
                case 'menu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *Ogiwara Sayu* "
                    var ini_buffer = await getBuffer("http://static.sticker.ly/sticker_pack/C16jxyLFh5l3cI7aZR9EGg/GUJ6GY/2/8b3fe490-fc06-463b-8e3d-fd6ce25dba84.png")
                    uptime = process.uptime()
                    const ini_csreply = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text,
                                    jpegThumbnail: ini_buffer
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, help(prefix), text, ini_csreply)
                    break
case 'rohanimenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *ROHANI MENU* "
                    const ini_croha = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, rohani(prefix), text, ini_croha)
                    break
case 'islamimenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *ISLAMI MENU* "
                    const ini_csreplyy = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, islami(prefix), text, ini_csreplyy)
                    break
case 'downloadmenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *DOWNLOAD MENU* "
                    const ini_csreplyyy = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, downloader(prefix), text, ini_csreplyyy)
                    break
case 'movstomenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *MOVIE & STORY* "
                    const ini_csreplyyyy = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, movsto(prefix), text, ini_csreplyyyy)
                    break
case 'searchmenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *SEARCHING MENU* "
                    const ini_csyy = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, searching(prefix), text, ini_csyy)
                    break
case 'rantextmenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *RANDOM TEXT* "
                    const ini_csyyy = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, rantext(prefix), text, ini_csyyy)
                    break
case 'animangamenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *Ogiwara Sayu* "
                    var ini_buffer = await getBuffer("https://i.ibb.co/pJQv1wK/20210406-193737.png")
                    const ini_csyyyy = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text,
                                    jpegThumbnail: ini_buffer
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, animanga(prefix), text, ini_csyyyy)
                    break
case 'infomenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *INFORMATION MENU* "
                    const ini_cree = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, infoo(prefix), text, ini_cree)
                    break
case 'hiburanmenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *HIBURAN MENU* "
                    const ini_creee = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, hiburr(prefix), text, ini_creee)
                    break
case 'makermenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *MAKER MENU* "
                    const ini_creeee = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, makerr(prefix), text, ini_creeee)
                    break
case 'toolsmenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " Tools Menu "
                    const ini_crss = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, tools(prefix), text, ini_crss)
                    break
case 'wibumenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " Ogiwara Sayu "
                    var ini_buffer = await getBuffer("https://i.ibb.co/pJQv1wK/20210406-193737.png")
                    const ini_crsss = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text,
                                    jpegThumbnail: ini_buffer
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, wibuh(prefix), text, ini_crsss)
                    break
case 'nsfwmenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " Sange bang? "
                    var ini_buffer = await getBuffer("https://i.ibb.co/pJQv1wK/20210406-193737.png")
                    const ini_crpl = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text,
                                    jpegThumbnail: ini_buffer
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, nsfww(prefix), text, ini_crpl)
                    break
case 'asupanmenu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *RANDOM IMAGE* "
                    const ini_crggg = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, ranimage(prefix), text, ini_crggg)
                    break
case 'hargaprem':
if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
reply(`[ *Harga Premium: 15k/bln* ]\n\n_untuk info lebih lanjut hubungi owner bot_`)
break
case 'premiumlist':
lolhuman.updatePresence(from, Presence.composing) 
if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
					iyaa = ` *JUMLAH USER PREMIUM* \n`
					no = 0
					for (let prem of premium) {
						no += 1
						iyaa += `❏-${no.toString()}- @${prem.split('@')[0]}\n`
					}
					iyaa += `❏ Jumlah User Premium : ${premium.length}\n\n\n「 *Sayu Bot* 」`
					lolhuman.sendMessage(from, iyaa.trim(), extendedText, {quoted: lol, contextInfo: {"mentionedJid": premium}})
					break
case 'rules':
lolhuman.updatePresence(from, Presence.composing) 
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *RULES BOT SAYU* "
                    const ini_crvl = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, rules(prefix), text, ini_crvl)
break
case 'info':
					me = lolhuman.user
					uptime = process.uptime()
					const tecs = `*➸ Nama bot* : ${me.name}\n*OWNER* : KhaelSan\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*➸ The bot is active on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					lolhuman.sendMessage(from, buffer, image, { quoted: lol, caption: tecs })
					break
case 'ping':
                const timestamp = speed();
                const latensi = speed() - timestamp 
                lolhuman.updatePresence(from, Presence.composing) 
                lolhuman.sendMessage(from, `Speed: ${latensi.toFixed(4)} ms`, text, { quoted: lol })
                break
case 'donate':
case 'donasi':
                lolhuman.updatePresence(from, Presence.composing) 
                    var punya_wa = "0@s.whatsapp.net"
                    var ini_text = " *DONATE FOR ME* "
                    const ini_crmvl = {
                        contextInfo: {
                            stanzaId: 'B826873620DD5947E683E3ABE663F263',
                            participant: punya_wa,
                            remoteJid: 'status@broadcast',
                            quotedMessage: {
                                imageMessage: {
                                    caption: ini_text
                                }
                            }
                        }
                    }
                    lolhuman.sendMessage(from, donate(prefix), text, ini_crmvl)
                    break
case 'gcsayubot':
lolhuman.updatePresence(from, Presence.composing)
reply('*https://chat.whatsapp.com/JHXqfiDVmoS6QQxIaIi9Tt*\n\n_jangan ngerusuh di gc orang sat_')
break
case 'runtime':
lolhuman.updatePresence(from, Presence.composing) 
if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
			uptime = process.uptime()
			run = `[  *RUNTIME BOT*  ]\n${kyun(uptime)}`
			lolhuman.sendMessage(from, run, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `RUNTIME BOT` }}})
			break
case 'delete':
					case 'del':
					case 'd':
					if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
					lolhuman.deleteMessage(from, { id: lol.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
                case 'clearall':
                    if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
if (!isOwner) return reply(`[] Only Owner bot`)
                    list_chat = await lolhuman.chats.all()
                    for (let chat of list_chat) {
                        lolhuman.modifyChat(chat.jid, "delete")
                    }
                    reply("success clear all chat")
                    break
                case 'hidetag':
                    if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (!isPrem) return reply(`[ ! ] Only Premium\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
                    var value = args.join(" ")
                    var group = await lolhuman.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        text: value,
                        contextInfo: { mentionedJid: mem },
                        quoted: lol
                    }
                    lolhuman.sendMessage(from, options, text)
                    break
                case 'tagstick':
                    if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
if (!isPrem) return reply(`[ ! ] Only Premium\n\n_ingin membeli premium? hubungi owner saya_`)
if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedSticker) && args.length == 0) {
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                        var value = args.join(" ")
                        var group = await lolhuman.groupMetadata(from)
                        var member = group['participants']
                        var mem = []
                        member.map(async adm => {
                            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                        })
                        var options = {
                            contextInfo: { mentionedJid: mem },
                            quoted: lol
                        }
                        ini_buffer = fs.readFileSync(filePath)
                        lolhuman.sendMessage(from, ini_buffer, sticker, options)
                        fs.unlinkSync(filePath)
                    } else {
                        reply(`Tag sticker yang sudah dikirim`)
                    }
                    break
case 'tagimg':
case 'tagimage':
                    if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
if (!isPrem) return reply(`[ ! ] Only Premium\n\n_ingin membeli premium? hubungi owner saya_`)
if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                        var value = args.join(" ")
                        var group = await lolhuman.groupMetadata(from)
                        var member = group['participants']
                        var mem = []
                        member.map(async adm => {
                            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                        })
                        var options = {
                            contextInfo: { mentionedJid: mem },
                            quoted: lol
                        }
                        ini_buffer = fs.readFileSync(filePath)
                        lolhuman.sendMessage(from, ini_buffer, image, options)
                        fs.unlinkSync(filePath)
                    } else {
                        reply(`Tag gambar yang sudah dikirim`)
                    }
                    break
case 'tagvideo':
case 'tagvid':
                    if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (!isPrem) return reply(`[ ! ] Only Premium\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedVideo) && args.length == 0) {
                        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                        var value = args.join(" ")
                        var group = await lolhuman.groupMetadata(from)
                        var member = group['participants']
                        var mem = []
                        member.map(async adm => {
                            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                        })
                        var options = {
                            contextInfo: { mentionedJid: mem },
                            quoted: lol
                        }
                        ini_buffer = fs.readFileSync(filePath)
                        lolhuman.sendMessage(from, ini_buffer, video, options)
                        fs.unlinkSync(filePath)
                    } else {
                        reply(`Tag gambar yang sudah dikirim`)
                    }
                    break
case 'tagaudio':
case 'tagaud':
                    if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (!isPrem) return reply(`[ ! ] Only Premium\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedAudio) && args.length == 0) {
                        const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                        var value = args.join(" ")
                        var group = await lolhuman.groupMetadata(from)
                        var member = group['participants']
                        var mem = []
                        member.map(async adm => {
                            mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                        })
                        var options = {
                            contextInfo: { mentionedJid: mem },
                            quoted: lol
                        }
                        ini_buffer = fs.readFileSync(filePath)
                        lolhuman.sendMessage(from, ini_buffer, audio, options)
                        fs.unlinkSync(filePath)
                    } else {
                        reply(`Tag gambar yang sudah dikirim`)
                    }
                    break
                case 'broadcast':
                    if (!isOwner) return reply(`[] Only Owner bot`)
                    list_chat = await lolhuman.chats.all()
                    ini_text = args.join(" ")
                    for (let chat of list_chat) {
                        sendMess(chat.jid, ini_text)
                    }
                    break

                    // Islami //
                case 'listsurah':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/quran?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = 'List Surah:\n'
                    for (var x in get_result) {
                        ini_txt += `${x}. ${get_result[x]}\n`
                    }
                    reply(ini_txt)
                    break
                case 'alquran':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length < 1) return reply(`Contoh: ${prefix + command} 18 or ${prefix + command} 18/10 or ${prefix + command} 18/1-10`)
                    urls = `http://api.lolhuman.xyz/api/quran/${args[0]}?apikey=${apikey}`
                    quran = await fetchJson(urls)
                    result = quran.result
                    ayat = result.ayat
                    ini_txt = `QS. ${result.surah} : 1-${ayat.length}\n\n`
                    for (var x of ayat) {
                        arab = x.arab
                        nomor = x.ayat
                        latin = x.latin
                        indo = x.indonesia
                        ini_txt += `${arab}\n${nomor}. ${latin}\n${indo}\n\n`
                    }
                    ini_txt = ini_txt.replace(/<u>/g, "").replace(/<\/u>/g, "")
                    ini_txt = ini_txt.replace(/<strong>/g, "").replace(/<\/strong>/g, "")
                    ini_txt = ini_txt.replace(/<u>/g, "").replace(/<\/u>/g, "")
                    reply(ini_txt)
                    break
                case 'alquranaudio':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 18 or ${prefix + command} 18/10`)
                    surah = args[0]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/quran/audio/${surah}?apikey=${apikey}`)
                    lolhuman.sendMessage(from, ini_buffer, audio, { quoted: lol, mimetype: Mimetype.mp4Audio })
                    break
                case 'asmaulhusna':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/asmaulhusna?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `No : ${get_result.index}\n`
                    ini_txt += `Latin: ${get_result.latin}\n`
                    ini_txt += `Arab : ${get_result.ar}\n`
                    ini_txt += `Indonesia : ${get_result.id}\n`
                    ini_txt += `English : ${get_result.en}`
                    reply(ini_txt)
                    break
                case 'kisahnabi':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Muhammad`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kisahnabi/${query}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Name : ${get_result.name}\n`
                    ini_txt += `Lahir : ${get_result.thn_kelahiran}\n`
                    ini_txt += `Umur : ${get_result.age}\n`
                    ini_txt += `Tempat : ${get_result.place}\n`
                    ini_txt += `Story : \n${get_result.story}`
                    reply(ini_txt)
                    break
                case 'jadwalsholat':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Yogyakarta`)
                    daerah = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/sholat/${daerah}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Wilayah : ${get_result.wilayah}\n`
                    ini_txt += `Tanggal : ${get_result.tanggal}\n`
                    ini_txt += `Sahur : ${get_result.sahur}\n`
                    ini_txt += `Imsak : ${get_result.imsak}\n`
                    ini_txt += `Subuh : ${get_result.subuh}\n`
                    ini_txt += `Terbit : ${get_result.terbit}\n`
                    ini_txt += `Dhuha : ${get_result.dhuha}\n`
                    ini_txt += `Dzuhur : ${get_result.dzuhur}\n`
                    ini_txt += `Ashar : ${get_result.ashar}\n`
                    ini_txt += `Maghrib : ${get_result.imsak}\n`
                    ini_txt += `Isya : ${get_result.isya}`
                    reply(ini_txt)
                    break

                    // Downloader //
                case 'play':
                case 'p':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                anu = await fetchJson(`https://api.xteam.xyz/dl/play?lagu=${body.slice(6)}&APIKEY=${XteamKey}`)
                if (anu.error) return reply(anu.error)
     infomp3 = `*Lagu Ditemukan*\n Judul : ${anu.judul}\n Size : ${anu.size}\n Link Donwload : ${anu.url}\n\n*[WAIT] Proses Dulu, Jangan Spam*`
     bumfer = await getBuffer(anu.thumbnail)
     lamgu = await getBuffer(anu.url)
     lolhuman.sendMessage(from, bumfer, image, {quoted: lol, caption: infomp3})
     lolhuman.sendMessage(from, lamgu, audio, {mimetype: 'audio/mp4', quoted: lol})
                break
                case 'ytsearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Views : ${x.views}\n`
                        ini_txt += `Published : ${x.published}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n`
                        ini_txt += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`
                    }
                    reply(ini_txt)
                    break
                    break
                case 'ytmp3':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
     anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/?url=${body.slice(7)}&apikey=apivinz`)
     if (anu.error) return reply(anu.error)
     ingfomp3 = `*[❗]Lagu Ditemukan[*\n Judul : ${anu.result.title}\n Size : ${anu.result.size}\n\n*[WAIT] Proses Dumlu Yakan*`
     buffer = await getBuffer(anu.result.thumbnail)
     lagu = await getBuffer(anu.result.url_audio)
     lolhuman.sendMessage(from, buffer, image, {quoted: lol, caption: ingfomp3})
     lolhuman.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', quoted: lol})
                break
                case 'ytmp4':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytvideo?apikey=${apikey}&url=${ini_link}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Uploader : ${get_result.uploader}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `View : ${get_result.view}\n`
                    ini_txt += `Like : ${get_result.like}\n`
                    ini_txt += `Dislike : ${get_result.dislike}\n`
                    ini_txt += `Description :\n ${get_result.description}`
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol, caption: ini_txt })
                    get_audio = await getBuffer(get_result.link[0].link)
                    lolhuman.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'ytmp42':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytvideo2?apikey=${apikey}&url=${ini_link}`)
                    get_result = get_result.result
                    ini_txt = `${get_result.title} - ${get_result.size}`
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol, caption: ini_txt })
                    get_audio = await getBuffer(get_result.link)
                    lolhuman.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'telesticker':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/telestick?apikey=${apikey}&url=${ini_url}`)
                    ini_sticker = ini_url.result.sticker
                    for (sticker_ in ini_sticker) {
                        ini_buffer = await getBuffer(ini_sticker[sticker_])
                        lolhuman.sendMessage(from, ini_buffer, sticker)
                    }
                    break
                case 'tiktoknowm':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
                    ini_url = args[0]
                    ini_url = `http://api.lolhuman.xyz/api/tiktok?apikey=${apikey}&url=${ini_url}`
                    get_result = await fetchJson(ini_url)
                    ini_buffer = await getBuffer(get_result.result.link)
                    lolhuman.sendMessage(from, ini_buffer, video, { quoted: lol })
                    break
case 'tiktoknowm2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
                    ini_url = args[0]
                    ini_url = `https://api.xteam.xyz/dl/tiktok?url=${ini_url}&APIKEY=${XteamKey}`
                    get_result = await fetchJson(ini_url)
                    ini_buffer = await getBuffer(get_result.server_1)
                    lolhuman.sendMessage(from, ini_buffer, video, { mimetype: 'video/mp4', quoted: lol })
                    break
case 'tiktoknowm3':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
                    ini_url = args[0]
                    ini_url = `http://api.lolhuman.xyz/api/tiktok2?apikey=${apikey}&url=${ini_url}`
                    get_result = await fetchJson(ini_url)
                    ini_buffer = await getBuffer(get_result.result)
                    lolhuman.sendMessage(from, ini_buffer, video, { quoted: lol })
                    break
                case 'tiktokmusic':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
                    ini_link = args[0]
                    get_audio = await getBuffer(`http://api.lolhuman.xyz/api/tiktokmusic?apikey=${apikey}&url=${ini_link}`)
                    lolhuman.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'spotify':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`)
                    url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/spotify?apikey=${apikey}&url=${url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Artists : ${get_result.artists}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Popularity : ${get_result.popularity}\n`
                    ini_txt += `Preview : ${get_result.preview_url}\n`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    get_audio = await getBuffer(get_result.preview_url)
                    lolhuman.sendMessage(from, get_audio, MessageType.audio, { mimetype: 'audio/mp4', filename: `${get_result.title}.mp3`, quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'spotifysearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/spotifysearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Artists : ${x.artists}\n`
                        ini_txt += `Duration : ${x.duration}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Link Donwload : ${x.preview_url}\n\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'jooxplay':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jooxplay?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.info.song}\n`
                    ini_txt += `Artists : ${get_result.info.singer}\n`
                    ini_txt += `Duration : ${get_result.info.duration}\n`
                    ini_txt += `Album : ${get_result.info.album}\n`
                    ini_txt += `Uploaded : ${get_result.info.date}\n`
                    ini_txt += `Lirik :\n ${get_result.lirik}\n`
                    thumbnail = await getBuffer(get_result.image)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    get_audio = await getBuffer(get_result.audio[0].link)
                    lolhuman.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.info.song}.mp3`, quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'igdl':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/instagram?apikey=${apikey}&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_type = image
                    if (ini_url.includes(".mp4")) ini_type = video
                    ini_buffer = await getBuffer(ini_url)
                    lolhuman.sendMessage(from, ini_buffer, ini_type, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'twtdl':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/twitter?apikey=${apikey}&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_url = ini_url[ini_url.length - 1].link
                    ini_buffer = await getBuffer(ini_url)
                    lolhuman.sendMessage(from, ini_buffer, video, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'fbdl':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/facebook?apikey=${apikey}&url=${ini_url}`)
                    ini_url = ini_url.result[0].link
                    ini_buffer = await getBuffer(ini_url)
                    lolhuman.sendMessage(from, ini_buffer, video, { quoted: lol })
                    break
case 'fbdl2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/facebook2?apikey=${apikey}&url=${ini_url}`)
                    ini_url = ini_url.result[0].link
                    ini_buffer = await getBuffer(ini_url.result)
                    lolhuman.sendMessage(from, ini_buffer, video, { quoted: lol })
                    break
                case 'zippyshare':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://www51.zippyshare.com/v/5W0TOBz1/file.html`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/zippyshare?apikey=${apikey}&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_txt = `File Name : ${ini_url.name_file}\n`
                    ini_txt += `Size : ${ini_url.size}\n`
                    ini_txt += `Date Upload : ${ini_url.date_upload}\n`
                    ini_txt += `Download Url : ${ini_url.download_url}`
                    reply(ini_txt)
                    break
                case 'pinterest':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/pinterest?apikey=${apikey}&query=${query}`)
                    ini_url = ini_url.result
                    ini_buffer = await getBuffer(ini_url)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'pinterestdl':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://id.pinterest.com/pin/696580267364426905/`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`https://api.xteam.xyz/dl/pinterestdl?url=${ini_url}&APIKEY=${XteamKey}`, {method: 'get'})
                    ini_buffer = await getBuffer(ini_url.result.hd_img)
                    await lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'pixiv':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/pixiv?apikey=${apikey}&query=${query}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'pixivdl':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 63456028`)
                    pixivid = args[0]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/pixivdl/${pixivid}?apikey=${apikey}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'xhamstersearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Japanese`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xhamstersearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Views : ${x.views}\n`
                        ini_txt += `Duration : ${x.duration}\n`
                        ini_txt += `Link : ${x.link}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'xhamster':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://xhamster.com/videos/party-with-friends-end-in-awesome-fucking-5798407`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xhamster?apikey=${apikey}&url=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Uploader : ${get_result.author}\n`
                    ini_txt += `Upload : ${get_result.upload}\n`
                    ini_txt += `View : ${get_result.views}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Like : ${get_result.likes}\n`
                    ini_txt += `Dislike : ${get_result.dislikes}\n`
                    ini_txt += `Comment : ${get_result.comments}\n`
                    ini_txt += "Link : \n"
                    link = get_result.link
                    for (var x of link) {
                        ini_txt += `${x.type} - ${x.link}\n\n`
                    }
                    thumbnail = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    break
                case 'xnxxsearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Japanese`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxxsearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Views : ${x.views}\n`
                        ini_txt += `Duration : ${x.duration}\n`
                        ini_txt += `Uploader : ${x.uploader}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'xnxx':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://www.xnxx.com/video-uy5a73b/mom_is_horny_-_brooklyn`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/xnxx?apikey=${apikey}&url=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `View : ${get_result.view}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Like : ${get_result.like}\n`
                    ini_txt += `Dislike : ${get_result.dislike}\n`
                    ini_txt += `Comment : ${get_result.comment}\n`
                    ini_txt += `Tag : ${get_result.tag.join(", ")}\n`
                    ini_txt += `Description : ${get_result.description}\n`
                    ini_txt += "Link : \n"
                    ini_link = get_result.link
                    for (var x of ini_link) {
                        ini_txt += `${x.type} - ${x.link}\n\n`
                    }
                    thumbnail = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break

                    // AniManga //
                case 'character':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Miku Nakano`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/character?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Id : ${get_result.id}\n`
                    ini_txt += `Name : ${get_result.name.full}\n`
                    ini_txt += `Native : ${get_result.name.native}\n`
                    ini_txt += `Favorites : ${get_result.favourites}\n`
                    ini_txt += `Media : \n`
                    ini_media = get_result.media.nodes
                    for (var x of ini_media) {
                        ini_txt += `- ${x.title.romaji} (${x.title.native})\n`
                    }
                    ini_txt += `\nDescription : \n${get_result.description.replace(/__/g, "_")}`
                    thumbnail = await getBuffer(get_result.image.large)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    break
                case 'manga':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/manga?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Id : ${get_result.id}\n`
                    ini_txt += `Id MAL : ${get_result.idMal}\n`
                    ini_txt += `Title : ${get_result.title.romaji}\n`
                    ini_txt += `English : ${get_result.title.english}\n`
                    ini_txt += `Native : ${get_result.title.native}\n`
                    ini_txt += `Format : ${get_result.format}\n`
                    ini_txt += `Chapters : ${get_result.chapters}\n`
                    ini_txt += `Volume : ${get_result.volumes}\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Source : ${get_result.source}\n`
                    ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
                    ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
                    ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
                    ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
                    ini_txt += `Score : ${get_result.averageScore}%\n`
                    ini_txt += `Characters : \n`
                    ini_character = get_result.characters.nodes
                    for (var x of ini_character) {
                        ini_txt += `- ${x.name.full} (${x.name.native})\n`
                    }
                    ini_txt += `\nDescription : ${get_result.description}`
                    thumbnail = await getBuffer(get_result.coverImage.large)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    break
                case 'anime':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/anime?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Id : ${get_result.id}\n`
                    ini_txt += `Id MAL : ${get_result.idMal}\n`
                    ini_txt += `Title : ${get_result.title.romaji}\n`
                    ini_txt += `English : ${get_result.title.english}\n`
                    ini_txt += `Native : ${get_result.title.native}\n`
                    ini_txt += `Format : ${get_result.format}\n`
                    ini_txt += `Episodes : ${get_result.episodes}\n`
                    ini_txt += `Duration : ${get_result.duration} mins.\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Season : ${get_result.season}\n`
                    ini_txt += `Season Year : ${get_result.seasonYear}\n`
                    ini_txt += `Source : ${get_result.source}\n`
                    ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
                    ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
                    ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
                    ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
                    ini_txt += `Score : ${get_result.averageScore}%\n`
                    ini_txt += `Characters : \n`
                    ini_character = get_result.characters.nodes
                    for (var x of ini_character) {
                        ini_txt += `- ${x.name.full} (${x.name.native})\n`
                    }
                    ini_txt += `\nDescription : ${get_result.description}`
                    thumbnail = await getBuffer(get_result.coverImage.large)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    break
                case 'wait':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        const filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        const form = new FormData();
                        const stats = fs.statSync(filePath);
                        const fileSizeInBytes = stats.size;
                        const fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        const options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/wait?apikey=${apikey}`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        ini_video = await getBuffer(get_result.video)
                        ini_txt = `Anilist id : ${get_result.anilist_id}\n`
                        ini_txt += `MAL id : ${get_result.mal_id}\n`
                        ini_txt += `Title Romaji : ${get_result.title_romaji}\n`
                        ini_txt += `Title Native : ${get_result.title_native}\n`
                        ini_txt += `Title English : ${get_result.title_english}\n`
                        ini_txt += `at : ${get_result.at}\n`
                        ini_txt += `Episode : ${get_result.episode}\n`
                        ini_txt += `Similarity : ${get_result.similarity}`
                        lolhuman.sendMessage(from, ini_video, video, { quoted: lol, caption: ini_txt })
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'kusonime':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonime?apikey=${apikey}&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Seasons : ${get_result.seasons}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Total Episode : ${get_result.total_episode}\n`
                    ini_txt += `Score : ${get_result.score}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Released On : ${get_result.released_on}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    link_dl = get_result.link_dl
                    for (var x in link_dl) {
                        ini_txt += `\n${x}\n`
                        for (var y in link_dl[x]) {
                            ini_txt += `${y} - ${link_dl[x][y]}\n`
                        }
                    }
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol, caption: ini_txt })
                    break
                case 'kusonimesearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonimesearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Seasons : ${get_result.seasons}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Status : ${get_result.status}\n`
                    ini_txt += `Total Episode : ${get_result.total_episode}\n`
                    ini_txt += `Score : ${get_result.score}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Released On : ${get_result.released_on}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    link_dl = get_result.link_dl
                    for (var x in link_dl) {
                        ini_txt += `\n${x}\n`
                        for (var y in link_dl[x]) {
                            ini_txt += `${y} - ${link_dl[x][y]}\n`
                        }
                    }
                    ini_buffer = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol, caption: ini_txt })
                    break
                case 'otakudesu':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://otakudesu.tv/lengkap/pslcns-sub-indo/`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesu?apikey=${apikey}&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Judul : ${get_result.judul}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Episode : ${get_result.episodes}\n`
                    ini_txt += `Aired : ${get_result.aired}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Genre : ${get_result.genres}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Studios : ${get_result.status}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Credit : ${get_result.credit}\n`
                    get_link = get_result.link_dl
                    for (var x in get_link) {
                        ini_txt += `\n\n*${get_link[x].title}*\n`
                        for (var y in get_link[x].link_dl) {
                            ini_info = get_link[x].link_dl[y]
                            ini_txt += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                            ini_txt += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                            ini_txt += `\`\`\`Link : \`\`\`\n`
                            down_link = ini_info.link_dl
                            for (var z in down_link) {
                                ini_txt += `${z} - ${down_link[z]}\n`
                            }
                        }
                    }
                    reply(ini_txt)
                    break
                case 'otakudesusearch':
case 'odsearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesusearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Japanese : ${get_result.japanese}\n`
                    ini_txt += `Judul : ${get_result.judul}\n`
                    ini_txt += `Type : ${get_result.type}\n`
                    ini_txt += `Episode : ${get_result.episodes}\n`
                    ini_txt += `Aired : ${get_result.aired}\n`
                    ini_txt += `Producers : ${get_result.producers}\n`
                    ini_txt += `Genre : ${get_result.genres}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Studios : ${get_result.status}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Credit : ${get_result.credit}\n`
                    get_link = get_result.link_dl
                    for (var x in get_link) {
                        ini_txt += `\n\n*${get_link[x].title}*\n`
                        for (var y in get_link[x].link_dl) {
                            ini_info = get_link[x].link_dl[y]
                            ini_txt += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                            ini_txt += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                            ini_txt += `\`\`\`Link : \`\`\`\n`
                            down_link = ini_info.link_dl
                            for (var z in down_link) {
                                ini_txt += `${z} - ${down_link[z]}\n`
                            }
                        }
                    }
                    reply(ini_txt)
                    break
                case 'nhentai':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 344253`)
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentai/${henid}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Title Romaji : ${get_result.title_romaji}\n`
                    ini_txt += `Title Native : ${get_result.title_native}\n`
                    ini_txt += `Read Online : ${get_result.read}\n`
                    get_info = get_result.info
                    ini_txt += `Parodies : ${get_info.parodies}\n`
                    ini_txt += `Character : ${get_info.characters.join(", ")}\n`
                    ini_txt += `Tags : ${get_info.tags.join(", ")}\n`
                    ini_txt += `Artist : ${get_info.artists}\n`
                    ini_txt += `Group : ${get_info.groups}\n`
                    ini_txt += `Languager : ${get_info.languages.join(", ")}\n`
                    ini_txt += `Categories : ${get_info.categories}\n`
                    ini_txt += `Pages : ${get_info.pages}\n`
                    ini_txt += `Uploaded : ${get_info.uploaded}\n`
                    reply(ini_txt)
                    break
                case 'nhentaipdf':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 344253`)
                    henid = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaipdf/${henid}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_buffer = await getBuffer(get_result)
                    lolhuman.sendMessage(from, ini_buffer, document, { quoted: lol, mimetype: Mimetype.pdf, filename: `${henid}.pdf` })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'nhentaisearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Gotoubun No Hanayome`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nhentaisearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = "Result : \n"
                    for (var x of get_result) {
                        ini_txt += `Id : ${x.id}\n`
                        ini_txt += `Title English : ${x.title_english}\n`
                        ini_txt += `Title Japanese : ${x.title_japanese}\n`
                        ini_txt += `Native : ${x.title_native}\n`
                        ini_txt += `Upload : ${x.date_upload}\n`
                        ini_txt += `Page : ${x.page}\n`
                        ini_txt += `Favourite : ${x.favourite}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'nekopoi':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://nekopoi.care/isekai-harem-monogatari-episode-4-subtitle-indonesia/`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nekopoi?apikey=${apikey}&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.anime}\n`
                    ini_txt += `Porducers : ${get_result.producers}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Size : ${get_result.size}\n`
                    ini_txt += `Sinopsis : ${get_result.sinopsis}\n`
                    link = get_result.link
                    for (var x in link) {
                        ini_txt += `\n${link[x].name}\n`
                        link_dl = link[x].link
                        for (var y in link_dl) {
                            ini_txt += `${y} - ${link_dl[y]}\n`
                        }
                    }
                    ini_buffer = await getBuffer(get_result.thumb)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol, caption: ini_txt })
                    break
                case 'nekopoisearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Isekai Harem`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/nekopoisearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n\n`
                    }
                    reply(ini_txt)
                    break

                    // Information //
                case 'heroml':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Fanny`)
                    hero = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/heroml/${hero}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Name : ${get_result.hero_name}\n`
                    ini_txt += `Entrance Quotes : ${get_result.ent_quotes}\n`
                    ini_txt += `Role : ${get_result.detail.role}\n`
                    ini_txt += `Specialty : ${get_result.detail.specialty}\n`
                    ini_txt += `Laning : ${get_result.detail.laning_recommendation}\n`
                    ini_txt += `Release : ${get_result.detail.release_date}\n`
                    ini_txt += `Movement speed : ${get_result.attr.movement_speed}\n`
                    ini_txt += `Physical attack : ${get_result.attr.physical_attack}\n`
                    ini_txt += `Magic power : ${get_result.attr.magic_power}\n`
                    ini_txt += `Physical defense : ${get_result.attr.physical_defense}\n`
                    ini_txt += `Magic defense : ${get_result.attr.magic_defense}\n`
                    ini_txt += `Critical rate : ${get_result.attr.basic_atk_crit_rate}\n`
                    ini_txt += `Hp : ${get_result.attr.hp}\n`
                    ini_txt += `Mana : ${get_result.attr.mana}\n`
                    ini_txt += `Mana regen : ${get_result.attr.mana_regen}\n`
                    ini_icon = await getBuffer(get_result.icon)
                    lolhuman.sendMessage(from, ini_icon, image, { quoted: lol, caption: ini_txt })
                    break
                case 'mlstalk':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 84830127/2169`)
                    ml_id = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/mobilelegend/${ml_id}?apikey=${apikey}`)
                    reply(get_result.result)
                    break
                case 'genshin':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} jean`)
                    hero = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/genshin/${hero}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Name : ${get_result.title}\n`
                    ini_txt += `Intro : ${get_result.intro}\n`
                    ini_txt += `Icon : ${get_result.icon}\n`
                    ini_icon = await getBuffer(get_result.cover1)
                    lolhuman.sendMessage(from, ini_icon, image, { quoted: lol, caption: ini_txt })
                    ini_voice = await getBuffer(get_result.cv[0].audio[0])
                    lolhuman.sendMessage(from, ini_voice, audio, { quoted: lol, mimetype: Mimetype.mp4Audio })
                    break
                case 'qrreader':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        const filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        const form = new FormData();
                        const stats = fs.statSync(filePath);
                        const fileSizeInBytes = stats.size;
                        const fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        const options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/read-qr?apikey=${apikey}`, {...options })
                        fs.unlinkSync(filePath)
                        reply("Result: " + get_result.result)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'wikipedia':
                case 'wiki':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Tahu`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wiki?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    reply(get_result)
                    break
                case 'translate':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} en Tahu Bacem`)
                    kode_negara = args[0]
                    args.shift()
                    ini_txt = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=${apikey}&text=${ini_txt}`)
                    get_result = get_result.result
                    init_txt = `From : ${get_result.from}\n`
                    init_txt += `To : ${get_result.to}\n`
                    init_txt += `Original : ${get_result.original}\n`
                    init_txt += `Translated : ${get_result.translated}\n`
                    init_txt += `Pronunciation : ${get_result.pronunciation}\n`
                    reply(init_txt)
                    break
                case 'brainly':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Soekarno adalah`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/brainly?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = "Result : \n"
                    for (var x of get_result) {
                        ini_txt += `${x.title}\n`
                        ini_txt += `${x.url}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'jadwaltv':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} RCTI`)
                    channel = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadwaltv/${channel}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Jadwal TV ${channel.toUpperCase()}\n`
                    for (var x in get_result) {
                        ini_txt += `${x} - ${get_result[x]}\n`
                    }
                    reply(ini_txt)
                    break
                case 'jadwaltvnow':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadwaltv/now?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Jadwal TV Now :\n`
                    for (var x in get_result) {
                        ini_txt += `${x.toUpperCase()}${get_result[x]}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'newsinfo':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/newsinfo?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Author : ${x.author}\n`
                        ini_txt += `Source : ${x.source.name}\n`
                        ini_txt += `Url : ${x.url}\n`
                        ini_txt += `Published : ${x.publishedAt}\n`
                        ini_txt += `Description : ${x.description}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cnnindonesia':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cnnindonesia?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Judul : ${x.judul}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Tipe : ${x.tipe}\n`
                        ini_txt += `Published : ${x.waktu}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cnnnasional':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Judul : ${x.judul}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Tipe : ${x.tipe}\n`
                        ini_txt += `Published : ${x.waktu}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cnninternasional':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = "Result :\n"
                    for (var x of get_result) {
                        ini_txt += `Judul : ${x.judul}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Tipe : ${x.tipe}\n`
                        ini_txt += `Published : ${x.waktu}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'infogempa':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/infogempa?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Lokasi : ${get_result.lokasi}\n`
                    ini_txt += `Waktu : ${get_result.waktu}\n`
                    ini_txt += `Potensi : ${get_result.potensi}\n`
                    ini_txt += `Magnitude : ${get_result.magnitude}\n`
                    ini_txt += `Kedalaman : ${get_result.kedalaman}\n`
                    ini_txt += `Koordinat : ${get_result.koordinat}`
                    get_buffer = await getBuffer(get_result.map)
                    lolhuman.sendMessage(from, get_buffer, image, { quoted: lol, caption: ini_txt })
                    break
                case 'lirik':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Melukis Senja`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/lirik?apikey=${apikey}&query=${query}`)
                    reply(get_result.result)
                    break
                case 'cuaca':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Yogyakarta`)
                    daerah = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cuaca/${daerah}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Tempat : ${get_result.tempat}\n`
                    ini_txt += `Cuaca : ${get_result.cuaca}\n`
                    ini_txt += `Angin : ${get_result.angin}\n`
                    ini_txt += `Description : ${get_result.description}\n`
                    ini_txt += `Kelembapan : ${get_result.kelembapan}\n`
                    ini_txt += `Suhu : ${get_result.suhu}\n`
                    ini_txt += `Udara : ${get_result.udara}\n`
                    ini_txt += `Permukaan laut : ${get_result.permukaan_laut}\n`
                    lolhuman.sendMessage(from, { degreesLatitude: get_result.latitude, degreesLongitude: get_result.longitude }, location, { quoted: lol })
                    reply(ini_txt)
                    break
                case 'covidindo':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/corona/indonesia?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Sembuh : ${get_result.sembuh}\n`
                    ini_txt += `Dirawat : ${get_result.dirawat}\n`
                    ini_txt += `Meninggal : ${get_result.meninggal}`
                    reply(ini_txt)
                    break
                case 'covidglobal':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/corona/global?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Sembuh : ${get_result.sembuh}\n`
                    ini_txt += `Dirawat : ${get_result.dirawat}\n`
                    ini_txt += `Meninggal : ${get_result.meninggal}`
                    reply(ini_txt)
                    break
                case 'kodepos':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Slemanan or ${prefix + command} 66154`)
                    daerah = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/kodepos?apikey=${apikey}&query=${daerah}`)
                    get_result = get_result.result[0]
                    ini_txt = `Provinsi : ${get_result.province}\n`
                    ini_txt += `Kabupaten : ${get_result.city}\n`
                    ini_txt += `Kecamatan : ${get_result.subdistrict}\n`
                    ini_txt += `Kelurahan : ${get_result.urban}\n`
                    ini_txt += `Kode Pos : ${get_result.postalcode}`
                    reply(ini_txt)
                    break
                case 'jadwalbola':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadwalbola?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = "Jadwal Bola :\n"
                    for (var x of get_result) {
                        ini_txt += `Hari : ${x.hari}\n`
                        ini_txt += `Jam : ${x.jam}\n`
                        ini_txt += `Event : ${x.event}\n`
                        ini_txt += `Match : ${x.match}\n`
                        ini_txt += `TV : ${x.tv}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'indbeasiswa':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/indbeasiswa?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = 'Info Beasiswa :\n'
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'hoax':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/turnbackhoax?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = 'Info Hoax :\n'
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Posted : ${x.posted}\n`
                        ini_txt += `Description : ${x.desc}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'nsfwcheck':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedImage) && args.length == 0) {
                        var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        var filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        var form = new FormData();
                        var stats = fs.statSync(filePath);
                        var fileSizeInBytes = stats.size;
                        var fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        var options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/nsfwcheck?apikey=${apikey}`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        is_nsfw = "No"
                        if (Number(get_result.replace("%", "")) >= 50) is_nsfw = "Yes"
                        reply(`Is NSFW? ${is_nsfw}\nNSFW Score : ${get_result}`)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'ocr':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedImage) && args.length == 0) {
                        var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        var filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        var form = new FormData();
                        var stats = fs.statSync(filePath);
                        var fileSizeInBytes = stats.size;
                        var fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        var options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`http://api.lolhuman.xyz/api/ocr?apikey=${apikey}`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        reply(`Result : ${get_result}`)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break

                    // Movie & Story
                case 'lk21':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Transformer`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/lk21?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Link : ${get_result.link}\n`
                    ini_txt += `Genre : ${get_result.genre}\n`
                    ini_txt += `Views : ${get_result.views}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Tahun : ${get_result.tahun}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    ini_txt += `Actors : ${get_result.actors.join(", ")}\n`
                    ini_txt += `Location : ${get_result.location}\n`
                    ini_txt += `Date Release : ${get_result.date_release}\n`
                    ini_txt += `Language : ${get_result.language}\n`
                    ini_txt += `Link Download : ${get_result.link_dl}`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    break
                case 'drakorongoing':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/drakorongoing?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = "Ongoing Drakor\n\n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Thumbnail : ${x.thumbnail}\n`
                        ini_txt += `Year : ${x.category}\n`
                        ini_txt += `Total Episode : ${x.total_episode}\n`
                        ini_txt += `Genre : ${x.genre.join(", ")}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'wattpad':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`)
                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wattpad?apikey=${apikey}&url=${ini_url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Rating : ${get_result.rating}\n`
                    ini_txt += `Motify date : ${get_result.modifyDate}\n`
                    ini_txt += `Create date: ${get_result.createDate}\n`
                    ini_txt += `Word : ${get_result.word}\n`
                    ini_txt += `Comment : ${get_result.comment}\n`
                    ini_txt += `Vote : ${get_result.vote}\n`
                    ini_txt += `Reader : ${get_result.reader}\n`
                    ini_txt += `Pages : ${get_result.pages}\n`
                    ini_txt += `Description : ${get_result.desc}\n\n`
                    ini_txt += `Story : \n${get_result.story}`
                    thumbnail = await getBuffer(get_result.photo)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    break
                case 'wattpadsearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Tere Liye`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wattpadsearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = "Wattpad Seach : \n"
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Url : ${x.url}\n`
                        ini_txt += `Part : ${x.parts}\n`
                        ini_txt += `Motify date : ${x.modifyDate}\n`
                        ini_txt += `Create date: ${x.createDate}\n`
                        ini_txt += `Coment count: ${x.commentCount}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'cerpen':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/cerpen?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Creator : ${get_result.creator}\n`
                    ini_txt += `Story :\n${get_result.cerpen}`
                    reply(ini_txt)
                    break
                case 'ceritahoror':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ceritahoror?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Desc : ${get_result.desc}\n`
                    ini_txt += `Story :\n${get_result.story}\n`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    lolhuman.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt })
                    break

                    // Random Text //
                case 'quotes':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    quotes = await fetchJson(`http://api.lolhuman.xyz/api/random/quotes?apikey=${apikey}`)
                    quotes = quotes.result
                    author = quotes.by
                    quotes = quotes.quote
                    reply(`_${quotes}_\n\n*― ${author}*`)
                    break
                case 'quotesanime':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    quotes = await fetchJson(`http://api.lolhuman.xyz/api/random/quotesnime?apikey=${apikey}`)
                    quotes = quotes.result
                    quote = quotes.quote
                    char = quotes.character
                    anime = quotes.anime
                    episode = quotes.episode
                    reply(`_${quote}_\n\n*― ${char}*\n*― ${anime} ${episode}*`)
                    break
                case 'quotesdilan':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    quotedilan = await fetchJson(`http://api.lolhuman.xyz/api/quotes/dilan?apikey=${apikey}`)
                    reply(quotedilan.result)
                    break
                case 'quotesimage':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await getBuffer(`http://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}`)
                    lolhuman.sendMessage(from, get_result, image, { quotes: lol })
                    break
                case 'faktaunik':
                case 'katabijak':
                case 'pantun':
                case 'bucin':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}`)
                    reply(get_result.result)
                    break
                case 'randomnama':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    anu = await fetchJson(`http://api.lolhuman.xyz/api/random/nama?apikey=${apikey}`)
                    reply(anu.result)
                    break

                    // Searching
                case 'gimage':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/gimage?apikey=${apikey}&query=${query}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'gimage2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/gimage2?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    for (var x = 0; x <= 5; x++) {
                        var ini_buffer = await getBuffer(get_result[x])
                        lolhuman.sendMessage(from, ini_buffer, image)
                    }
                    break
                case 'konachan':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} azur_lane`)
                    query = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/konachan?apikey=${apikey}&query=${query}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'wallpapersearch':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wallpaper?apikey=${apikey}&query=${query}`)
                    ini_buffer = await getBuffer(get_result.result)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'wallpapersearch2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/wallpaper2?apikey=${apikey}&query=${query}`)
                    ini_buffer = await getBuffer(get_result.result)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'playstore':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} telegram`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/playstore?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = 'Play Store Search : \n'
                    for (var x of get_result) {
                        ini_txt += `Name : ${x.title}\n`
                        ini_txt += `ID : ${x.appId}\n`
                        ini_txt += `Developer : ${x.developer}\n`
                        ini_txt += `Link : ${x.url}\n`
                        ini_txt += `Price : ${x.priceText}\n`
                        ini_txt += `Price : ${x.price}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'shopee':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} tas gendong`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/shopee?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = 'Shopee Search : \n'
                    for (var x of get_result) {
                        ini_txt += `Name : ${x.name}\n`
                        ini_txt += `Terjual : ${x.sold}\n`
                        ini_txt += `Stock : ${x.stock}\n`
                        ini_txt += `Lokasi : ${x.shop_loc}\n`
                        ini_txt += `Link : ${x.link_produk}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'google':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/gsearch?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = 'Google Search : \n'
                    for (var x of get_result) {
                        ini_txt += `Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Desc : ${x.desc}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'stickerwa':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Koceng Imot`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/stickerwa?apikey=${apikey}&query=${query}`)
                    get_result = get_result.result[0].stickers
                    for (var x of get_result) {
                        ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/convert/towebp?apikey=${apikey}&img=${x}`)
                        lolhuman.sendMessage(from, ini_buffer, sticker)
                    }
                    break

                    // Primbon
                case 'artinama':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_nama = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/artinama?apikey=${apikey}&nama=${ini_nama}`)
                    reply(get_result.result)
                    break
                case 'jodoh':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Tahu & Bacem`)
                    ini_nama = args.join(" ").split("&")
                    nama1 = ini_nama[0].trim()
                    nama2 = ini_nama[1].trim()
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jodoh/${nama1}/${nama2}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Positif : ${get_result.positif}\n`
                    ini_txt += `Negative : ${get_result.negatif}\n`
                    ini_txt += `Deskripsi : ${get_result.deskripsi}`
                    reply(ini_txt)
                    break
                case 'weton':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 12 12 2020`)
                    tanggal = args[0]
                    bulan = args[1]
                    tahun = args[2]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/weton/${tanggal}/${bulan}/${tahun}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Weton : ${get_result.weton}\n`
                    ini_txt += `Pekerjaan : ${get_result.pekerjaan}\n`
                    ini_txt += `Rejeki : ${get_result.rejeki}\n`
                    ini_txt += `Jodoh : ${get_result.jodoh}`
                    reply(ini_txt)
                    break
                case 'jadian':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 12 12 2020`)
                    tanggal = args[0]
                    bulan = args[1]
                    tahun = args[2]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadian/${tanggal}/${bulan}/${tahun}?apikey=${apikey}`)
                    get_result = get_result.result
                    ini_txt = `Karakteristik : ${get_result.karakteristik}\n`
                    ini_txt += `Deskripsi : ${get_result.deskripsi}`
                    reply(ini_txt)
                    break
                case 'tebakumur':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_name = args.join(" ")
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/tebakumur?apikey=SoftApikey&name=${ini_name}`)
                    get_result = get_result.result
                    ini_txt = `Nama : ${get_result.name}\n`
                    ini_txt += `Umur : ${get_result.age}`
                    reply(ini_txt)
                    break

                    // Entertainment
                case 'asupan':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/asupan?apikey=${DevApi}`, {methode: 'get'})
                asup = await getBuffer(anu.result.url)
                lolhuman.sendMessage(from, asup, video, {quoted: lol, caption: 'Asupannya Tuan:v'})
                break
                case 'tebakgambar':
				if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
					anu = await fetchJson(`https://api.zeks.xyz/api/tebakgambar?apikey=apivinz`, {method: 'get'})
					ngebuff = await getBuffer(anu.result.soal)
					tebak = `➸ Jawaban : *${anu.result.jawaban}*`
					setTimeout( () => {
					lolhuman.sendMessage(from, tebak, text, {quoted: lol})
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					lolhuman.sendMessage(from, '_10 Detik lagi..._', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					lolhuman.sendMessage(from, '_20 Detik lagi..._', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					lolhuman.sendMessage(from, '_30 Detik lagi..._', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					lolhuman.sendMessage(from, ngebuff, image, { caption: '_Tebak bro!!! gak bisa jawab donasi ya:v_', quoted: lol }) // ur cods
					}, 0) // 1000 = 1s,
					break         
                case 'wancak':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/onecak?apikey=${apikey}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                    // Creator
                case 'quotemaker3':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedImage)) {
                        if (args.length == 0) return reply(`Contoh: ${prefix + command} Ogiwara|Sayu`)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ")
                        request({
                            url: `http://api.lolhuman.xyz/api/quotemaker3?apikey=${apikey}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "text": ini_txt
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            lolhuman.sendMessage(from, ini_buff, image, { quoted: lol })
                            fs.unlinkSync(file_name)
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'stickerwm':
                case 'stikerwm':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedImage)) {
                        if (args.length == 0) return reply(`Contoh: ${prefix + command} Ogiwara|Sayu`)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".webp")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `https://api.lolhuman.xyz/api/convert/towebpauthor?apikey=${apikey}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                                "package": ini_txt[0],
                                "author": ini_txt[1]
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            lolhuman.sendMessage(from, ini_buff, sticker, { quoted: lol }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'sticker':
                case 'stiker':
				    if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
					if ((isMedia && !lol.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lol
						const media = await lolhuman.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply('*yah gagal coba ulangi beberapa saat lagi*')
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								lolhuman.sendMessage(from, buffer, sticker, {quoted: lol})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && lol.message.videoMessage.seconds < 11 || isQuotedVideo && lol.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(lol).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lol
						const media = await lolhuman.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply('「❗」 *PROCCES*')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply('「❗」 *PROCCES*')
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								lolhuman.sendMessage(from, buffer, sticker, {quoted: lol})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else {
						reply(`Kirim gambar/video/gif dengan caption \n${prefix}sticker (durasi sticker video 1-9 detik)`)
					}
					break
                case 'ttp':
                case 'ttp2':
                case 'ttp3':
                case 'ttp4':
                case 'attp2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/${command}?apikey=${apikey}&text=${ini_txt}`)
                    lolhuman.sendMessage(from, ini_buffer, sticker, { quoted: lol })
                    break
                case 'triggered':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*_hubungi owner saya untuk membuka ban_`)
                    ini_url = args[0]
                    ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `http://api.lolhuman.xyz/api/editor/triggered?apikey=${apikey}&img=${ini_url}`
                    exec(`wget "${ini_buffer}" -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                        lolhuman.sendMessage(from, buff, sticker, { quoted: lol })
                        fs.unlinkSync(rano)
                    })
                    break
                case 'wasted':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    ini_url = args[0]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/editor/wasted?apikey=${apikey}&img=${ini_url}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'smoji':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=${apikey}`)
                    lolhuman.sendMessage(from, ini_buffer, sticker, { quoted: lol })
                    break
                case 'fakedonald':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/tweettrump?apikey=${apikey}&text=${ini_txt}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'faketoko':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    await faketoko(teks = "Tahu Bacem", url_image = "https://i.ibb.co/JdfQ73m/photo-2021-02-05-10-13-39.jpg", title = "Sayu Kawaii", code = "IDR", price = 1000000)
                    break
                case 'ktpmaker':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Usage: ${prefix + command} nik|provinsi|kabupaten|nama|tempat, tanggal lahir|jenis kelamin|jalan|rt/rw|kelurahan|kecamatan|agama|status nikah|pekerjaan|warga negara|berlaku sampai|url_image\n\nExample: ${prefix + command} 456127893132123|bumipertiwi|fatamorgana|Sayu Kawaii|mars, 99-99-9999|belum ditemukan|jl wardoyo|999/999|turese|imtuni|alhamdulillah islam|jomblo kack|mikirin dia|indo ori no kw|hari kiamat|https://i.ibb.co/Xb2pZ88/test.jpg`)
                    get_args = args.join(" ").split("|")
                    nik = get_args[0]
                    prov = get_args[1]
                    kabu = get_args[2]
                    name = get_args[3]
                    ttl = get_args[4]
                    jk = get_args[5]
                    jl = get_args[6]
                    rtrw = get_args[7]
                    lurah = get_args[8]
                    camat = get_args[9]
                    agama = get_args[10]
                    nikah = get_args[11]
                    kerja = get_args[12]
                    warga = get_args[13]
                    until = get_args[14]
                    img = get_args[15]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/ktpmaker?apikey=${apikey}&nik=${nik}&prov=${prov}&kabu=${kabu}&name=${name}&ttl=${ttl}&jk=${jk}&jl=${jl}&rtrw=${rtrw}&lurah=${lurah}&camat=${camat}&agama=${agama}&nikah=${nikah}&kerja=${kerja}&warga=${warga}&until=${until}&img=${img}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break

                    // Converter
                case 'togif':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if ((isMedia && !lol.message.videoMessage || isQuotedSticker)) {
                        const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(lol).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                        filePath = await lolhuman.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        file_name = getRandom(".gif")
                        ini_txt = args.join(" ").split("|")
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/togif?apikey=${apikey}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath),
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            lolhuman.sendMessage(from, ini_buff, video, { quoted: lol, mimetype: "video/gif", filename: file_name })
                            fs.unlinkSync(file_name)
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
                    }
                    break

                    // Other
                case 'ssweb':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} http://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/ssweb?apikey=${apikey}&url=${ini_link}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'ssweb2':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} http://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/sswebfull?apikey=${apikey}&url=${ini_link}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'shortlink':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} http://api.lolhuman.xyz`)
                    ini_link = args[0]
                    ini_buffer = await fetchJson(`http://lolhuman.herokuapp.com/api/shortlink?apikey=${apikey}&url=${ini_link}`)
                    reply(ini_buffer.result)
                    break
                case 'spamsms':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                reply(`*Dilarang keras melakukan spam ke owner*, jika ketahuan akan kami block permanen`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} 62822xxxxxxxx`)
                    nomor = args[0]
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=${apikey}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=${apikey}&nomor=${nomor}`)
                    reply("Success")
                    break

                    // Random Image //
                case 'art':
                case 'bts':
                case 'exo':
                case 'elf':
                case 'loli':
                case 'neko':
                case 'waifu':
                case 'shota':
                case 'husbu':
                case 'sagiri':
                case 'shinobu':
                case 'megumin':
                case 'wallnime':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'chiisaihentai':
                case 'trap':
                case 'blowjob':
                case 'yaoi':
                case 'ecchi':
                case 'hentai':
                case 'ahegao':
                case 'hololewd':                
                case 'animefeets':
                case 'animebooty':
                case 'animethighss':
                case 'hentaiparadise':
                case 'animearmpits':
                case 'hentaifemdom':
                case 'lewdanimegirls':
                case 'biganimetiddies':
                case 'animebellybutton':
                case 'hentai4everyone':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${apikey}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
                case 'feet':
                case 'yuri':
                case 'trap':
                case 'lewd':
                case 'feed':
                case 'eron':
                case 'solo':
                case 'gasm':                        
                case 'holo':
                case 'tits':                
                case 'erok':
                case 'smug':
                case 'baka':
                case 'solog':
                case 'lewdk':
                case 'waifu':                
                case 'femdom':
                case 'cuddle':
                case 'hentai':
                case 'eroyuri':
                case 'blowjob':
                case 'erofeet':
                case 'holoero':                
                case 'erokemo':
                case 'fox_girl':
                case 'futanari':
                case 'lewdkemo':
                case 'wallpaper':
                case 'pussy_jpg':
                case 'kemonomimi':
                case 'nsfw_avatar':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/random2/${command}?apikey=${apikey}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    break
case 'oppai':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/sideoppai?apikey=${apikey}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })       
                    break
case 'cum':
case 'les':
case 'ngif':
case 'bj':
case 'ero':
case 'cum':
case 'feetg':
case 'kiss':
case 'kuni':
case 'anal':
case 'poke':  
case 'pussy': 
case 'nsfw_neko_gif':     
case 'classic':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `http://api.lolhuman.xyz/api/random2/${command}?apikey=${apikey}`
                    exec(`wget "${ini_buffer}" -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                        lolhuman.sendMessage(from, buff, sticker, { quoted: lol })
                        fs.unlinkSync(rano)
                    })
                    break

                    // Textprome //
                case 'blackpink':
                case 'neon':
                case 'greenneon':
                case 'advanceglow':
                case 'futureneon':
                case 'sandwriting':
                case 'sandsummer':
                case 'sandengraved':
                case 'metaldark':
                case 'neonlight':
                case 'holographic':
                case 'text1917':
                case 'minion':
                case 'deluxesilver':
                case 'newyearcard':
                case 'bloodfrosted':
                case 'halloween':
                case 'jokerlogo':
                case 'fireworksparkle':
                case 'natureleaves':
                case 'bokeh':
                case 'toxic':
                case 'strawberry':
                case 'box3d':
                case 'roadwarning':
                case 'breakwall':
                case 'icecold':
                case 'luxury':
                case 'cloud':
                case 'summersand':
                case 'horrorblood':
                case 'thunder':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/textprome/${command}?apikey=${apikey}&text=${ini_txt}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'pornhub':
                case 'glitch':
                case 'avenger':
                case 'space':
                case 'ninjalogo':
                case 'marvelstudio':
                case 'lionlogo':
                case 'wolflogo':
                case 'steel3d':
                case 'wallgravity':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    txt1 = args[0]
                    txt2 = args[1]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/textprome2/${command}?apikey=${apikey}&text1=${txt1}&text2=${txt2}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
case 'toimg':
case 'takestick':
if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
				if (!isQuotedSticker) return reply('Reply atau Tag sticker yang mau dijadiin gambar kak >_<')
					encmedia = JSON.parse(JSON.stringify(lol).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lolhuman.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(' Gagal, pada saat mengkonversi webp ke image ')
						buffer = fs.readFileSync(ran)
				    lolhuman.sendMessage(from, buffer, image, {quoted: lol, caption: 'nih kak [(^.^)]'})
				   fs.unlinkSync(ran)
					})
					break
case 'tomp3':
if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
if (!isPrem) return reply(`*[ ! ] Only Premium*\n\n_ingin membeli premium? hubungi owner saya_`)
                	lolhuman.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return reply('*Reply video nya lah-_-*')
					reply('WAIT GAN')
					encmedia = JSON.parse(JSON.stringify(lol).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await lolhuman.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Yahh gagall om:( coba ulang lagi')
						rmln = fs.readFileSync(ran)
						lolhuman.sendMessage(from, rmln, audio, {mimetype: 'audio/mp4', quoted: lol })
						fs.unlinkSync(ran)
					}) 
					break
                    // Photo Oxy //
                case 'shadow':
                case 'cup':
                case 'cup1':
                case 'romance':
                case 'smoke':
                case 'burnpaper':
                case 'lovemessage':
                case 'undergrass':
                case 'love':
                case 'coffe':
                case 'woodheart':
                case 'woodenboard':
                case 'summer3d':
                case 'wolfmetal':
                case 'nature3d':
                case 'underwater':
                case 'golderrose':
                case 'summernature':
                case 'letterleaves':
                case 'glowingneon':
                case 'fallleaves':
                case 'flamming':
                case 'harrypotter':
                case 'carvedwood':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${apikey}&text=${ini_txt}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
                case 'tiktok':
                case 'arcade8bit':
                case 'battlefield4':
                case 'pubg':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*\n_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    txt1 = args[0]
                    txt2 = args[1]
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/photooxy2/${command}?apikey=${apikey}&text1=${txt1}&text2=${txt2}`, {method: 'get'})
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`) 
                    break

                    // Ephoto 360 //
                case 'wetglass':
                case 'multicolor3d':
                case 'watercolor':
                case 'luxurygold':
                case 'galaxywallpaper':
                case 'lighttext':
                case 'beautifulflower':
                case 'puppycute':
                case 'royaltext':
                case 'heartshaped':
                case 'birthdaycake':
                case 'galaxystyle':
                case 'hologram3d':
                case 'greenneon':
                case 'glossychrome':
                case 'greenbush':
                case 'metallogo':
                case 'noeltext':
                case 'glittergold':
                case 'textcake':
                case 'starsnight':
                case 'wooden3d':
                case 'textbyname':
                case 'writegalacy':
                case 'galaxybat':
                case 'snow3d':
                case 'birthdayday':
                case 'goldplaybutton':
                case 'silverplaybutton':
                case 'freefire':
                if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
                    if (args.length == 0) return reply(`Contoh: ${prefix + command} Sayu Kawaii`)
                    ini_txt = args.join(" ")
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${apikey}&text=${ini_txt}`)
                    lolhuman.sendMessage(from, ini_buffer, image, { quoted: lol })
                    reply(`*[ ! ]JANGAN SPAM*\n*KASIH BOT JEDA WAKTU 40 DETIK!*`)
                    break
//menu owner
case 'addprem':
case 'premium':
if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
					if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
					addp = body.slice(9)
					premium.push(`${addp}@s.whatsapp.net`)
					fs.writeFileSync('./database/user/premium.json', JSON.stringify(premium))
					reply(`Berhasil Menambahkan wa.me/${addp} Ke Daftar Premium`)
					break
case 'dellprem':
					if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
					delp = body.slice(10)
					premium.splice(`${delp}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/user/premium.json', JSON.stringify(premium))
					reply(`Berhasil Menghapus wa.me/${delp} Dari Daftar Premium`)
					break
case 'ban':
					if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
					bnnd = body.slice(5)
					ban.push(`${bnnd}@s.whatsapp.net`)
					fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
					reply(`Nomor wa.me/${bnnd} telah dibanned !`)
					break
case 'unban':
					if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
					bnnd = body.slice(7)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
					reply(`Nomor wa.me/${bnnd} telah di unban!`)
					break
case 'block':
				 lolhuman.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
					lolhuman.blockUser (`${body.slice(7)}@c.us`, "add")
					lolhuman.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
case 'unblock':
                    lolhuman.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
				    lolhuman.blockUser (`${body.slice(9)}@c.us`, "remove")
					lolhuman.sendMessage(from, `Perintah diterima, Membuka ${body.slice(9)}@c.us`, text)
					break
case 'leave': 
				if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
				if (!isGroup) return reply(`「 *ONLY IN GROUP*」`)
				await reply(from, 'bye').then(() => lolhuman.groupLeave(from))
				break 
case 'bc':
					lolhuman.updatePresence(from, Presence.composing) 
				     if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
					if (args.length < 1) return reply('.......')
					anu = await lolhuman.chats.all()
					if (isMedia && !lol.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lol
						buff = await lolhuman.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							lolhuman.sendMessage(_.jid, buff, image, {caption: `*「 SAYU BOT BROADCAST」*\n\n${body.slice(4)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 SAYU BOT BROADCAST 」*\n\n${body.slice(4)}`)
						}
						reply('「*BROADCAST SUKSES*」')
					}
					break
case 'bcgc':
if (isBanned) return reply(`*Maaf kamu telah terbanned*
_hubungi owner saya untuk membuka ban_`)
if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
				     if (!isOwner) return reply(`*[ ! ] Only Owner bot*`)
					if (args.length < 1) return reply('Teksnya mana bosku >_<')
					anu = await groupMembers
					nom = lol.participant
					if (isMedia && !lol.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(lol).replace('quotedM','m')).message.extendedTextMessage.contextInfo : lol
						buff = await lolhuman.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							lolhuman.sendMessage(_.jid, buff, image, {caption: `* BC GROUP *\n\n Dari Grup : ${groupName}\n Pengirim : wa.me/${(sender.split('@')[0])}\n Pesan : ${body.slice(6)}`})
						}
						reply('* SUKSES BOSKU *')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `* BC GROUP *\n\n Dari Grup : ${groupName}\n Pengirim : wa.me/${(sender.split('@')[0])}\n Pesan : ${body.slice(6)}`)
						}
						reply('* SUKSES BOSKU *')
					}
					break
case 'setprefix':  //error
					if (args.length < 1) return
					if (!isOwner) return reply(`[] Only Owner bot`)
					prefix = args[0]
					reply(`* SUKSES * Prefix jadi  : ${prefix}`)
					break
case 'owner':
case 'creator':
                  lolhuman.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: lol})
                  lolhuman.sendMessage(from, 'Ini owner ku...',MessageType.text, { quoted: lol} )
tod = await getBuffer(`https://i.ibb.co/pJQv1wK/20210406-193737.png`)
 lolhuman.sendMessage(from, tod, image, { quoted: lol, caption: '*Ini waifu owner saya...*'})
                     break
                default:
                    if (isCmd) {
                        reply(`Sorry bro, command *${prefix}${command}* gk ada di list *${prefix}menu*`)
                    }
                    if (!isGroup && !isCmd) {
                        await lolhuman.updatePresence(from, Presence.composing)
                        simi = await fetchJson(`http://api.lolhuman.xyz/api/simi?apikey=${apikey}&text=${budy}`)
                        reply(simi.result)
                    }
            }
        } catch (e) {
            e = String(e)
            if (!e.includes("this.isZero")) {
                const time_error = moment.tz('Asia/Jayapura').format('HH:mm:ss')
                console.log(color(time_error, "white"), color("[  ERROR  ]", "aqua"), color(e, 'red'))
            }
        }
    })
}
starts()