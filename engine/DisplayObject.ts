/// <reference path="Utils.ts" />

module eg {

    export function setStageWidth(value: number) {
        context.canvas.width = value;
        stage.width = value;
    }

    export function setStageHeight(value: number) {
        context.canvas.height = value;
        stage.height = value;
    }

    /**
     * 游戏渲染基本对象
     */
    export class DisplayObject extends Event {

        constructor() {
            super();
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

        /**
         * 获得这个显示对象以及它所有父级对象的连接矩阵。
         */
        public $getConcatenatedMatrix(): Matrix {
            let matrix = new Matrix();
            if (this.parent) {
                let p = this.parent.$getConcatenatedMatrix();
                let s = this.getMatrix();
                return matrix.$append(p).$append(s);
            } else {
                return this.getMatrix();
            }
        }

        private $width: number = 0;

        public get width(): number {
            return this.$width;
        }

        public set width(value: number) {
            this.$width = value;
        }

        private $height: number = 0;

        public get height(): number {
            return this.$height;
        }

        public set height(value: number) {
            this.$height = value;
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
            this.setContainerMatrixFlag();
        }

        private $y: number = 0;

        public get y(): number {
            return this.$y;
        }

        public set y(value: number) {
            this.$y = value;
            this.setContainerMatrixFlag();
        }

        private $scaleX: number = 1;

        public get scaleX(): number {
            return this.$scaleX;
        }

        public set scaleX(value: number) {
            this.$scaleX = value;
            this.setContainerMatrixFlag();
        }

        private $scaleY: number = 1;

        public get scaleY(): number {
            return this.$scaleY;
        }

        public set scaleY(value: number) {
            this.$scaleY = value;
            this.setContainerMatrixFlag();
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
            this.setContainerMatrixFlag();
        }

        private $parent: DisplayObjectContainer;

        public get parent(): DisplayObjectContainer {
            return this.$parent;
        }

        public set parent(p: DisplayObjectContainer) {
            this.$parent = p;
        }

        public setContainerMatrixFlag() {
            var p = this as any;
            var notContainer: boolean = false;
            do {
                p = p.parent;
                notContainer = !(p instanceof DisplayObjectContainer);
            } while (p && notContainer);
            p && (p.childMatrixChanged = true);
        }

        public $getInvertedConcatenatedMatrix() {
            var m = new Matrix();
            this.$getConcatenatedMatrix().$invertInto(m);
            return m;
        }

        public hitTest(stageX: number, stageY: number): DisplayObject {
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            $tempRect = this.$measureContentBounds();
            if ($tempRect.contains(localX, localY)) {
                return this;
            }
            return null;
        }

        /**
         * 以下需要子类实现
         */
        public render(context2D: CanvasRenderingContext2D) { }

        public $measureContentBounds(): any { }

    }

}