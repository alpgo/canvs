module eg {
    export class Shape extends DisplayObject {
        constructor() {
            super();
        }

        private testColor: number[] = null;

        public updateColor() {
            var arr = this.testColor = this.testColor || [0, 0, 0, 0.5];
            arr[0] += Math.random() * 100;
            arr[1] += Math.random() * 100;
            arr[2] += Math.random() * 100;
            if (arr[0] > 255) { arr[0] = 0 };
            if (arr[1] > 255) { arr[1] = 0 };
            if (arr[2] > 255) { arr[2] = 0 };
        }

        private data: any[] = [];

        public fillRect(color: string, w: number, h: number) {
            this.data.push(["fill", color, w, h]);
        }

        public strokeRect(color: string, w: number, h: number) {
            this.data.push(["stroke", color, w, h]);
        }

        public circle(color: string, x: number, y: number, radius: number) {
            this.data.push(["circle", color, x, y, radius]);
        }

        private $fillRect(context, color: string, w: number, h: number) {
            context.save();
            if (this.testColor) {
                let arr = this.testColor;
                context.fillStyle = `rgba(${arr.join(",")})`;
            } else {
                context.fillStyle = color;
            }
            context.fillRect(0, 0, w, h);
            context.restore();
            this.width = w;
            this.height = h;
        }

        private $strokeRect(context, color: string, w: number, h: number) {
            context.save();
            context.strokeStyle = color;
            context.strokeRect(0, 0, w, h);
            context.restore();
            this.width = w;
            this.height = h;
        }

        private $circle(context, color: string, cx: number, cy: number, radius: number) {
            context.save();
            context.beginPath();
            context.strokeStyle = color;
            context.arc(cx, cy, radius, 0, Math.PI * 2, false);
            context.stroke();
            context.restore();
            this.width = this.height = 2 * radius;
        }

        @override
        public render(context2D: CanvasRenderingContext2D) {
            context2D.save();
            context2D.transform(1, 0, 0, 1, -this.anchorOffsetX, -this.anchorOffsetY);
            this.data.forEach((arr: any[]) => {
                let type = arr[0];
                if (type == "fill") {
                    this.$fillRect(context2D, arr[1], arr[2], arr[3]);
                } else if (type == "stroke") {
                    this.$strokeRect(context2D, arr[1], arr[2], arr[3]);
                } else if (type == "circle") {
                    this.$circle(context2D, arr[1], arr[2], arr[3], arr[4]);
                } else { }
            });
            context2D.restore();
        }

        @override
        public $measureContentBounds(): any {
            return $tempRect.setTo(-this.anchorOffsetX * this.scaleX, -this.anchorOffsetY * this.scaleY,
                this.width * this.scaleX, this.height * this.scaleY);
        }

    }
}