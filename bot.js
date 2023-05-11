'use strict';

// Deps
const fs = require('fs');
var io = require("socket.io-client")

// Import the bot's setting files
var cfg = require(__dirname + "/config/settings.json")
var cfg_e = require(__dirname + "/config/settings.extra.json")


// Catch errors
process.on("uncaughtException", function(err) {
  console.log(err.stack);
  throw err;
});

// Monkey-patch js string to allow checking empty strings
String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};


// Variables
const network = cfg.prefs.appearance.net;
const dash = " - ";
const dot = ".";
const slash = "/";
const colon = ":";
const space = " ";
// Taken from https://stackoverflow.com/a/54707844
const date = new Date();
const months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];
const month = date.getMonth();
const year = new Date().getFullYear();
const day = new Date().getDay();
const hours = new Date().getHours();
const minutes = new Date().getMinutes();
const seconds = new Date().getSeconds();
const log_timestamp = space + hours + colon + minutes + colon + seconds;



// Bot config
let prefix = cfg.prefs.prefixes["2"];
const dev = cfg.prefs.appearance.dev;
const co_dev = cfg.prefs.appearance.co_dev;
const ver = cfg.prefs.appearance.botver;
const cmd_delay = cfg.prefs.cmds.delay;
const status = "v" + "<b>" + ver + "</b>";
const name = cfg.prefs.appearance.name["1"];
const subname = "  {" + prefix + "hub}";
const voice = cfg.prefs.voices["2"];

const login_name = '' + name + '' + subname;
const login_channel = cfg.prefs.login.channels["1"];
const login_version = cfg.prefs.login.version;
const login_room = cfg.prefs.login.rooms["1"];
const login_url = cfg.prefs.login.socket_url;
const login_godword = cfg.prefs.cmds.godword;
// The default playlists
const spotify_playlists = cfg.prefs.cmds.spotify.playlists;
const youtube_playlist = cfg.prefs.cmds.youtube.playlists.default;
const vaporwave_ids = cfg.prefs.cmds.youtube.playlists.vaporwave;


// Socials
const discord_url = cfg.prefs.socials.discord;
const twitter_url = cfg.prefs.socials.twitter;
const reddit_url = cfg.prefs.socials.reddit;
const insta_url = cfg.prefs.socials.instagram;
const github_url = cfg.prefs.socials.github;
const pastebin_url = cfg.prefs.socials.pastebin;
const replit_url = cfg.prefs.socials.replit;



console.log('								        ')
console.log(' ▄████████  ▄██████▄     ▄████████    ▄▄▄▄███▄▄▄▄    ▄█   ▄████████ ▀█████████▄   ▄██████▄      ███     ')
console.log('███    ███ ███    ███   ███    ███  ▄██▀▀▀███▀▀▀██▄ ███  ███    ███   ███    ███ ███    ███ ▀█████████▄ ')
console.log('███    █▀  ███    ███   ███    █▀   ███   ███   ███ ███▌ ███    █▀    ███    ███ ███    ███    ▀███▀▀██ ')
console.log('███        ███    ███   ███         ███   ███   ███ ███▌ ███         ▄███▄▄▄██▀  ███    ███     ███   ▀ ')
console.log('███        ███    ███ ▀███████████  ███   ███   ███ ███▌ ███        ▀▀███▀▀▀██▄  ███    ███     ███     ')
console.log('███    █▄  ███    ███          ███  ███   ███   ███ ███  ███    █▄    ███    ██▄ ███    ███     ███     ')
console.log('███    ███ ███    ███    ▄█    ███  ███   ███   ███ ███  ███    ███   ███    ███ ███    ███     ███     ')
console.log('████████▀   ▀██████▀   ▄████████▀    ▀█   ███   █▀  █▀   ████████▀  ▄█████████▀   ▀██████▀     ▄████▀   ')
console.log('   ║		  ║						 ')
console.log('█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█')
console.log('█       Developed by: ' + dev + '      █')
console.log('█       Version: ' + ver + '	          █')
console.log('█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█')
console.log('								        ')

