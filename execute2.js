const axios = require("axios");

global.app.request1 = true;
const sendRequest1 = () => {
    if ("request1" in global.app == false || global.app.request1 == false) {
        return;
    }
    axios.get("http://195.18.27.252:2801" + (Date.now() % 2 == 0 ? "6" : "8") + "/", {timeout: 1000}).then(res => {
        console.log("Res: ", res);
    }).catch((err) => {
        console.log("Err:", err.toString());
    }).finally(() => {
        sendRequest1();
    });
};
sendRequest1();
