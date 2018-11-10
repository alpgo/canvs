var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var eg;
(function (eg) {
    // 左右循环运动
    function moveLeftRight(obj, left, right) {
        var step = 1;
        eg.frameLoop(function () {
            obj.x += step;
            if (obj.x <= left) {
                step = 1;
            }
            else if (obj.x >= right) {
                step = -1;
            }
            else { }
        });
    }
    eg.moveLeftRight = moveLeftRight;
    // 缩放比例振动
    function scaleLowHigh(obj, low, high) {
        var step = 0.005;
        eg.frameLoop(function () {
            obj.scale = obj.scaleX + step;
            if (obj.scaleX <= low) {
                step = 0.005;
            }
            else if (obj.scaleX >= high) {
                step = -0.005;
            }
            else { }
        });
    }
    eg.scaleLowHigh = scaleLowHigh;
})(eg || (eg = {}));
/**
 * 游戏渲染基本对象
 */
var eg;
(function (eg) {
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
    var DisplayObject = (function () {
        function DisplayObject() {
            this.$matrix = new eg.Matrix();
            this.$anchorOffsetX = 0;
            this.$anchorOffsetY = 0;
            this.$x = 0;
            this.$y = 0;
            this.$scaleX = 1;
            this.$scaleY = 1;
            this.$rotation = 0;
        }
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
        /**
         * 获得这个显示对象以及它所有父级对象的连接矩阵。
         */
        DisplayObject.prototype.$getConcatenatedMatrix = function () {
            var matrix = new eg.Matrix();
            if (this.parent) {
                var p = this.parent.$getConcatenatedMatrix();
                var s = this.getMatrix();
                return matrix.$append(p).$append(s);
            }
            else {
                return this.getMatrix();
            }
        };
        DisplayObject.prototype.render = function () { };
        Object.defineProperty(DisplayObject.prototype, "width", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            get: function () {
                return 0;
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
        Object.defineProperty(DisplayObject.prototype, "parent", {
            get: function () {
                return this.$parent;
            },
            set: function (p) {
                this.$parent = p;
            },
            enumerable: true,
            configurable: true
        });
        return DisplayObject;
    }());
    eg.DisplayObject = DisplayObject;
})(eg || (eg = {}));
/// <reference path="DisplayObject.ts" />
var eg;
(function (eg) {
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(url) {
            var _this = _super.call(this) || this;
            _this.url = url;
            _this.image = eg.getRes(url);
            if (!_this.image) {
                console.warn("image: " + url + " not load");
            }
            return _this;
        }
        Object.defineProperty(Bitmap.prototype, "width", {
            get: function () {
                return this.image.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bitmap.prototype, "height", {
            get: function () {
                return this.image.height;
            },
            enumerable: true,
            configurable: true
        });
        Bitmap.prototype.render = function () {
            eg.context.drawImage(this.image, -this.anchorOffsetX, -this.anchorOffsetY);
        };
        return Bitmap;
    }(eg.DisplayObject));
    eg.Bitmap = Bitmap;
})(eg || (eg = {}));
/// <reference path="DisplayObject.ts" />
var eg;
(function (eg) {
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            var _this = _super.call(this) || this;
            _this.$children = [];
            return _this;
        }
        DisplayObjectContainer.prototype.addChild = function (child) {
            child.parent = this;
            this.$children.push(child);
        };
        return DisplayObjectContainer;
    }(eg.DisplayObject));
    eg.DisplayObjectContainer = DisplayObjectContainer;
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
        /**
         * 后置矩阵
         */
        Matrix.prototype.append = function (a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
            }
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        };
        Matrix.prototype.$append = function (o) {
            return this.append(o.a, o.b, o.c, o.d, o.tx, o.ty);
        };
        return Matrix;
    }());
    eg.Matrix = Matrix;
})(eg || (eg = {}));
var eg;
(function (eg) {
    function render() {
        eg.context.clearRect(0, 0, eg.context.canvas.width, eg.context.canvas.height);
        renderContainer(eg.stage);
    }
    eg.render = render;
    function renderContainer(container) {
        container.$children.forEach(function (child) {
            if (child instanceof eg.DisplayObjectContainer) {
                renderContainer(child);
            }
            else {
                renderChild(child);
            }
        });
    }
    function renderChild(child) {
        eg.context.save();
        var m = child.$getConcatenatedMatrix();
        eg.context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
        child.render();
        eg.context.restore();
    }
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
    var $stage;
    Object.defineProperty(eg, "stage", {
        get: function () {
            return $stage;
        },
        set: function () {
            console.error("cannot assign to eg.stage");
        }
    });
    var callbackList = [];
    // 游戏初始化
    function init() {
        $stage = new eg.DisplayObjectContainer();
        var canvas = document.getElementById('canvas');
        eg.context = canvas.getContext('2d');
        startTicker();
    }
    eg.init = init;
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
        "assets/button.png",
        "assets/go.png",
        "assets/cr2.gif",
        "assets/h1.gif",
        "assets/h2.gif",
        "assets/h3.gif",
    ];
    // 游戏入口
    function startGame() {
        eg.init();
        eg.loadImageArray(picAssets, main);
    }
    game.startGame = startGame;
    function main() {
        eg.setStageWidth(600);
        eg.setStageHeight(400);
        var button0 = new eg.DisplayObjectContainer();
        eg.stage.addChild(button0);
        var button1 = new eg.Bitmap("assets/button.png");
        button0.addChild(button1);
        button0.x = eg.getStageWidth() - button1.width >> 1;
        button0.y = eg.getStageHeight() - button1.height >> 1;
        var go = new eg.Bitmap("assets/go.png");
        button0.addChild(go);
        go.x = button1.width / 2;
        go.y = 60;
        go.scale = 1;
        go.anchorOffsetX = go.width / 2;
        go.anchorOffsetY = go.height / 2;
        eg.frameLoop(function () {
            go.rotation += 1;
        });
        eg.moveLeftRight(button0, 0, 400);
        eg.scaleLowHigh(button0, 0.8, 1.2);
    }
})(game || (game = {}));
//# sourceMappingURL=game.js.map