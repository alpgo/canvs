module game {

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
                    updates.forEach(fn => fn());
                }
            },
            addUpdate: function (fn) {
                updates.push(fn);
            }
        };
    }();

    // 游戏入口
    export function startGame() {
        eg.init();
        eg.loadImageArray(picAssets, function () { new Main(); });
    }

    // 装饰器应用
    export class Decorate {

        // 视图初始化
        private static START: string = '__start__';

        public static start(target, property, descriptor) {
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
            let arr = target[Decorate.START] = target[Decorate.START] || [];
            arr.push(target[property]);
        }

        // 监听数据变化 => 通知视图更新数据
        private static UPDATE: string = '__update__';
        public static update(model) {
            /**
             * 该例子中, 此处的target为  Main.prototype,
             * property: "display" 即装饰器下面的方法名称
             * descriptor: Object.getOwnPropertyDescriptor(Main.prototype, "display") {获取对象下的属性描述}
             * 具体的自己找资料熟悉: PropertyDescriptor, Object.defineProperty
             */
            return function (target, property, descriptor) {
                let arr = target[Decorate.UPDATE] = target[Decorate.UPDATE] || [];
                arr.push([model, descriptor.value]);
            }
        }

        public decorate() {
            // 此时对象已经初始化了，this已经有效了
            (this[Decorate.START] || []).forEach(fn => { fn.call(this) });
            (this[Decorate.UPDATE] || []).forEach(([model, fn]) => {
                model.addUpdate(fn.bind(this));
            });
        }
    }

    export const start = Decorate.start;
    export const update = Decorate.update;

    class Main extends Decorate {

        constructor() {
            super();
            eg.setStageWidth(600);
            eg.setStageHeight(400);

            var c = new eg.DisplayObjectContainer();
            var o1 = new Layer();
            var o2 = new Layer();
            o1.container.y -= 100;
            c.addChild(o1.container);

            o2.container.y += 100;
            c.addChild(o2.container);

            eg.stage.addChild(c);
        }
    }

    class Layer extends Decorate {

        constructor() {
            super();
            this.decorate();
        }

        public container: eg.DisplayObjectContainer;
        @start
        public createContainer() {
            this.container = new eg.DisplayObjectContainer();
            this.container.x = eg.stage.width / 2;
            this.container.y = eg.stage.height / 2;
            eg.moveLeftRight(this.container, 71, 600 - 71);
            eg.frameLoop(() => {
                this.container.rotation += 0.5;
            });
            this.container.cacheAsBitmap = false;
            document.getElementById('fps').style.color = "#3399ee";

            // 可看到页面中fps中的渲染对象数量变少了
            setTimeout(() => {
                this.container.cacheAsBitmap = true;
                document.getElementById('fps').style.color = "#ff0000";
            }, 2000);
        }

        private shape: eg.Shape;
        @start
        public createRect() {
            this.shape = new eg.Shape();
            this.shape.fillRect("#3366CC", 100, 100);
            this.shape.strokeRect("#FF6600", 100, 100);
            this.shape.circle("#FF00FF", 50, 50, 50 * Math.sqrt(2));
            this.shape.anchorOffsetX = 100 / 2;
            this.shape.anchorOffsetY = 100 / 2;
            this.container.addChild(this.shape);
        }

        private go: eg.Bitmap;
        @start
        public createGo() {
            this.go = new eg.Bitmap("assets/go.png");
            this.go.anchorOffsetX = this.go.width / 2;
            this.go.anchorOffsetY = this.go.height / 2;
            this.container.addChild(this.go);
            // 若将旋转动画开启，那么父容器的cache失效了，会引起多余的绘制次数
            eg.frameLoop(() => {
                // this.go.rotation += -3;
            });
            this.go.addEventListener(eg.Event.TouchStart, () => {
                countModel.addCount();  // 更新数据变化
            }, this);
        }

        // 视图渲染，监听countModel的数据变化, 实现数据与视图分离
        @update(countModel)
        public display() {
            var count = document.getElementById('count');
            count.innerHTML = countModel.getCount() + "";
            this.shape.updateColor();
        }
    }

}