var socket = io("" + login_url + "",{query:{ version: '' + login_version + '', channel: '' + login_channel + '' }})
socket.emit('login',{name:'' + login_name + '',room:login_room})
socket.emit("command", { list: ["godmode", login_godword] });
socket.emit("command", { list: ["sanitize", "off"] });
socket.emit("command", { list: ["pope"] });

function reconnect() {
    var socket = io("" + login_url + "",{query:{ version: '' + login_version + '', channel: '' + login_channel + '' }})
    socket.emit('login',{name:'' + login_name + '',room:login_room})
    socket.emit("command", { list: ["status", status] });
    socket.emit("command", { list: ["voice", voice] });
    socket.emit("command", { list: ["godmode", login_godword] });
    socket.emit("command", { list: ["sanitize", "off"] });
    socket.emit("command", { list: ["pope"] });
    socket.on('talk',function(data){
        var text = data.text
        if(text.toLowerCase().startsWith(prefix)){
            text = text.slice(2)
            var cmd = text.split(' ')[0]
            var oth = text.slice(cmd.length+1)
            if(Object.keys(commands).includes(cmd)){
                var command = commands[cmd](oth)
                setTimeout(function(){
                    socket.emit('talk',{text:command})
                },cmd_delay)
            } else {
                setTimeout(function(){
                    socket.emit('talk',{text:"Sorry, that command doesn't exist!"})
                },cmd_delay)
            }
        }
    })
}


socket.emit("command", { list: ["name", login_name] });
socket.emit("command", { list: ["status", status] });
socket.emit("command", { list: ["voice", voice] });
socket.emit("command", { list: ["godmode", login_godword] });
socket.emit("command", { list: ["sanitize", "off"] });
socket.emit("command", { list: ["pope"] });
socket.emit('command', {list:['pitch','77']})
socket.emit('command', {list:['speed','146']})

var cmdcount = 0;
var sockets = []

var wtf = cfg.prefs.cmds.wtf;
var eight_ball = cfg.prefs.cmds["8ball"];
var bees = cfg.prefs.cmds.bees;
var stickers = cfg.prefs.cmds.stickers;


