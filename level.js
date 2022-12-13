const con = document.getElementById('levelContainer');
const cvs = document.getElementById('level');
const ctx = cvs.getContext('2d');
let level;

function generate2Darray(width, height) {
    return Array(height).fill().map(() => Array(width).fill(0));
}

const load = function() {
    return new Promise(function(resolve, reject) {
        let loaded = 0;
        const tile_ids = Object.keys(tiles);
        tile_ids.forEach((id) => {
            const img = new Image();
            img.src = `tiles/${tiles[id]}.png`;
            img.onload = function() {
                loaded ++;
                tiles[id] = this;
                if (loaded == tile_ids.length) {
                    resolve();
                }
            }
        })
    })
};

class Level {
    constructor(width, height, leveldata = []) {
        cvs.width = width * ts;
        this.width = width;
        con.style.width = width * ts + 'px';
        cvs.height = height * ts;
        this.height = height;
        con.style.height = height * ts + 'px';
        this.ld = generate2Darray(width, height);
        this.portals = {primary: false, secondary: false};
        this.buttonpressed = false;
        if (leveldata.length !== 0) {
            for (let y = 0; y < leveldata.length; y ++) {
                for (let x = 0; x < leveldata[0].length; x ++) {
                    this.ld[y][x] = leveldata[y][x];

                    // Portal indexing
                    if (leveldata[y][x] == 10) {
                        if (this.portals.primary === false) {
                            this.portals.primary = {'x': x, 'y': y};
                        } else if (this.portals.secondary === false) {
                            this.portals.secondary = {'x': x, 'y': y};
                        }
                    }
                }   
            }
        };
        this.render();
    }
    update() {
        this.buttonpressed = false;
        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                // Check if there is a button occupied by any movable object
                if ([203, 204, 206, 208].includes(this.ld[y][x])) {
                    this.buttonpressed = true;
                }
            }
        };

        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                // Replace all button wall tiles
                if ([15,16].includes(this.ld[y][x])) {
                    this.ld[y][x] = (this.buttonpressed ? 16 : 15);
                }
            }
        };
    }
    render() {
        this.update();
        ctx.imageSmoothingEnabled = false;
        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                const tile_id = this.ld[y][x];
                ctx.drawImage(tiles[tile_id], x * ts, y * ts, ts, ts)
            }
        }
    }
}

function nextLevel() {
    document.getElementById('winContainer').style.display = 'none';
}