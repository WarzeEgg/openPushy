let current_level = 1;
let current_world = '';

load().then(() => {
    resetGUI()
});

function resetGUI() {
    level = new Level(levels['level' + current_world + current_level]);
    document.getElementById('winContainer').style.display = 'none';
    const title = document.getElementById('levelTitle');
    title.innerText = 'Level ' + current_level;
    const levelid = document.getElementById('levelID');
    levelid.innerText = current_level;
    playSound('gui');
}

function nextLevel() {
    if (current_level >= 135) {
        return;
    }
    current_level ++;
    resetGUI();
}

function previousLevel() {
    if (current_level <= 0) {
        return;
    }
    current_level --;
    resetGUI();
}

function goToWorld(world = '') {
    current_world = world;
    current_level = 1;
    resetGUI()
}

function goToLevel(level = prompt('Level eingeben:')) {
    if ([null,''].includes(level)) {
        return;
    };
    current_level = parseInt(level);
    resetGUI();
}

document.body.onkeydown = function(event) {
    if (event.key === 'End') {
        editorControls();
        document.getElementById('editorContainer').style.display = 'block';
    } else if (event.key === 'r') {
        if (!confirm('Willst du neu starten?')) {
            return;
        };
        resetGUI();
    }
}