var config = require('./constant.json')
var token = config.telegram.token;
console.log(token)

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });


// bot.onText(/\/cuan/, (msg) => {
//     bot.sendMessage(
//         msg.chat.id,
//         'Masukkan jumlah modal anda!',
//     );
    
//  });

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
                bot.onReplyToMessage(chatId, message.message_id, function (message) {
                    console.log(message.text)
                    bot.onReplyToMessage(chatId, message.message_id, function (message) {
                        console.log('OK. I\'ll search for %s', message.text);      
                    });
                    console.log('OK. I\'ll search for %s', message.text);      
                });
                
            });
        })
});

//  bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
    
//     if(msg.text == 'cuan')
//     {
//         cuan(chatId)
//     }
    
//   });

//   function cuan (chatId) {
//      bot.sendMessage(
//             chatId,
//             'Masukkan jumlah modal anda!',
//         );

//     bot.on('message', (msg) => {
//         persen(msg.text,chatId)
//         });
//   }

// //   function kupon (modal,chatId) {
// //     bot.sendMessage(chatId, 'Kupon', {
// //         'reply_markup': {
// //             'keyboard': [['100','200','350','400','500']],
// //             resize_keyboard: true,
// //             one_time_keyboard: true,
// //             force_reply: true,
// //         }
// //     });

// //     bot.on('message', (msg) => {
// //         persen({modal,kupon: msg.text},chatId)
// //         });
// //   }

//   function persen (modal,chatId) {
//     bot.sendMessage(chatId, 'Laba', {
//         'reply_markup': {
//             'keyboard': [['3%','5%','10%']],
//             resize_keyboard: true,
//             one_time_keyboard: true,
//             force_reply: true,
//         }
//     });
    
//     let potongan = 0
//     let laba = 0
    
//     bot.on('message', (msg) => {
//         if(msg.text == '3%') {
//             laba = (modal * 3/100) - modal * 1/100
//         }
//         else if(msg.text == '5%') {
//             laba = (modal * 5/100) - modal * 1/100
//         }
//         else if(msg.text == '10%') {
//             laba = (modal * 10/100) - modal * 1/100
//         } 
//         labanya(laba,chatId) 

//         });

//   }

//   function labanya(laba,chatId) {
//     bot.sendMessage(
//         chatId,
//         laba
//     );
    
//   }



  bot.on("polling_error", (err) => console.log(err));
