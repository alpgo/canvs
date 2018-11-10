/**
 * 游戏渲染基本对象
 */

module eg {

    var objects: DisplayObject[] = [];

    export function getStageWidth(): number {
        return context.canvas.width;
    }

    export function getStageHeight(): number {
        return context.canvas.height;
    }

    export function setStageWidth(value: number) {
        context.canvas.width = value;
    }

    export function setStageHeight(value: number) {
        context.canvas.height = value;
    }

    export function addObject(obj: DisplayObject) {
        objects.push(obj);
    }

    export function removeObject(obj: DisplayObject) {

    }

    export function render() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        objects.forEach(function (obj) {
            context.save();
            var m = obj.getMatrix();
            context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            context.drawImage(obj.image, -obj.anchorOffsetX, -obj.anchorOffsetY);
            context.restore();
        });
    }

    export class DisplayObject {

        constructor(url: string) {
            this.url = url;
        }

        private url: string;

        public get image() {
            return getRes(this.url);
        }

        private $matrix: Matrix = new Matrix();

        public getMatrix(): Matrix {
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
        }

        public get width(): number {
            return this.image ? this.image.width : 0;
        }

        public get height(): number {
            return this.image ? this.image.height : 0;
        }

        private $anchorOffsetX: number = 0;

        public get anchorOffsetX(): number {
            return this.$anchorOffsetX;
        }

        public set anchorOffsetX(value: number) {
            this.$anchorOffsetX = value;
        }

        private $anchorOffsetY: number = 0;

        public get anchorOffsetY(): number {
            return this.$anchorOffsetY;
        }

        public set anchorOffsetY(value: number) {
            this.$anchorOffsetY = value;
        }

        private $x: number = 0;

        public get x(): number {
            return this.$x;
        }

        public set x(value: number) {
            this.$x = value;
        }

        private $y: number = 0;

        public get y(): number {
            return this.$y;
        }

        public set y(value: number) {
            this.$y = value;
        }

        private $scaleX: number = 1;

        public get scaleX(): number {
            return this.$scaleX;
        }

        public set scaleX(value: number) {
            this.$scaleX = value;
        }

        private $scaleY: number = 1;

        public get scaleY(): number {
            return this.scaleY;
        }

        public set scaleY(value: number) {
            this.$scaleY = value;
        }

        public set scale(value: number) {
            this.scaleX = value;
            this.scaleY = value;
        }

        private $rotation: number = 0;

        public get rotation(): number {
            return this.$rotation;
        }

        public set rotation(value: number) {
            this.$rotation = value;
        }
    }
}