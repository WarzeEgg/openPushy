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
    403: 'box', // on Dicegoal
    4: 'greenball',
    5: 'greengoal',
    104: 'greenball', // on Boxgoal
    204: 'greenball', // on Button
    304: 'greenball', // on Buttonwall
    404: 'greenball', // on Dicegoal
    6: 'redball',
    7: 'redgoal',
    106: 'redball', // on Boxgoal
    206: 'redball', // on Button
    306: 'redball', // on Buttonwall
    406: 'redball', // on Dicegoal
    8: 'blueball',
    9: 'bluegoal',
    108: 'blueball', // on Boxgoal
    208: 'blueball', // on Button
    308: 'blueball', // on Buttonwall
    408: 'blueball', // on Dicegoal
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
    20: 'lightning',
    21: 'key',
    22: 'lock',
    23: 'bullet',
    24: 'target',
    124: 'target', // on Boxgoal
    224: 'target', // on Button
    324: 'target', // on Buttonwall
    424: 'target', // on Dicegoal
    25: 'inverter',
    26: 'speedpower',
    27: 'starbox',
    127: 'starbox',
    227: 'starbox',
    327: 'starbox',
    427: 'starbox',
    28: 'diceblue',
    128: 'diceblue',
    228: 'diceblue',
    328: 'diceblue',
    428: 'diceblue',
    29: 'dicered',
    129: 'dicered',
    229: 'dicered',
    329: 'dicered',
    429: 'dicered',
    30: 'diceyellow',
    130: 'diceyellow',
    230: 'diceyellow',
    330: 'diceyellow',
    430: 'diceyellow',
    31: 'dicegoal',
    32: 'ring',
    33: 'ringspin',
    34: 'ringblock'
};