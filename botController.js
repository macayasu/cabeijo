var config = require('./constant.json')
var token = config.telegram.token;
console.log(token)

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

var opts = {
    reply_markup: JSON.stringify({ force_reply: true }
)};
let modal = 0
let laba = 0
let persen = ""

bot.onText(/\/cuan/, function (msg) {
    var fromId = msg.from.id;
    bot.sendMessage(fromId, 'Masukkan modal anda!', opts)
        .then(function(sended) {
            var chatId = sended.chat.id;
            var messageId = sended.message_id;
            bot.onReplyToMessage(chatId, messageId, function (message) {   
                //modal
                modal = parseInt(message.text)
                bot.sendMessage(chatId, 'Persen', opts)
                .then(function(sended) {
                    var chatId = sended.chat.id;
                    var messageId = sended.message_id;
                    bot.onReplyToMessage(chatId, messageId, function (message) {
                    persen = message.text
                    if(persen == '3%') {
                        laba = (modal * 3/100) - modal * 1/100
                    }
                    else if(persen == '5%') {
                        laba = (modal * 5/100) - modal * 1/100
                    }
                    else if(persen == '10%') {
                        laba = (modal * 10/100) - modal * 1/100
                    } 


                    bot.sendMessage(fromId, `Modal: ${modal} - Persen ${persen} - Laba ${laba}`, opts)
                    .then(function(sended) {
                        var chatId = sended.chat.id;
                        var messageId = sended.message_id;
                        bot.onReplyToMessage(chatId, messageId, function (message) {
                            
                        });
                    });
                    });
                });
                
            });
        })
});

  bot.on("polling_error", (err) => console.log(err));
