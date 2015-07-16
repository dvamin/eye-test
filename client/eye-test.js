(function Game(){
    var BEEP = "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=";

    var SPACEBAR = 32;
    var TIME_LIMIT_PER_ATTEMPT = 15000;
    var PENALTY_TIME_LOSS = 3000;
    var NEW_GAME_TIMEOUT = 5000;
    var INIT_LEVEL = 2;
    var ATTEMPTS_PER_LEVEL = 4;
    var GAME_DIMENSIONS = {
        HEIGHT: "600px",
        WIDTH: "600px",
    };
    var NORMAL_CLASS  = "normal";
    var SPECIAL_CLASS = "special";

    function getStyleArray(level) {
        var arr = [];
        for (var i = 0; i < level; ++i) {
            for (var j = 0; j < level; ++j) {
                arr.push(NORMAL_CLASS);
            }
        }
        arr[Math.floor(Math.random() * level * level)] = SPECIAL_CLASS;
        return arr;
    };

    function generateColors(level) {
        var VARY_MAX = 65; // Max variation in R, G, or B
        var VARY_MIN = 30; // Min variation in R, G, or B

        var COL_MAX = 240; // Supports max value of 240 for R, G, or B
        var COL_MIN = 25;  // Supports max value of 25 for R, G, or B

        var varySize =
                  (VARY_MAX - level) >= VARY_MIN ? VARY_MAX - level : VARY_MIN;
        var varyIndex = Math.floor(Math.random()*3); //0:red; 1:green; 2:blue
        var addSub = Math.floor(Math.random()*2); // 0:add; 1:sub

        // Let us consider colors only between 25,25,25 and 240,240,240

        var normalColors = [
            COL_MIN + Math.floor(Math.random() * (COL_MAX - COL_MIN)),
            COL_MIN + Math.floor(Math.random() * (COL_MAX - COL_MIN)),
            COL_MIN + Math.floor(Math.random() * (COL_MAX - COL_MIN))
        ];
        var specialColors = [
            normalColors[0], normalColors[1], normalColors[2]
        ];

        if (0 === addSub) {
            if (specialColors[varyIndex] + varySize > COL_MAX) {
                specialColors[varyIndex] -= varySize;
            }
            else {
                specialColors[varyIndex] += varySize;
            }
        }
        else {
            if (specialColors[varyIndex] - varySize >COL_MIN) {
                specialColors[varyIndex] += varySize;
            }
            else {
                specialColors[varyIndex] = varySize;
            }
        }

        var retObj = {};
        retObj[NORMAL_CLASS] = "rgb(" + normalColors[0] + "," +
                                 normalColors[1] + "," + normalColors[2] + ")";
        retObj[SPECIAL_CLASS] = "rgb(" + specialColors[0] + "," +
                               specialColors[1] + "," + specialColors[2] + ")";
        return retObj;
    };

    function GameContainer(timerFactory) {
        this.timerFactory = timerFactory;

        $("#container").css("width", GAME_DIMENSIONS.WIDTH);
        $("#container").css("height",GAME_DIMENSIONS.HEIGHT);

        this.level = INIT_LEVEL;
        this.attempt = 0;
    }

    GameContainer.prototype.draw = function () {
        // Clear out the container

        $("#container").empty();

        // Append <div>s to the container

        var styleArray = getStyleArray(this.level);;
        var numBlocks = this.level * this.level;
        for (var i = 0; i < numBlocks; ++i) {
            var $div = $("<div>", {class: styleArray[i]});
            $("#container").append($div);
        }

        // Get colors

        var colors = generateColors();
        $(".normal").css("background", colors[NORMAL_CLASS]);
        $(".special").css("background", colors[SPECIAL_CLASS]);

        // Get margin

        $(".normal,.special").css("margin", this.level >= 10 ? "0.5%" : "1%");

        // Get blocksize percentage

        var blockSizePc = Math.floor((100 - this.level*3) / this.level) + "%";
        $(".normal,.special").css("width", blockSizePc);
        $(".normal,.special").css("height", blockSizePc);

        // Configure click

        $(".special").click(this.iterate.bind(this, true));
        $(".normal").click(this.iterate.bind(this, false));
    };

    GameContainer.prototype.end = function () {
        // Remove event handlers

        $(".normal,.special").off("click");

        // Update background of normal tiles to black

        $(".normal").css("background", "rgb(0, 0, 0)");
    };

    GameContainer.prototype.score = function () {
        return this.attempt;
    };

    GameContainer.prototype.iterate = function (success) {
        if (!success) {
            if (!this.activeTimer) {
                this.activeTimer = this.timerFactory.get();
            }
            this.activeTimer.penalize();
            return;                                                   // RETURN
        }

        ++this.attempt;
        if (this.activeTimer) {
            this.activeTimer.stop();
            console.log("You took " +
             (TIME_LIMIT_PER_ATTEMPT - this.activeTimer.get())/1000 + " secs. "
                       + "Score: " + this.attempt);
        }
        this.activeTimer = this.timerFactory.get();
        if (0 === this.attempt % ATTEMPTS_PER_LEVEL) {
            ++this.level;
        }
        this.draw();
    };

    function Timer(expireCallback) {
        this.onExpire = expireCallback;
        this.counter = TIME_LIMIT_PER_ATTEMPT;
        this.paused = false;
        this.start();
    };

    Timer.prototype.start = function () {
        this.handle = setTimeout(function () {
            this.counter -= 500;
            var timeLeft = this.counter/1000 > 0 ? this.counter/1000 : 0;
            console.log("Time left: " + timeLeft + " secs.");
            if (this.counter > 0) {
                if (this.counter <= 5000 && 0 === this.counter % 1000) {
                    (new Audio(BEEP)).play();
                }
                this.start();
            }
            else {
                this.onExpire();
            }
        }.bind(this), 500);
    };

    Timer.prototype.stop = function () {
        clearTimeout(this.handle);
    };

    Timer.prototype.get = function () {
        return this.counter;
    };

    Timer.prototype.penalize = function () {
        this.counter -= PENALTY_TIME_LOSS;
        if (this.counter <= 0) {
            this.onExpire();
        }
    };

    Timer.prototype.pause = function () {
        clearTimeout(this.handle);
    };

    Timer.prototype.unpause = function () {
        this.start();
    };

    function TimerFactory(expireCallback) {
        this.onExpire = expireCallback;
    };

    TimerFactory.prototype.get = function () {
        return new Timer(this.onExpire);
    };

    function Game(onEnd) {
        this.onEnd = onEnd;
        this.timerFactory = new TimerFactory(function () {
            if (Game.STATE.TERMINATED !== this.state) {
                this.state = Game.STATE.TERMINATED;
                alert("You LOST! Score: '" + this.game.score() + "'");
                this.game.end();
                setTimeout(this.onEnd, NEW_GAME_TIMEOUT);
            }
        }.bind(this));
        this.game = new GameContainer(this.timerFactory);
        this.state = Game.STATE.INIT;
    }

    Game.STATE = {
        INIT: "init",
        RUNNING: "running",
        PAUSED: "paused",
        TERMINATED: "terminated"
    };

    Game.prototype.start = function () {
        this.game.draw();
    };

    Game.prototype.togglePause = function () {
        if (Game.STATE.RUNNING === this.state) {
            this.state = Game.STATE.PAUSED;
        }
        else if (Game.STATE.PAUSED === this.state) {
            this.state = Game.STATE.RUNNING;
        }
        this.game.draw();
    };

    Game.prototype.connectToEvents = function () {
        $(document).keydown(function (event) {
            var key = event.which;
            switch (key) {
            case SPACEBAR: {
                this.togglePause();
            } break;
            }
        }.bind(this));
    };

    this.init = function () {
        this.game = new Game(this.init.bind(this));
        this.game.connectToEvents();
        this.game.start();
    };

    $(document).ready(this.init.bind(this));
})();
