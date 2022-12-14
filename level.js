const con = document.getElementById('levelContainer');
let cvs;
let ctx;
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
    constructor(leveldata = [[0]]) {
        con.innerHTML = '';
        cvs = document.createElement('canvas');
        cvs.id = 'level';
        con.appendChild(cvs);
        ctx = cvs.getContext('2d');
        const width = leveldata[0].length;
        const height = leveldata.length;
        cvs.width = width * ts;
        this.width = width;
        con.style.width = width * ts + 'px';
        cvs.height = height * ts;
        this.height = height;
        con.style.height = height * ts + 'px';
        this.ld = generate2Darray(width, height);
        this.pushys = [];
        this.hash = Math.floor(Math.random() * 1000000);
        this.finished = false;
        this.portals = {primary: false, secondary: false};
        this.activering = false;
        this.connectedrings = [];
        this.buttonpressed = false;
        let spawned_pushys = 0;
        if (leveldata.length !== 0) {
            for (let y = 0; y < leveldata.length; y ++) {
                for (let x = 0; x < leveldata[0].length; x ++) {
                    this.ld[y][x] = leveldata[y][x];

                    // Spawn spots for pushy
                    if (this.ld[y][x] == 50) {
                        if (spawned_pushys >= active_pushys.length) {
                            alert("There are not enough players");
                        } else {
                            this.ld[y][x] = 0;
                            const new_pushy = active_pushys[spawned_pushys];
                            const pushy = new Pushy(this, x, y, new_pushy.controls, new_pushy.color, this.hash);
                            this.pushys.push(pushy);
                            spawned_pushys ++;
                        }
                    }

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
        const buttonpressedbefore = this.buttonpressed
        this.buttonpressed = false;
        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                // Check if there is a button occupied by any movable object
                if ([203, 204, 206, 208].includes(this.ld[y][x])) {
                    this.buttonpressed = true;
                }
            }
        };
        if (buttonpressedbefore != this.buttonpressed) {
            playSound('button');
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
        };
        this.connectedrings.forEach((connection) => {
            ctx.strokeStyle = '#D00';
            const px = ts / 32;
            ctx.lineWidth = px;
            ctx.beginPath();
            ctx.setLineDash([px * 5, px * 5]);
            ctx.moveTo(connection[0][0] * ts + ts / 2, connection[0][1] * ts + ts / 2);
            ctx.lineTo(connection[1][0] * ts + ts / 2, connection[1][1] * ts + ts / 2);
            ctx.stroke();
        });
    }
    export() {
        // Render pushys as start points
        this.pushys.forEach((pushy) => {
            this.ld[pushy.y][pushy.x] = 50;
        });

        let out = '[';
        for (let y = 0; y < this.height; y ++) {
            out += '[';
            for (let x = 0; x < this.width; x ++) {
                out += this.ld[y][x];
                out += ',';
            }
            out = out.slice(0, -1);
            out += '],';
        }
        out = out.slice(0, -1);
        out += ']';
        console.log(out);
    }
    finish() {
        document.getElementById('winContainer').style.display = 'block';
        this.finished = true;
    }
};

function nextLevel() {
    document.getElementById('winContainer').style.display = 'none';
}