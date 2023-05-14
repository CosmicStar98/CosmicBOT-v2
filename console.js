// Import the bot's setting files
var cfg = require(__dirname + "/config/settings.json")
var cfg_e = require(__dirname + "/config/settings.extra.json")

// Variables
var bot = require('./bot.js');


// Monkey-patch js string to allow checking empty strings
String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};



let commands = {
    "echo": {
        "help": "[txt]",
        "function": function(args) {
			if (args.length === 0)
				return console.log(this.help);

            let txt = args[0];
			
            bot.socket.emit("talk", {text: txt});
        }
    },
    "sticker": {
        "help": "[sticker]",
        "function": function(args) {
            let sticker = args[0];

            bot.socket.emit('command', {list:['sticker',txt]})
        }
    },
    "skiddie": {
        "help": "[person]",
        "function": function(args) {
            let person = args[0];

			if(!person || person.isEmpty() == true){person = "Seamus"}
            bot.socket.emit("talk", {text: person + ' is a skiddie'});
        }
    },
    "yt": {
        "help": "[youtube link or video/playlist id]",
        "function": function(args) {
            let url = args[0];

		    var num = Math.floor(Math.random() * bot.vaporwave_ids.length);
		    if(!url || url.isEmpty() == true){url = bot.vaporwave_ids[num]}
            bot.socket.emit('command', {list:['youtube',url]})
        }
    },
    "sy": {
        "help": "[spotify link]",
        "function": function(args) {
            let url = args[0];

		    var num = Math.floor(Math.random() * bot.spotify_playlists.length);
		    if(!url || url.isEmpty() == true){url = bot.spotify_playlists[num]}
            bot.socket.emit('command', {list:['spotify',url]})
        }
    },
    "sc": {
        "help": "[soundcloud link]",
        "function": function(args) {
			if (args.length === 0)
				return console.log(this.help);

            let url = args[0];

            bot.socket.emit('command', {list:['soundcloud',url]})
        }
    },
    "youtube": {
        "help": "[youtube link or video/playlist id]",
        "function": function(args) {
            let url = args[0];

		    var num = Math.floor(Math.random() * bot.vaporwave_ids.length);
		    if(!url || url.isEmpty() == true){url = bot.vaporwave_ids[num]}
            bot.socket.emit('command', {list:['youtube',url]})
        }
    },
    "spotify": {
        "help": "[spotify link]",
        "function": function(args) {
            let url = args[0];

		    var num = Math.floor(Math.random() * spotify_playlists.length);
		    if(!url || url.isEmpty() == true){url = spotify_playlists[num]}
            bot.socket.emit('command', {list:['spotify',url]})
        }
    },
    "soundcloud": {
        "help": "[soundcloud link]",
        "function": function(args) {
			if (args.length === 0)
				return console.log(this.help);

            let url = args[0];

            bot.socket.emit('command', {list:['soundcloud',url]})
        }
    },
    "wtf": {
        "function": function(args) {
			var num = Math.floor(Math.random() * bot.wtf.length);
            bot.socket.emit("talk", {text: bot.wtf[num]});
        }
    },
    "clickbait": {
        "help": "[text]",
        "function": function(args) {
            let txt = args[0];
            if(!txt || txt.isEmpty() == true){txt = "Seamus versus, Fune epic battle at 3am in the backrooms!"}
            bot.socket.emit("talk", {text: (['omg!',':O','what?','wtf?!','wth?!','omfg!','lmao','xD','bruh'][Math.floor(Math.random()*9)]+' '+txt+' '+['(gone wrong)','(gone sexual)','(not clickbait!)','(cops called)','(no virus!)','(not fake!)','(real!?!)', '(gone sus!!)'][Math.floor(Math.random()*8)]+'\u{1F631}'.repeat(Math.ceil(Math.random()*5))+'\u{1F480}'.repeat(Math.ceil(Math.random()*3))).toUpperCase()});
        }
    },
    "cyberpunk": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "WAKE THE FUCK UP SAMURAI, WE GOT A CITY TO BURN!!"});
        }
    },
    "drivepower": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "It's about drive, its about power, we stay hungry, we devour Put in the work, put in the hours and take whats ours Black and Samoan in my veins, my culture bangin with Strange I change the game so whats my motherfuckin name? Rock!!"});
        }
    },
    "bigsmoke": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "I'll have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda."});
        }
    },
    "gabe": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "Good Evening, my name is Gabe Newell from the Microsoft team, and from analyzing your browser history we are here to inform you that your Windows XP Operating system is not valid. Your OS will be locked in 2 hours and it will stay this way until you have paid for the Microsoft product. If you have any questions or concerns please do not hesitate to go fucking kill yourself!"});
        }
    },
    "bonzibuddy": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "Welcome to my world of BonziBUDDY! I will explore the Internet with you as your very own friend and sidekick!  I can talk, walk, joke, browse, search, e-mail, and download like no other friend you have ever had!  I even have the ability to compare prices on the products you love and help you save money! Best of all, I AM FREE!"});
        }
    },
    "bonzibuddy2": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "Well, hello there! I do not believe we have been properly introduced. I am BonziBUDDY! Nice to meet you! Since this is the first time we have met, I would like to tell you a little about myself. I am your friend and BonziBUDDY! I have the ability to learn from you. The more we browse, search, and travel the internet together, the smarter I will become! Not that I am not already smart!"});
        }
    },
    "pacertest": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start."});
        }
    },
    "navy": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever' comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, skiddo."});
        }
    },
    "asshole": {
        "help": "[person]",
        "function": function(args) {				
            let person = args[0];

			if(!person || person.isEmpty() == true){person = "Fune"}
            bot.socket.emit('command', {list:['asshole',person]})
        }
    },
    "joke": {
        "function": function(args) {
            bot.socket.emit('command', {list:['joke']})
        }
    },
    "fact": {
        "function": function(args) {
            bot.socket.emit('command', {list:['fact']})
        }
    },
    "bees": {
        "function": function(args) {
            bot.socket.emit('command', {list:['bees']})
        }
    },
    "linux": {
        "function": function(args) {
            bot.socket.emit('command', {list:['linux']})
        }
    },
    "triggered": {
        "function": function(args) {
            bot.socket.emit('command', {list:['triggered']})
        }
    },
    "pawn": {
        "function": function(args) {
            bot.socket.emit("talk", {text: "Hi, my name is BonziBUDDY, and this is my website. I meme here with my old harambe, and my son, Clippy. Everything in here has an ad and a fact. One thing I've learned after 17 years - you never know what is gonna give you some malware."});
        }
    },
    "vaporwave": {
        "function": function(args) {
            var num = Math.floor(Math.random() * bot.vaporwave_ids.length);
            bot.socket.emit('command', {list:['youtube',bot.vaporwave_ids[num]]})
        }
    },
    "coinflip": {
        "function": function(args) {
		    if (Math.random() < 0.5) {
				bot.socket.emit("talk", {text: "The coin has landed on, <b>tails</b><div><h6>Dont ask where sonic is</h6>"});
		    } else {
				bot.socket.emit("talk", {text: "The coin has landed on, <b>heads</b>"});
		    }
        }
    },
    "kill": {
        "help": "[person]",
        "function": function(args) {
            let person = args[0];

			if(!person || person.isEmpty() == true){person = "BonziBuddy"}
            bot.socket.emit("talk", {text: "<b>" + person + "</b> has been killed, ouch!"});
        }
    },
    "iq": {
        "help": "[person]",
        "function": function(args) {				
            let person = args[0];
			
			if(!person || person.isEmpty() == true){person = "Seamus"}
		    if(person.toLowerCase().includes("fune") || person.toLowerCase().includes("fuckune") || person.toLowerCase().includes("ziggy") || person.toLowerCase().includes("gino")){
					bot.socket.emit("talk", {text: person + "'s IQ is: <b>" + Math.floor(Math.random() * 7) + "</b>"});
		    } else {
					bot.socket.emit("talk", {text: person + "'s IQ is: <b>" + Math.floor(Math.random() * 266) + "</b>"});
		    }
        }
    },
    "color": {
        "help": "[color]",
        "function": function(args) {
            let color = args[0];

			if(Object.keys(colors).includes(color)){
				var c = colors[color];
				bot.socket.emit('command', {list:['color', c]})
			} else {
				bot.socket.emit('command', {list:['color']})
			}
        }
    },
    "help": {
        "function": function() {
            let keys = Object.keys(commands);
			for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
				console.log(key + ":\t" + (commands[key].help || 'N/A'));
            }
        }
    }
}

let colors = [
	"purple",
	"magenta",
	"pink",
	"blue",
	"cyan",
	"red",
	"orange",
	"green",
	"lime",	
	"yellow",
	"brown",
	"black",
	"grey",
	"white",
	"ghost"
];

exports.listen = function() {
    process.openStdin().addListener("data", function(input) {
        try {
            let list = input.toString().trim().split(" ");
            let cmd = list[0].toLowerCase();
            let args = list.slice(1);
            let argsString = args.join(" ");
            if(Object.keys(commands).includes(cmd)){
				commands[cmd]["function"](args);
            } else {
				console.warn("Invalid command.");
            }
        } catch(e) {}
    });
}
