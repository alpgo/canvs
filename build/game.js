/**
 * 游戏渲染基本对象
 */
var eg;
(function (eg) {
    var objects = [];
    function getStageWidth() {
        return eg.context.canvas.width;
    }
    eg.getStageWidth = getStageWidth;
    function getStageHeight() {
        return eg.context.canvas.height;
    }
    eg.getStageHeight = getStageHeight;
    function setStageWidth(value) {
        eg.context.canvas.width = value;
    }
    eg.setStageWidth = setStageWidth;
    function setStageHeight(value) {
        eg.context.canvas.height = value;
    }
    eg.setStageHeight = setStageHeight;
    function addObject(obj) {
        objects.push(obj);
    }
    eg.addObject = addObject;
    function removeObject(obj) {
    }
    eg.removeObject = removeObject;
    function render() {
        eg.context.clearRect(0, 0, eg.context.canvas.width, eg.context.canvas.height);
        objects.forEach(function (obj) {
            eg.context.save();
            var m = obj.getMatrix();
            eg.context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            eg.context.drawImage(obj.image, -obj.anchorOffsetX, -obj.anchorOffsetY);
            eg.context.restore();
        });
    }
    eg.render = render;
    var DisplayObject = (function () {
        function DisplayObject(url) {
            this.$matrix = new eg.Matrix();
            this.$anchorOffsetX = 0;
            this.$anchorOffsetY = 0;
            this.$x = 0;
            this.$y = 0;
            this.$scaleX = 1;
            this.$scaleY = 1;
            this.$rotation = 0;
            this.url = url;
        }
        Object.defineProperty(DisplayObject.prototype, "image", {
            get: function () {
                return eg.getRes(this.url);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.getMatrix = function () {
            this.$matrix.tx = this.$x;
            this.$matrix.ty = this.$y;
            var rad = this.$rotation * Math.PI / 180;
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);
            this.$matrix.a = cos * this.$scaleX;
            this.$matrix.b = sin * this.$scaleX;
            this.$matrix.c = -sin * this.$scaleY;
            this.$matrix.d = cos * this.$scaleY;
            return this.$matrix;
        };
        Object.defineProperty(DisplayObject.prototype, "width", {
            get: function () {
                return this.image ? this.image.width : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            get: function () {
                return this.image ? this.image.height : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetX", {
            get: function () {
                return this.$anchorOffsetX;
            },
            set: function (value) {
                this.$anchorOffsetX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "anchorOffsetY", {
            get: function () {
                return this.$anchorOffsetY;
            },
            set: function (value) {
                this.$anchorOffsetY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "x", {
            get: function () {
                return this.$x;
            },
            set: function (value) {
                this.$x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "y", {
            get: function () {
                return this.$y;
            },
            set: function (value) {
                this.$y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            get: function () {
                return this.$scaleX;
            },
            set: function (value) {
                this.$scaleX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            get: function () {
                return this.scaleY;
            },
            set: function (value) {
                this.$scaleY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scale", {
            set: function (value) {
                this.scaleX = value;
                this.scaleY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            get: function () {
                return this.$rotation;
            },
            set: function (value) {
                this.$rotation = value;
            },
            enumerable: true,
            configurable: true
        });
        return DisplayObject;
    }());
    eg.DisplayObject = DisplayObject;
})(eg || (eg = {}));
var eg;
(function (eg) {
    var Matrix = (function () {
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        return Matrix;
    }());
    eg.Matrix = Matrix;
})(eg || (eg = {}));
/**
 * 资源加载
 */
var eg;
(function (eg) {
    // 资源缓存
    var resCache = {};
    // 获取资源
    function getRes(url) {
        var image = resCache[url];
        !image && console.warn("\u8D44\u6E90" + url + "\u4E0D\u5B58\u5728");
        return image;
    }
    eg.getRes = getRes;
    // 加载一张图片
    function loadImage(url, complete) {
        if (resCache[url]) {
            return;
        }
        var image = new Image();
        image.src = url;
        image.onload = function () {
            resCache[url] = image;
            complete();
        };
    }
    eg.loadImage = loadImage;
    // 加载一组图片
    function loadImageArray(arr, complete) {
        var length = arr.length;
        arr.forEach(function (url) {
            loadImage(url, function () {
                length--;
                if (length <= 0) {
                    complete();
                }
            });
        });
    }
    eg.loadImageArray = loadImageArray;
})(eg || (eg = {}));
/**
 * 游戏循环时间控制
 */
var eg;
(function (eg) {
    var callbackList = [];
    // 游戏初始化
    function gameInit() {
        // init canvas
        var canvas = document.getElementById('canvas');
        eg.context = canvas.getContext('2d');
        // start game
        startTicker();
    }
    eg.gameInit = gameInit;
    gameInit();
    // <F:EgretWeb.ts><M:startTicker>
    // 游戏循环心跳
    function startTicker() {
        var requestAnimationFrame = window["requestAnimationFrame"];
        requestAnimationFrame(onTicker);
        function onTicker() {
            gameLoop();
            requestAnimationFrame(onTicker);
        }
    }
    // 游戏循环渲染
    function gameLoop() {
        callbackList.forEach(function (fn) { return fn(); });
        eg.render();
    }
    // 每帧定时器
    function frameLoop(fn) {
        callbackList.push(fn);
    }
    eg.frameLoop = frameLoop;
})(eg || (eg = {}));
var game;
(function (game) {
    var picAssets = [
        "assets/cr2.gif",
        "assets/h1.gif",
        "assets/h2.gif",
        "assets/h3.gif"
    ];
    // 游戏入口
    function startGame() {
        eg.loadImageArray(picAssets, main);
    }
    game.startGame = startGame;
    function main() {
        eg.setStageWidth(600);
        eg.setStageHeight(400);
        var bg = new eg.DisplayObject("assets/cr2.gif");
        eg.addObject(bg);
        bg.x = eg.getStageWidth() / 2;
        bg.y = eg.getStageHeight() / 2;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        bg.scale = 1.2;
        eg.frameLoop(function () {
            bg.rotation += 1;
        });
    }
})(game || (game = {}));
//# sourceMappingURL=game.js.map