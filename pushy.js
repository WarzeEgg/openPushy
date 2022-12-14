let active_pushys = [
    {color: 'green', controls: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']},
    {color: 'yellow', controls: ['w', 'd', 's', 'a']}
];

function mobileMove(key) {
    level.pushys.forEach((pushy) => {
        pushy.move({key: key});
    })
}

class Pushy {
    constructor(level, x, y, controls, color = 'green', hash) {
        this.level = level;
        this.x = x;
        this.y = y;
        this.controls = controls;
        this.orientation = 0;
        this.img = new Image();
        this.color = color;
        this.img.src = `tiles/pushy${color}.png`;
        this.img.width = ts;
        this.img.height = ts;
        this.img.classList.add('pushy');
        this.footprint = false;
        this.electrocuted = false;
        this.cancontrol = true;
        this.hash = hash;
        con.appendChild(this.img);
        this.render();
        window.addEventListener('keydown', (event) => this.move(event));
    }
    move(event) {
        if (!this.cancontrol || level.finished || this.hash !== level.hash) {

            if (level.finished && [' ','Enter'].includes(event.key)) {
                nextLevel();
            };
            return;
        };

        // Convert the key stroke to an orientation
        const orientation = this.controls.indexOf(event.key);
        if (orientation === -1) {
            return;
        };

        // Coordinate changes based on direction
        let diff_x = 0;
        let diff_y = 0;
        switch(orientation) {
            case 0:
                diff_y --;
                break;
            case 1:
                diff_x ++;
                break;
            case 2:
                diff_y ++;
                break;
            case 3:
                diff_x --;
                break;
        };

        let can_move = false;
        let will_win = false;
        let will_teleport = false;

        // The tile pushy is moving into
        const one_x = this.x + diff_x;
        const one_y = this.y + diff_y;

        // The tile behind that tile (Used for pushing objects)
        const two_x = this.x + diff_x * 2;
        const two_y = this.y + diff_y * 2;

        // Prevent walking off edge because it causes an error
        if (one_x < 0 || one_y < 0) {
            return;
        };
        if (one_x >= level.ld[0].length || one_y >= level.ld.length) {
            return;
        };

        const target = level.ld[one_y][one_x];
        switch (target) {
            case 0: // Empty
                if (this.footprint) {
                    level.ld[one_y][one_x] = 12;
                    level.render();
                };
                can_move = true;
                break;
            case 5: // Ball goals
            case 7:
            case 9:
            case 11: // Unoccupied Box goal
            case 14: // Button
            case 16: // Open button wall
            case 17: // Ball colors
            case 18:
            case 19:
                can_move = true;
                break;
            case 1: // Wall
                break;
            case 2: // House
            case 51: // House of colors
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
                let correct_house = false;
                if (target == 2) {
                    can_move = true;
                    correct_house = true;
                } else if (assigned_houses[target] == this.color) {
                    can_move = true;
                    correct_house = true;
                } else {
                    can_move = false;
                }

                if (correct_house) {
                    will_win = true;
                    for (let y = 0; y < level.ld.length; y ++) {
                        for (let x = 0; x < level.ld[0].length; x ++) {
                            // Check for uncleared conditions
                            if ([11,13,4,104,204,304,6,106,206,306,8,108,208,308].includes(level.ld[y][x])) {
                                will_win = false;
                            }
                        }
                    };
                };
                break;
            case 3: // Box
            case 103: // Occupied box goals by box
            case 203: // Occupied button by box
            case 303: // Occupied button wall by box
            case 4: // Balls
            case 104: // Occupied box goals by balls
            case 204: // Occupied buttons by balls
            case 304: // Occupied button wall by balls
            case 6:
            case 106:
            case 206:
            case 306:
            case 8:
            case 108:
            case 208:
            case 308:
                let left_behind = 0;

                if (this.footprint) {
                    left_behind = 12;
                };

                let new_target = level.ld[one_y][one_x];

                // Box goal conversion
                if (target > 100 && target < 200) {
                    left_behind = 11;
                    new_target -= 100;
                };

                // Button conversion
                if (target > 200 && target < 300) {
                    left_behind = 14;
                    new_target -= 200;
                };

                // Button wall conversion
                if (target > 300 && target < 400) {
                    left_behind = 16;
                    new_target -= 300;
                }

                if ([0,11,14,16].includes(level.ld[two_y][two_x])) {
                    // Simply move the object one tile forward
                    can_move = true;

                    // Convert tile if pushed onto boxgoal
                    if (level.ld[two_y][two_x] === 11) {
                        new_target += 100;
                    };

                    // Convert tile if pushed onto button
                    if (level.ld[two_y][two_x] === 14) {
                        new_target += 200;
                    };

                    // Convert tile if pushed onto button wall
                    if (level.ld[two_y][two_x] === 16) {
                        new_target += 300;
                    };
                    
                    level.ld[two_y][two_x] = new_target;
                    level.ld[one_y][one_x] = left_behind;
                    level.render();
                };

                // Push ball into appropriate goal
                if ([4,6,8].includes(new_target) && new_target + 1 == level.ld[two_y][two_x]) {
                    can_move = true;
                    level.ld[one_y][one_x] = left_behind;
                    level.render();
                    playSound('ball');
                }

                // Push ball into color
                if ([4,6,8].includes(new_target) && [17,18,19].includes(level.ld[two_y][two_x])) {
                    can_move = true;
                    level.ld[one_y][one_x] = left_behind;

                    // Change the color of the ball
                    let new_ball_color;
                    switch(level.ld[two_y][two_x]) {
                        case 17:
                            new_ball_color = 4;
                            break;
                        case 18:
                            new_ball_color = 6;
                            break;
                        case 19:
                            new_ball_color = 8;
                            break;
                    };
                    level.ld[two_y][two_x] = new_ball_color;

                    level.render();
                    playSound('color');
                }
                break;
            case 10: // Portal
                can_move = true;
                will_teleport = true;
                break;
            case 12: // Footprint
                can_move = true;
                if (!this.footprint) {
                    playSound('footprint');
                };
                this.footprint = true;
                break;
            case 13: // Apple
                can_move = true;

                // Eat the apple
                level.ld[one_y][one_x] = (this.footprint ? 12 : 0);
                level.render();
                playSound('apple');
                break;
            case 20: // Lightning
                can_move = true;

                if (this.electrocuted) {
                    // To Do
                    this.cancontrol = false;
                };

                this.electrocuted = true;
                break;
        };
        if (can_move) {
            this.x += diff_x;
            this.y += diff_y;
        };
        if (will_teleport) {
            if (level.portals.primary.x === this.x && level.portals.primary.y === this.y) {
                // Go in secondary portal if primary portal was entered
                if (level.portals.secondary) {
                    this.x = level.portals.secondary.x;
                    this.y = level.portals.secondary.y;
                }
            } else {
                // Otherwise go to primary portal
                this.x = level.portals.primary.x;
                this.y = level.portals.primary.y;
            };
            playSound('portal');
        };
        if (will_win) {
            playSound('win');
            level.finish();
        };
        this.orientation = orientation;
        this.render();
    }
    render() {
        this.img.style.top = this.y * ts + 'px';
        this.img.style.left = this.x * ts + 'px';
        this.img.style.transform = `rotateZ(${this.orientation * 90}deg)`;
    }
    destroy() {
        this.destroy = true;
    }
}