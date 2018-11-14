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
    /**
     * 事件功能
     */
    var Event = (function () {
        function Event() {
            this.$eventMap = {};
        }
        Event.prototype.addEventListener = function (eventName, callback, target) {
            var arr = this.$eventMap[eventName] = this.$eventMap[eventName] || [];
            for (var i = 0; i < arr.length; i += 2) {
                var fn = arr[i];
                var that = arr[i + 1];
                if (fn === callback && that === target) {
                    console.warn("\u91CD\u590D\u76D1\u542C" + callback + " - " + target);
                    return;
                }
            }
            arr.push(callback, target);
        };
        Event.prototype.removeEventListener = function (eventName, callback, target) {
            if (!this.$eventMap[eventName])
                return;
            var arr = this.$eventMap[eventName];
            for (var i = 0; i < arr.length; i += 2) {
                var fn = arr[i];
                var that = arr[i + 1];
                if (fn === callback && that === target) {
                    arr.splice(i, 2);
                    break;
                }
            }
            if (arr.length == 0) {
                delete this.$eventMap[eventName];
            }
        };
        Event.prototype.dispatchEvent = function (eventName, data) {
            if (!this.$eventMap[eventName])
                return;
            var arr = this.$eventMap[eventName];
            for (var i = 0; i < arr.length; i += 2) {
                var fn = arr[i];
                var that = arr[i + 1];
                fn.call(that, data);
            }
        };
        Event.TouchStart = "touchstart";
        Event.TouchEnd = "touchend";
        Event.TouchMove = "touchmove";
        return Event;
    }());
    eg.Event = Event;
})(eg || (eg = {}));
/// <reference path="Utils.ts" />
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
    /**
     * 游戏渲染基本对象
     */
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            var _this = _super.call(this) || this;
            _this.$matrix = new eg.Matrix();
            _this.$width = 0;
            _this.$height = 0;
            _this.$anchorOffsetX = 0;
            _this.$anchorOffsetY = 0;
            _this.$x = 0;
            _this.$y = 0;
            _this.$scaleX = 1;
            _this.$scaleY = 1;
            _this.$rotation = 0;
            return _this;
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
                this.setContainerMatrixFlag();
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
                this.setContainerMatrixFlag();
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
                this.setContainerMatrixFlag();
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
                this.setContainerMatrixFlag();
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
                this.setContainerMatrixFlag();
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
        DisplayObject.prototype.setContainerMatrixFlag = function () {
            var p = this;
            var notContainer = false;
            do {
                p = p.parent;
                notContainer = !(p instanceof eg.DisplayObjectContainer);
            } while (p && notContainer);
            p && (p.childMatrixChanged = true);
        };
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
        DisplayObject.prototype.render = function (context2D) { };
        DisplayObject.prototype.$measureContentBounds = function () { };
        return DisplayObject;
    }(eg.Event));
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
        Bitmap.prototype.render = function (context2D) {
            context2D.drawImage(this.image, -this.anchorOffsetX, -this.anchorOffsetY);
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
            _this.$cacheAsBitmap = false;
            _this.displayList = null;
            _this.childMatrixChanged = false;
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
        Object.defineProperty(DisplayObjectContainer.prototype, "cacheAsBitmap", {
            get: function () {
                return this.$cacheAsBitmap;
            },
            set: function (value) {
                if (this.$cacheAsBitmap == value) {
                    return;
                }
                this.$cacheAsBitmap = value;
            },
            enumerable: true,
            configurable: true
        });
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
        count = 0;
        renderContainer(eg.stage);
    }
    eg.render = render;
    // 每一帧渲染对象次数
    var count = 0;
    function renderContainer(container) {
        if (container.cacheAsBitmap) {
            if (!container.displayList) {
                container.displayList = new eg.RenderNode(container);
            }
            else if (container.childMatrixChanged) {
                container.displayList.cacheAsOffCanvas(container);
            }
            container.childMatrixChanged = false;
            count++;
            container.displayList.render();
            return;
        }
        else {
            container.displayList = null;
        }
        container.$children.forEach(function (child) {
            if (child instanceof eg.DisplayObjectContainer) {
                renderContainer(child);
            }
            else {
                count++;
                renderChild(child, eg.context);
            }
        });
        // display fps
        document.getElementById('fps').innerHTML = count + "";
    }
    eg.renderContainer = renderContainer;
    function renderChild(child, context2D) {
        context2D.save();
        var m = child.$getConcatenatedMatrix();
        context2D.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
        child.render(context2D);
        context2D.restore();
    }
    eg.renderChild = renderChild;
})(eg || (eg = {}));
// 离屏canvas
var eg;
(function (eg) {
    var RenderNode = (function () {
        function RenderNode(target) {
            this.target = target;
            var canvas = document.createElement('canvas');
            canvas.width = eg.context.canvas.width;
            canvas.height = eg.context.canvas.height;
            this.context2D = canvas.getContext('2d');
            this.cacheAsOffCanvas(this.target);
        }
        RenderNode.prototype.cacheAsOffCanvas = function (container) {
            this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);
            var children = container.$children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var node = children[i];
                if (node instanceof eg.DisplayObjectContainer) {
                    this.cacheAsOffCanvas(node);
                    continue;
                }
                var childMatrix = node.$getConcatenatedMatrix();
                // 获取该元素在this.target容器下的坐标变换
                var m = new eg.Matrix();
                var inverted = this.target.$getInvertedConcatenatedMatrix();
                m.$append(inverted).$append(childMatrix);
                this.context2D.save();
                this.context2D.transform(m.a, m.b, m.c, m.d, m.tx + 200, m.ty + 200);
                node.render(this.context2D);
                this.context2D.restore();
            }
        };
        RenderNode.prototype.render = function () {
            eg.context.save();
            var m = this.target.$getConcatenatedMatrix();
            eg.context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            eg.context.transform(1, 0, 0, 1, -200, -200);
            eg.context.drawImage(this.context2D.canvas, 0, 0);
            eg.context.restore();
        };
        return RenderNode;
    }());
    eg.RenderNode = RenderNode;
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
            _this.testColor = null;
            _this.data = [];
            return _this;
        }
        Shape.prototype.updateColor = function () {
            var arr = this.testColor = this.testColor || [0, 0, 0, 0.5];
            arr[0] += Math.random() * 100;
            arr[1] += Math.random() * 100;
            arr[2] += Math.random() * 100;
            if (arr[0] > 255) {
                arr[0] = 0;
            }
            ;
            if (arr[1] > 255) {
                arr[1] = 0;
            }
            ;
            if (arr[2] > 255) {
                arr[2] = 0;
            }
            ;
        };
        Shape.prototype.fillRect = function (color, w, h) {
            this.data.push(["fill", color, w, h]);
        };
        Shape.prototype.strokeRect = function (color, w, h) {
            this.data.push(["stroke", color, w, h]);
        };
        Shape.prototype.circle = function (color, x, y, radius) {
            this.data.push(["circle", color, x, y, radius]);
        };
        Shape.prototype.$fillRect = function (context, color, w, h) {
            context.save();
            if (this.testColor) {
                var arr = this.testColor;
                context.fillStyle = "rgba(" + arr.join(",") + ")";
            }
            else {
                context.fillStyle = color;
            }
            context.fillRect(0, 0, w, h);
            context.restore();
            this.width = w;
            this.height = h;
        };
        Shape.prototype.$strokeRect = function (context, color, w, h) {
            context.save();
            context.strokeStyle = color;
            context.strokeRect(0, 0, w, h);
            context.restore();
            this.width = w;
            this.height = h;
        };
        Shape.prototype.$circle = function (context, color, cx, cy, radius) {
            context.save();
            context.beginPath();
            context.strokeStyle = color;
            context.arc(cx, cy, radius, 0, Math.PI * 2, false);
            context.stroke();
            context.restore();
            this.width = this.height = 2 * radius;
        };
        Shape.prototype.render = function (context2D) {
            var _this = this;
            context2D.save();
            context2D.transform(1, 0, 0, 1, -this.anchorOffsetX, -this.anchorOffsetY);
            this.data.forEach(function (arr) {
                var type = arr[0];
                if (type == "fill") {
                    _this.$fillRect(context2D, arr[1], arr[2], arr[3]);
                }
                else if (type == "stroke") {
                    _this.$strokeRect(context2D, arr[1], arr[2], arr[3]);
                }
                else if (type == "circle") {
                    _this.$circle(context2D, arr[1], arr[2], arr[3], arr[4]);
                }
                else { }
            });
            context2D.restore();
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
            event.preventDefault();
            var loc = this.getLocation(event);
            var target = this.findTarget(loc.x, loc.y);
            if (target) {
                target.dispatchEvent(eg.Event.TouchStart, event);
            }
        };
        TouchHandle.prototype.onMouseMove = function (event) {
            event.preventDefault();
            // console.log(event);
        };
        TouchHandle.prototype.onTouchEnd = function (event) {
            event.preventDefault();
            // console.log(event);
        };
        TouchHandle.prototype.getLocation = function (event) {
            var rect = eg.context.canvas.getBoundingClientRect();
            var x = event.pageX - rect.left;
            var y = event.pageY - rect.top;
            return { x: x, y: y };
        };
        TouchHandle.prototype.findTarget = function (stageX, stageY) {
            return eg.stage.hitTest(stageX, stageY);
        };
        return TouchHandle;
    }());
    eg.$touchHandle = new TouchHandle();
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
    // 数据对象
    var countModel = function () {
        var count = 0;
        var updates = [];
        return {
            getCount: function () {
                return count;
            },
            addCount: function () {
                ++count;
                if (count) {
                    updates.forEach(function (fn) { return fn(); });
                }
            },
            addUpdate: function (fn) {
                updates.push(fn);
            }
        };
    }();
    // 游戏入口
    function startGame() {
        eg.init();
        eg.loadImageArray(picAssets, function () { new Main(); });
    }
    game.startGame = startGame;
    // 装饰器应用
    var Decorate = (function () {
        function Decorate() {
        }
        Decorate.start = function (target, property, descriptor) {
            /*
             因为对象没有创建，此时将需要初始化的类方法保存到类的原型中
             这里是将
                [Main.prototype.createContainer,
                Main.prototype.createRect,
                Main.prototype.createGo] 三个方法先保存到 Main.prototype[Decorate.START] 中，
            当 this.decorate() 执行时，new Main()已经创建了对象了, this 起作用了，
                Main.prototype.createContainer.call(this); 即可正确的执行了方法了。
                如果直接执行 Main.prototype.createContainer(); 那么方法中的this是无效的。
            */
            var arr = target[Decorate.START] = target[Decorate.START] || [];
            arr.push(target[property]);
        };
        Decorate.update = function (model) {
            /**
             * 该例子中, 此处的target为  Main.prototype,
             * property: "display" 即装饰器下面的方法名称
             * descriptor: Object.getOwnPropertyDescriptor(Main.prototype, "display") {获取对象下的属性描述}
             * 具体的自己找资料熟悉: PropertyDescriptor, Object.defineProperty
             */
            return function (target, property, descriptor) {
                var arr = target[Decorate.UPDATE] = target[Decorate.UPDATE] || [];
                arr.push([model, descriptor.value]);
            };
        };
        Decorate.prototype.decorate = function () {
            var _this = this;
            // 此时对象已经初始化了，this已经有效了
            (this[Decorate.START] || []).forEach(function (fn) { fn.call(_this); });
            (this[Decorate.UPDATE] || []).forEach(function (_a) {
                var model = _a[0], fn = _a[1];
                model.addUpdate(fn.bind(_this));
            });
        };
        // 视图初始化
        Decorate.START = '__start__';
        // 监听数据变化 => 通知视图更新数据
        Decorate.UPDATE = '__update__';
        return Decorate;
    }());
    game.Decorate = Decorate;
    game.start = Decorate.start;
    game.update = Decorate.update;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this) || this;
            eg.setStageWidth(600);
            eg.setStageHeight(400);
            var c = new eg.DisplayObjectContainer();
            var o1 = new Layer();
            var o2 = new Layer();
            o1.container.y -= 100;
            c.addChild(o1.container);
            o2.container.y += 100;
            c.addChild(o2.container);
            return _this;
        }
        return Main;
    }(Decorate));
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            var _this = _super.call(this) || this;
            _this.decorate();
            return _this;
        }
        Layer.prototype.createContainer = function () {
            var _this = this;
            this.container = new eg.DisplayObjectContainer();
            this.container.x = eg.stage.width / 2;
            this.container.y = eg.stage.height / 2;
            eg.stage.addChild(this.container);
            eg.frameLoop(function () {
                _this.container.rotation += 0.5;
            });
            eg.moveLeftRight(this.container, 200, 400);
            this.container.cacheAsBitmap = false;
            document.getElementById('fps').style.color = "#3399ee";
            setTimeout(function () {
                // 可看到页面中fps中的渲染对象数量变少了
                _this.container.cacheAsBitmap = true;
                document.getElementById('fps').style.color = "#ff0000";
            }, 2000);
        };
        Layer.prototype.createRect = function () {
            this.shape = new eg.Shape();
            this.shape.fillRect("#3366CC", 100, 100);
            this.shape.strokeRect("#FF6600", 100, 100);
            this.shape.circle("#FF00FF", 50, 50, 50 * Math.sqrt(2));
            this.shape.anchorOffsetX = 100 / 2;
            this.shape.anchorOffsetY = 100 / 2;
            this.container.addChild(this.shape);
        };
        Layer.prototype.createGo = function () {
            var _this = this;
            this.go = new eg.Bitmap("assets/go.png");
            this.go.anchorOffsetX = this.go.width / 2;
            this.go.anchorOffsetY = this.go.height / 2;
            this.container.addChild(this.go);
            eg.frameLoop(function () {
                _this.go.rotation += -3;
            });
            this.go.addEventListener(eg.Event.TouchStart, function () {
                countModel.addCount(); // 更新数据变化
            }, this);
        };
        // 视图渲染，监听countModel的数据变化, 实现数据与视图分离
        Layer.prototype.display = function () {
            var count = document.getElementById('count');
            count.innerHTML = countModel.getCount() + "";
            this.shape.updateColor();
        };
        __decorate([
            game.start
        ], Layer.prototype, "createContainer", null);
        __decorate([
            game.start
        ], Layer.prototype, "createRect", null);
        __decorate([
            game.start
        ], Layer.prototype, "createGo", null);
        __decorate([
            game.update(countModel)
        ], Layer.prototype, "display", null);
        return Layer;
    }(Decorate));
})(game || (game = {}));
//# sourceMappingURL=game.js.map