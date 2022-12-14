let ts;
if (window.innerWidth > 20 * 64 && window.innerHeight > 12 * 64) {
    ts = 64;
} else {
    ts = 32;
};

const assigned_houses = {
    51: 'green',
    52: 'yellow',
    53: 'orange',
    54: 'red',
    55: 'pink',
    56: 'purple',
    57: 'blue',
    58: 'cyan',
    59: 'gray'
}

const tiles = {
    50: 'pushyeditor',
    51: 'housegreen',
    52: 'houseyellow',
    53: 'houseorange',
    54: 'housered',
    55: 'housepink',
    56: 'housepurple',
    57: 'houseblue',
    58: 'housecyan',
    59: 'housegray',
    0: 'empty',
    1: 'wall',
    2: 'house',
    3: 'box',
    103: 'box', // on Boxgoal
    203: 'box', // on Button
    303: 'box', // on Buttonwall
    4: 'greenball',
    5: 'greengoal',
    104: 'greenball', // on Boxgoal
    204: 'greenball', // on Button
    304: 'greenball', // on Buttonwall
    6: 'redball',
    7: 'redgoal',
    106: 'redball', // on Boxgoal
    206: 'redball', // on Button
    306: 'redball', // on Buttonwall
    8: 'blueball',
    9: 'bluegoal',
    108: 'blueball', // on Boxgoal
    208: 'blueball', // on Button
    308: 'blueball', // on Buttonwall
    10: 'portal',
    11: 'boxgoal', // Unoccupied
    12: 'footprint',
    13: 'apple',
    14: 'button',
    15: 'wallclosed',
    16: 'wallopen',
    17: 'greencolor',
    18: 'redcolor',
    19: 'bluecolor',
    20: 'lightning'
};