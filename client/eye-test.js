(function Game(){
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
            console.log("Time left: " + this.counter/1000 + " secs.");
            if (this.counter > 0) {
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
