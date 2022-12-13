const audio = {
    portal: new Audio('audio/Beamer.wav'),
    ball: new Audio('audio/Kugel.wav'),
    apple: new Audio('audio/Apfel.wav'),
    color: new Audio('audio/Fleck.wav'),
    win: [
        new Audio('audio/Pushy1.wav'),
        new Audio('audio/Pushy2.wav'),
        new Audio('audio/Pushy3.wav'),
        new Audio('audio/Pushy4.wav'),
        new Audio('audio/Pushy5.wav'),
        new Audio('audio/Pushy6.wav'),
        new Audio('audio/Pushy7.wav'),
        new Audio('audio/Pushy8.wav'),
        new Audio('audio/Pushy9.wav'),
        new Audio('audio/Pushy10.wav'),
        new Audio('audio/Pushy11.wav'),
        new Audio('audio/Pushy12.wav'),
        new Audio('audio/Pushy13.wav'),
        new Audio('audio/Pushy14.wav'),
        new Audio('audio/Pushy15.wav'),
        new Audio('audio/Pushy16.wav'),
        new Audio('audio/Pushy17.wav'),
        new Audio('audio/Pushy18.wav'),
        new Audio('audio/Pushy19.wav'),
        new Audio('audio/Pushy20.wav'),
        new Audio('audio/Pushy21.wav'),
        new Audio('audio/Pushy22.wav'),
        new Audio('audio/Pushy23.wav')
    ]
};

function playSound(name) {
    let file;
    if (audio[name].length === undefined) {
        file = audio[name];
    } else {
        // Play a random sound from a range
        file = audio[name][Math.floor(Math.random() * audio[name].length)];    
    };
    file.pause();
    file.currentTime = 0;
    file.play();
};