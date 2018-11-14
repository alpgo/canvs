// 离屏canvas
module eg {
    export class RenderNode {

        private target: DisplayObjectContainer;

        private context2D: CanvasRenderingContext2D;

        public constructor(target: DisplayObjectContainer) {
            this.target = target;
            var canvas = document.createElement('canvas');
            canvas.width = context.canvas.width;
            canvas.height = context.canvas.height;
            this.context2D = canvas.getContext('2d');
            this.cacheAsOffCanvas(this.target);
        }

        public cacheAsOffCanvas(container: DisplayObjectContainer) {
            this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);
            let children = container.$children;
            let length = children.length;
            for (let i = 0; i < length; i++) {
                let node = children[i];
                if (node instanceof DisplayObjectContainer) {
                    this.cacheAsOffCanvas(node);
                    continue;
                }
                var childMatrix = node.$getConcatenatedMatrix();
                // 获取该元素在this.target容器下的坐标变换
                var m = new Matrix();
                var inverted = this.target.$getInvertedConcatenatedMatrix();
                m.$append(inverted).$append(childMatrix);
                this.context2D.save();
                this.context2D.transform(m.a, m.b, m.c, m.d, m.tx + 200, m.ty + 200);
                node.render(this.context2D);
                this.context2D.restore();
            }
        }

        public render() {
            context.save();
            let m = this.target.$getConcatenatedMatrix();
            context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            context.transform(1, 0, 0, 1, -200, -200);
            context.drawImage(this.context2D.canvas, 0, 0);
            context.restore();
        }
    }
}