var commands = {
	    cmds:function(){
		    cmdcount++
		    return "--<br><h3>" + name + "</h3><h5>Developed by: " + dev + "</h5> <hr /><li>" + prefix + "hub</li> <hr /><b>Commands:</b><hr /><li>" + prefix + "copypastas</li><br /> <li>" + prefix + "utilities</li><br /> <li>" + prefix + "fun</li><br /> <li>" + prefix + "media</li><br /> <li>" + prefix + "misc</li><br /> <hr /><h6>Commands.</h6><hr />"
		    console.log('Loaded commands menu.' + dash + network)
	    },
	    copypastas(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>Copypastas:</b><hr /> <li>' + prefix + 'bigsmoke</li><br /> <li>' + prefix + 'drivepower</li><br /> <li>' + prefix + 'gabe</li><br />  <li>' + prefix + 'pacertest</li><br /> <li>' + prefix + 'triggered</li><br /> <li>' + prefix + 'cyberpunk</li><br /> <li>' + prefix + 'bonzibuddy</li><br /> <li>' + prefix + 'bonzibuddy2</li><br /> <li>' + prefix + 'navy</li><br /> <li>' + prefix + 'bees</li><br /> <li>' + prefix + 'pawn</li><br /> <li>' + prefix + 'linux</li><br /> <li>' + prefix + 'wtf</li><br /> <hr /><h6>Commands  -  Copypastas.</h6><hr />'
		    console.log('Loaded copypastas menu.' + dash + network)
	    },
	    utilities(txt){
		    if(txt.startsWith(prefix)){return "jajajajaa cool command lmao hahaha shut the fuck up"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>Utilities:</b><hr /> <li>' + prefix + 'message</li><br /> <li>' + prefix + 'date</li><br /> <hr /><h6>Commands  -  Utilities.</h6><hr />'
		    console.log('Loaded utilities menu.' + dash + network)
	    },
	    fun(txt){
		    if(txt.startsWith(prefix)){return "jajajajaa cool command lmao hahaha shut the fuck up"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>Fun Commands:</b><hr /> <li>' + prefix + 'joke</li><br /> <li>' + prefix + 'fact</li><br /> <li>' + prefix + 'skiddie</li><br /> <li>' + prefix + 'asshole</li><br /> <li>' + prefix + 'coinflip</li><br /> <li>' + prefix + 'clickbait</li><br /> <li>' + prefix + 'vaporwave</li><br /> <li>' + prefix + 'echo</li><br /> <li>' + prefix + '8ball</li><br /> <li>' + prefix + 'kill</li><br /> <li>' + prefix + 'iq</li><br /> <hr /><h6>Commands  -  Fun.</h6><hr />'
		    console.log('Loaded fun menu.' + dash + network)
	    },
	    media(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>Media Commands:</b><hr /> <li>' + prefix + 'yt [Video ID]</li><br /> <li>' + prefix + 'sy [SPOTIFY URL]</li><br /> <li>' + prefix + 'sc [SOUNDCLOUD URL]</li><br /> <hr /><h6>Commands  -  Media.</h6><hr />'
		    console.log('Loaded media menu.' + dash + network)
	    },
	    misc(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>Misc Commands:</b><hr /> <li>' + prefix + 'fakeerrors</li><br /> <li>' + prefix + 'sticker</li><br /> <hr /><h6>Commands  -  Misc.</h6><hr />'
		    console.log('Loaded misc menu.' + dash + network)
	    },
	    changelog(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>' + ver + ' Changelog:</b><hr /> <li>Updated to <b>' + ver + '</b></li><br /> <li>Brought the bot back from the grave</li><br /> <hr /><h6>Changelog.</h6><hr />'
		    console.log('Loaded changelog menu.' + dash + network)
	    },
	    hub(txt){
		    if(txt.startsWith(prefix)){return "jajajajaa cool command lmao hahaha shut the fuck up"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><b>Commands:</b><hr /> <li>' + prefix + 'cmds</li><br /> <li>' + prefix + 'changelog</li><br /> <li>' + prefix + 'aboutme</li><br /> <li>' + prefix + 'links</li><br /> <hr /><h6>Hub.</h6><hr />'
		    console.log('Loaded hub menu.' + dash + network)
	    },
	    links(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><b>Links:</b><hr /> <br /><h4><li><a href="' + discord_url + '" target="_blank">Discord Server</a></h4></li><br /> <h4><li><a href="' + pastebin_url + '" target="_blank">Pastebin Profile</a></h4></li><br /> <h4><li><a href="' + github_url + '" target="_blank">Github Profile</a></h4></li><br /><h4><li><a href="' + reddit_url + '" target="_blank">Subreddit</a></h4></li><br /> <h4><li><a href="' + twitter_url + '" target="_blank">Twitter Profile</a></h4></li><br /><hr /> <h6>Links.</h6><hr />'
		    console.log('Loaded links menu.' + dash + network)
	    },
	    aboutme(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><div><h4>Version ' + ver + '</h4><br><hr>Hello, I am <b>' + name + '</b>! If you need my assistance please start by using <b>' + prefix + 'hub</b>. <hr><div><h5>Developed by: ' + dev + '</h5></div></p>'
		    console.log('Loaded aboutme menu.' + dash + network)
	    },
	    fakeerrors(txt){
		    if(txt.startsWith(prefix)){return "haha cool command lmao hahaha shut the fuck up"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><h5>Developed by: ' + dev + '</h5> <hr /><b>Fake Errors:</b><hr /><li>' + prefix + 'nojavascript</li><br /> <li>' + prefix + 'error</li><br /> <li>' + prefix + 'banned</li><br /> <li>' + prefix + 'kicked</li><br /> <li>' + prefix + 'unsupported</li><br /><hr /><h6>Fake Errors.</h6><hr />'
		    console.log('Loaded fakeerrors menu.' + dash + network)
	    },
	    echo(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice spam lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){return}
		    if(txt.length > 250){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    return txt;
		    console.group();
		    console.log("Echo'd a message." + dash + network)
		    console.log('Message: ' + txt + '')
		    console.groupEnd();
	    },
	    sticker(txt){
		    if(txt.startsWith(prefix)){return "lolololol amazing job! let me give you a sticker!! - literally every 2nd grade teacher ever"}
		    if(!txt || txt.isEmpty() == true){return}
		    socket.emit('command', {list:['sticker',txt]})
		    console.log('Gave ' + txt + ' a sticker ' + dash + network)
	    },
	    skiddie(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){txt = "Seamus"}
		    if(txt.length > 46){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    return ([txt]+[' is a skiddie'])
		    console.log('Called somebody a script kiddie' + dash + network)
	    },
	    yt(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    var num = Math.floor(Math.random() * vaporwave_ids.length);
		    if(!txt || txt.isEmpty() == true){txt = vaporwave_ids[num]}
		    if(txt.length > 255){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    socket.emit('command', {list:['youtube',txt]})
		    console.group();
		    console.log('Played a Youtube video.' + dash + network)
		    console.log('URL: https://www.youtube.com/watch?=' + txt + '')
		    console.groupEnd();
	    },
	    sy(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    var num = Math.floor(Math.random() * spotify_playlists.length);
		    if(!txt || txt.isEmpty() == true){txt = spotify_playlists[num]}
		    socket.emit('command', {list:['spotify',txt]})
		    console.group();
		    console.log('Played a Spotify track.' + dash + network)
		    console.log('URL: ' + txt + '')
		    console.groupEnd();
	    },
	    sc(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){return}
		    socket.emit('command', {list:['soundcloud',txt]})
		    console.group();
		    console.log('Played a Soundcloud track.' + dash + network)
		    console.log('URL: ' + txt + '')
		    console.groupEnd();
	    },
	    youtube(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    var num = Math.floor(Math.random() * vaporwave_ids.length);
		    if(!txt || txt.isEmpty() == true){txt = vaporwave_ids[num]}
		    if(txt.length > 255){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    socket.emit('command', {list:['youtube',txt]})
		    console.group();
		    console.log('Played a Youtube video.' + dash + network)
		    console.log('URL: https://www.youtube.com/watch?=' + txt + '')
		    console.groupEnd();
	    },
	    spotify(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    var num = Math.floor(Math.random() * spotify_playlists.length);
		    if(!txt || txt.isEmpty() == true){txt = spotify_playlists[num]}
		    socket.emit('command', {list:['spotify',txt]})
		    console.group();
		    console.log('Played a Spotify track.' + dash + network)
		    console.log('URL: ' + txt + '')
		    console.groupEnd();
	    },
	    soundcloud(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){return}
		    socket.emit('command', {list:['soundcloud',txt]})
		    console.group();
		    console.log('Played a Soundcloud track.' + dash + network)
		    console.log('URL: ' + txt + '')
		    console.groupEnd();
	    },
	    /*vid(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){return}
		    socket.emit('command', {list:['video',txt]})
		    //return "--<br><video controls height='270' width='100%' autoplay loop><source src=" + txt.replace(/(^\w+:|^)\/\//, '//') + " type='video/mp4'></video>"
		    console.group();
		    console.log('Played a video file.' + dash + network)
		    console.log('URL: ' + txt + '')
		    console.groupEnd();
	    },
	    aud(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){return}
		    socket.emit('command', {list:['audio',txt]})
		    //return "--<br><audio controls autoplay loop><source src=" + txt.replace(/(^\w+:|^)\/\//, '//') + " type='audio/mp3'></audio>"
		    console.group();
		    console.log('Played an audio file.' + dash + network)
		    console.log('URL: ' + txt + '')
		    console.groupEnd();
	    },
	    img(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){return}
		    socket.emit('command', {list:['image',txt]})
		    //return "--<br><img width='450' height='100%' style='height: 100%; width: 100%;' src=" + txt.replace(/(^\w+:|^)\/\//, '//') + "></img>"
		    console.group();
		    console.log('Posted an image.' + dash + network)
		    console.log('URL: ' + txt + '')
		    console.groupEnd();
	    },*/
	    wtf(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    var num = Math.floor(Math.random() * wtf.length);
		    cmdcount++
		    return (wtf[num])
	    },
	    clickbait(txt){
		    if(txt.startsWith(prefix)){return "hahehaha epic clickbait lmfao heheheha fuck you"}
		    if(!txt || txt.isEmpty() == true){txt = "Seamus versus, Fune epic battle at 3am in the backrooms!"}
		    if(txt.length > 288){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    return (['omg!',':O','what?','wtf?!','wth?!','omfg!','lmao','xD','bruh'][Math.floor(Math.random()*9)]+' '+txt+' '+['(gone wrong)','(gone sexual)','(not clickbait!)','(cops called)','(no virus!)','(not fake!)','(real!?!)', '(gone sus!!)'][Math.floor(Math.random()*8)]+'\u{1F631}'.repeat(Math.ceil(Math.random()*5))+'\u{1F480}'.repeat(Math.ceil(Math.random()*3))).toUpperCase()
	    }, 
	    cyberpunk(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return 'WAKE THE FUCK UP SAMURAI, WE GOT A CITY TO BURN!!'
	    },
	    drivepower(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return "It's about drive, its about power, we stay hungry, we devour Put in the work, put in the hours and take whats ours Black and Samoan in my veins, my culture bangin with Strange I change the game so whats my motherfuckin name? Rock!!"
	    },
	    bigsmoke(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return "I'll have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda."
	    },
	    gabe(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return 'Good Evening, my name is Gabe Newell from the Microsoft team, and from analyzing your browser history we are here to inform you that your Windows XP Operating system is not valid. Your OS will be locked in 2 hours and it will stay this way until you have paid for the Microsoft product. If you have any questions or concerns please do not hesitate to go fucking kill yourself!'
	    },
	    bonzibuddy(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return 'Welcome to my world of BonziBUDDY! I will explore the Internet with you as your very own friend and sidekick!  I can talk, walk, joke, browse, search, e-mail, and download like no other friend you have ever had!  I even have the ability to compare prices on the products you love and help you save money! Best of all, I AM FREE!'
	    },
	    bonzibuddy2(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return 'Well, hello there! I do not believe we have been properly introduced. I am BonziBUDDY! Nice to meet you! Since this is the first time we have met, I would like to tell you a little about myself. I am your friend and BonziBUDDY! I have the ability to learn from you. The more we browse, search, and travel the internet together, the smarter I will become! Not that I am not already smart!'
	    },
	    pacertest(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return 'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.'
	    },
	    navy(txt) {
		    if(txt.startsWith(prefix)){return "hahahaha nice copypasta lmao hahaha fuck you"}
		    cmdcount++
		    return "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever' comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, skiddo."
	    },
	    asshole(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice asshole... no homo lmao"}
		    if(!txt || txt.isEmpty() == true){txt = "Fune"}
		    if(txt.length > 176){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    socket.emit('command', {list:['asshole',txt]})
		    console.log('Assholed ' + txt + dash + network)
	    },
	    joke(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice joke lmao hahaha fuck you"}
		    cmdcount++
		    socket.emit('command', {list:['joke']})
		    console.log('Telling a joke.' + dash + network)
	    },
	    fact(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice fact lmao hahaha fuck you"}
		    cmdcount++
		    socket.emit('command', {list:['fact']})
		    console.log('Spitting fax.' + dash + network)
	    },
	    bees(txt){
		    if(txt.startsWith(prefix)){return "ya like jazz?"}
		    cmdcount++
		    socket.emit('command', {list:['bees']})
		    console.log('Ya like jazz?' + dash + network)
	    },
	    linux(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice linux distro xD hahaha fuck you windows is better"}
		    cmdcount++
		    socket.emit('command', {list:['linux']})
		    console.log('Flexing on Windows.' + dash + network)
	    },
	    triggered(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    socket.emit('command', {list:['triggered']})
		    console.log('U mad bro?' + dash + network)
	    },
	    pawn(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return "Hi, my name is BonziBUDDY, and this is my website. I meme here with my old harambe, and my son, Clippy. Everything in here has an ad and a fact. One thing I've learned after 17 years - you never know what is gonna give you some malware."
		    console.log('Hi, my name is BonziBUDDY!' + dash + network)
	    },
	    vaporwave(txt){
		    if(txt.startsWith(prefix)){return "A E S T H E T I C"}
		    cmdcount++
		    var num = Math.floor(Math.random() * vaporwave_ids.length);
		    socket.emit('command', {list:['youtube',vaporwave_ids[num]]})
		    console.log('ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ' + dash + network)
	    },
	    coinflip(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if (Math.random() < 0.5) {
                	return "The coin has landed on, <b>tails</b><div><h6>Dont ask where sonic is</h6>"
                	//return "--<br>The coin has landed on, <b>tails</b><div><h6>Dont ask where sonic is</h6>"
		    } else {
                	return "The coin has landed on, <b>heads</b>"
                	//return "--<br>The coin has landed on, <b>heads</b>"
		    }
	    },
	    "8ball"(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){return}
		    if(txt.length > 246){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    var num = Math.floor(Math.random() * Math.floor(eight_ball.length));
		    cmdcount++
            return "\u{1F3B1} " + eight_ball[num]
		    //return "- \u{1F3B1} " + eight_ball[num]
	    },
	    kill(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){txt = "BonziBuddy"}
		    if(txt.length > 66){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    //socket.emit("talk", {text: "<b>" + txt + "</b> has been killed, ouch!",say: txt + "has been killed, ouch!"});
		    return "<b>" + txt + "</b> has been killed, ouch!"
		    //return "--<br>" + "<b>" + txt + "</b> has been killed, ouch!"
		    console.log('' + txt + ' has been murdered!' + dash + network)
	    },
	    iq(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){txt = "Seamus"}
		    if(txt.length > 56){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    if(txt.toLowerCase().includes("fune") || txt.toLowerCase().includes("fuckune") || txt.toLowerCase().includes("ziggy") || txt.toLowerCase().includes("gino")){
                	return txt + "'s IQ is: <b>" + Math.floor(Math.random() * 7) + "</b>"
                	//return "--<br>" + txt + "'s IQ is: <b>" + Math.floor(Math.random() * 15) + "</b>"
		    } else {
                	return txt + "'s IQ is: <b>" + Math.floor(Math.random() * 266) + "</b>"
                	//return "--<br>" + txt + "'s IQ is: <b>" + Math.floor(Math.random() * 200) + "</b>"
		    }
	    },
	    botver(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h3>' + name + '</h3><div><h4>Version: ' + ver + '</h4><hr><h4>Bug Fixes & Update</h4><hr>'
	    },
	    message(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){txt = "No comment."}
		    if(txt.length > 188){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    console.log('You have a new message!!\n"' + txt + '"')
		    return "<h3>A message has been sent into the command terminal. An admin monitoring the terminal will see your message!</h3>\n\n\n Your sent message: " + [txt]
		    //return "--<br><h3>A message has been sent into the command terminal. An admin monitoring the terminal will see your message!</h3>\n\n\n Your sent message: " + [txt]
	    },
	    date(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return 'The date and time is: ' + date + '.'
		    //return '--<br>The date and time is: ' + date + '.'
		    console.log('Told somebody the date and time.' + dash + network)
	    },
	    ban(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return 'HEY, EVERYONE LOOK AT THIS RETARD WHO IS TRYING TO USE ADMIN COMMANDS WITHOUT ELEVATED PERMISSION!!! JAJAJAJAJAJAJAJAAAA!! LMAO XD'
	    },
	    kick(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
		    cmdcount++
		    return 'HEY, EVERYONE LOOK AT THIS RETARD WHO IS TRYING TO USE ADMIN COMMANDS WITHOUT ELEVATED PERMISSION!!! JAJAJAJAJAJAJAJAAAA!! LMAO XD'
	    },
	    nojavascript(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice fake error lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h2>Hey! You have JavaScript disabled!</h2> <br>BonziWORLD cannot run in this browser because you have JavaScript disabled.<br>Please enable it in the page settings, and then BonziWORLD will start working correctly.'
		    console.log('Loaded javascript error message.' + dash + network)
	    },
	    error(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice fake error lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h2>BonziWORLD has encountered an error and needs to close.</h2><br> Nah, but seriously there was an error and you got disconnected from the server. Chances are, your internet just died out for a brief moment or your device went to sleep. Otherwise the server just screwed up.<br> <br> Try and reload the page. If that does not work and your internet is okay, then panic. We will probably be back up Soon™ though.<br> <br> <b>Reload?</b></a><br> <br>'
		    console.log('Loaded generic error message.' + dash + network)
	    },
	    banned(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice fake error lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){txt = "Unknown"}
		    if(txt.length > 86){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    return '--<br><h2>You got banned!</h2><br><br><b>Why? </b><br> ' + [txt] + ' <br><br><br><b>When is it over?</b><br>' + Math.floor(Math.random() * 365) + ' days'
		    console.log('Loaded ban message. Reason: ' + [txt] + dash + network)
	    },
	    kicked(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice fake error lmao hahaha fuck you"}
		    if(!txt || txt.isEmpty() == true){txt = "Unknown"}
		    if(txt.length > 86){return "HEY EVERYONE?! COME TAKE A LOOK AT THIS FUCKIN RETARD WHO IS TRYING TO MESS WITh ME! BUT I AM NOT A DUMBASS! I AM WISE! GO KYS bitch! AUTISTIC MOTHERFUCKIN KIDDIE!?"}
		    cmdcount++
		    return '--<br><h2>You got kicked!</h2><br> <br><b>Why? </b><br> ' + [txt] + ''
		    console.log('Loaded kick message. Reason: ' + [txt] + dash + network)
	    },
	    unsupported(txt){
		    if(txt.startsWith(prefix)){return "hahahaha nice fake error lmao hahaha fuck you"}
		    cmdcount++
		    return '--<br><h2>BonziWORLD cannot run on this platform.</h2><br>Unfortunately, BonziWORLD cannot run in this browser!<br>You can try to download a BonziWORLD app that works on your device, or update your browser.'
		    console.log('Loaded unsupported error message.' + dash + network)
	    },
	    mute_all(txt){
		    if(login_room != "test" || "bot_dev" || "dev" || "bot_development" || "development") {
		    if(txt.startsWith(prefix)){return "hahahaha nice fake error lmao hahaha fuck you"}
                	cmdcount++
                	return 'CosmicBOT development and testing commands are not enabled for public rooms!'
                	console.log('Blocked a development command.' + dash + network)
		    } else {
                	if(txt.startsWith(prefix)){return "hahahaha nice command lmao hahaha fuck you"}
                	cmdcount++
                	return '[[llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll BEGONE_KIDDIE.bat<br><b>Muted All</b>'
                	console.log('Killed the entire fucking tts.' + dash + network)
		    }
	    }
};

console.log(commands);


socket.on('talk',function(data){
    //console.log(data.name + " " + "(" + data.guid + ")" + " " + data.text);
    var text = data.text;
    if(text.toLowerCase().startsWith(prefix)){
        text = text.slice(2)
        var cmd = text.split(' ')[0]
        var oth = text.slice(cmd.length+1)
        if(Object.keys(commands).includes(cmd)){
            var command = commands[cmd](oth)
            setTimeout(function(){
                socket.emit('talk',{text:command})
            },cmd_delay)
        } else {
            setTimeout(function(){
                socket.emit('talk',{text:"Sorry, that command doesn't exist!"})
            },cmd_delay)
        }
    }
});

/*socket.on('reconnect', ()=>{
    reconnect()
});*/

socket.on('disconnect', ()=>{
    reconnect()
});
