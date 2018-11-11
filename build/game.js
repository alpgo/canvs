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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    function setStageWidth(value) {
        eg.context.canvas.width = value;
        eg.stage.width = value;
    }
    eg.setStageWidth = setStageWidth;
    function setStageHeight(value) {
        eg.context.canvas.height = value;
        eg.stage.height = value;
    }
    eg.setStageHeight = setStageHeight;
    var DisplayObject = (function () {
        function DisplayObject() {
            this.$matrix = new eg.Matrix();
            this.$width = 0;
            this.$height = 0;
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
        Object.defineProperty(DisplayObject.prototype, "width", {
            get: function () {
                return this.$width;
            },
            set: function (value) {
                this.$width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            get: function () {
                return this.$height;
            },
            set: function (value) {
                this.$height = value;
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
                return this.$scaleY;
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
        DisplayObject.prototype.$getInvertedConcatenatedMatrix = function () {
            var m = new eg.Matrix();
            this.$getConcatenatedMatrix().$invertInto(m);
            return m;
        };
        DisplayObject.prototype.hitTest = function (stageX, stageY) {
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            eg.$tempRect = this.$measureContentBounds();
            if (eg.$tempRect.contains(localX, localY)) {
                return this;
            }
            return null;
        };
        /**
         * 以下需要子类实现
         */
        DisplayObject.prototype.render = function () { };
        DisplayObject.prototype.$measureContentBounds = function () { };
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
        Bitmap.prototype.$measureContentBounds = function () {
            return eg.$tempRect.setTo(-this.anchorOffsetX * this.scaleX, -this.anchorOffsetY * this.scaleY, this.width * this.scaleX, this.height * this.scaleY);
        };
        __decorate([
            eg.override
        ], Bitmap.prototype, "render", null);
        __decorate([
            eg.override
        ], Bitmap.prototype, "$measureContentBounds", null);
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
        DisplayObjectContainer.prototype.hitTest = function (stageX, stageY) {
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                var target = child.hitTest(stageX, stageY);
                if (target) {
                    return target;
                }
            }
            return null;
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
        // return this * o
        Matrix.prototype.$append = function (o) {
            return this.append(o.a, o.b, o.c, o.d, o.tx, o.ty);
        };
        /**
         * 逆矩阵
         */
        Matrix.prototype.invert = function () {
            this.$invertInto(this);
        };
        Matrix.prototype.$invertInto = function (target) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            if (b == 0 && c == 0) {
                target.b = target.c = 0;
                if (a == 0 || d == 0) {
                    target.a = target.d = target.tx = target.ty = 0;
                }
                else {
                    a = target.a = 1 / a;
                    d = target.d = 1 / d;
                    target.tx = -a * tx;
                    target.ty = -d * ty;
                }
                return;
            }
            var determinant = a * d - b * c;
            if (determinant == 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = target.a = d * determinant;
            b = target.b = -b * determinant;
            c = target.c = -c * determinant;
            d = target.d = a * determinant;
            target.tx = -(k * tx + c * ty);
            target.ty = -(b * tx + d * ty);
        };
        Matrix.prototype.identity = function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
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
var eg;
(function (eg) {
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            var _this = _super.call(this) || this;
            _this.data = [];
            return _this;
        }
        Shape.prototype.fillRect = function (color, w, h) {
            this.data.push(["fill", color, w, h]);
        };
        Shape.prototype.strokeRect = function (color, w, h) {
            this.data.push(["stroke", color, w, h]);
        };
        Shape.prototype.circle = function (color, x, y, radius) {
            this.data.push(["circle", color, x, y, radius]);
        };
        Shape.prototype.$fillRect = function (color, w, h) {
            eg.context.save();
            eg.context.fillStyle = color;
            eg.context.fillRect(0, 0, w, h);
            eg.context.restore();
            this.width = w;
            this.height = h;
        };
        Shape.prototype.$strokeRect = function (color, w, h) {
            eg.context.save();
            eg.context.strokeStyle = color;
            eg.context.strokeRect(0, 0, w, h);
            eg.context.restore();
            this.width = w;
            this.height = h;
        };
        Shape.prototype.$circle = function (color, cx, cy, radius) {
            eg.context.save();
            eg.context.beginPath();
            eg.context.strokeStyle = color;
            eg.context.arc(cx, cy, radius, 0, Math.PI * 2, false);
            eg.context.stroke();
            eg.context.restore();
            this.width = this.height = 2 * radius;
        };
        Shape.prototype.render = function () {
            var _this = this;
            eg.context.save();
            eg.context.transform(1, 0, 0, 1, -this.anchorOffsetX, -this.anchorOffsetY);
            this.data.forEach(function (arr) {
                var type = arr[0];
                if (type == "fill") {
                    _this.$fillRect(arr[1], arr[2], arr[3]);
                }
                else if (type == "stroke") {
                    _this.$strokeRect(arr[1], arr[2], arr[3]);
                }
                else if (type == "circle") {
                    _this.$circle(arr[1], arr[2], arr[3], arr[4]);
                }
                else { }
            });
            eg.context.restore();
        };
        Shape.prototype.$measureContentBounds = function () {
            return eg.$tempRect.setTo(-this.anchorOffsetX * this.scaleX, -this.anchorOffsetY * this.scaleY, this.width * this.scaleX, this.height * this.scaleY);
        };
        __decorate([
            eg.override
        ], Shape.prototype, "render", null);
        __decorate([
            eg.override
        ], Shape.prototype, "$measureContentBounds", null);
        return Shape;
    }(eg.DisplayObject));
    eg.Shape = Shape;
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
        eg.$touchHandle.init();
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
var eg;
(function (eg) {
    /**
     * 触摸事件管理
     */
    var TouchHandle = (function () {
        function TouchHandle() {
        }
        TouchHandle.prototype.init = function () {
            this.canvas = eg.context.canvas;
            this.addListeners();
        };
        TouchHandle.prototype.addListeners = function () {
            this.canvas.addEventListener("mousedown", this.onTouchBegin.bind(this));
            this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
            this.canvas.addEventListener("mouseup", this.onTouchEnd.bind(this));
        };
        TouchHandle.prototype.onTouchBegin = function (event) {
            var loc = this.getLocation(event);
            var target = this.findTarget(loc.x, loc.y);
            if (target) {
                console.log(target);
            }
        };
        TouchHandle.prototype.onMouseMove = function (event) {
            // console.log(event);
        };
        TouchHandle.prototype.onTouchEnd = function (event) {
            // console.log(event);
        };
        TouchHandle.prototype.getLocation = function (event) {
            var x = event.pageX;
            var y = event.pageY;
            return { x: x, y: y };
        };
        TouchHandle.prototype.findTarget = function (stageX, stageY) {
            return eg.stage.hitTest(stageX, stageY);
        };
        return TouchHandle;
    }());
    eg.$touchHandle = new TouchHandle();
})(eg || (eg = {}));
var eg;
(function (eg) {
    function override(target, propertyKey, descriptor) { }
    eg.override = override;
    eg.$tempRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        setTo: function (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            return this;
        },
        contains: function (localX, localY) {
            if (localX >= this.x
                && localX <= this.x + this.width
                && localY >= this.y
                && localY <= this.y + this.height) {
                return true;
            }
            else {
                return false;
            }
        }
    };
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
        var container = new eg.DisplayObjectContainer();
        container.x = eg.stage.width / 2;
        container.y = eg.stage.height / 2;
        eg.stage.addChild(container);
        var rect = new eg.Shape();
        rect.fillRect("#3366CC", 100, 100);
        rect.strokeRect("#FF6600", 100, 100);
        rect.circle("#FF00FF", 50, 50, 50 * Math.sqrt(2));
        rect.anchorOffsetX = 100 / 2;
        rect.anchorOffsetY = 100 / 2;
        container.addChild(rect);
        eg.frameLoop(function () {
            container.rotation += 0.5;
        });
        var go = new eg.Bitmap("assets/go.png");
        go.anchorOffsetX = go.width / 2;
        go.anchorOffsetY = go.height / 2;
        container.addChild(go);
        eg.frameLoop(function () {
            go.rotation += -3;
        });
        eg.moveLeftRight(container, 200, 400);
    }
})(game || (game = {}));
//# sourceMappingURL=game.js.map