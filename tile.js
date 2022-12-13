const ts = 32; // Tile size

const tiles = {
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