module eg {
    export class Shape extends DisplayObject {
        constructor() {
            super();
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

        private $fillRect(color: string, w: number, h: number) {
            context.save();
            context.fillStyle = color;
            context.fillRect(0, 0, w, h);
            context.restore();
            this.width = w;
            this.height = h;
        }

        private $strokeRect(color: string, w: number, h: number) {
            context.save();
            context.strokeStyle = color;
            context.strokeRect(0, 0, w, h);
            context.restore();
            this.width = w;
            this.height = h;
        }

        private $circle(color: string, cx: number, cy: number, radius: number) {
            context.save();
            context.beginPath();
            context.strokeStyle = color;
            context.arc(cx, cy, radius, 0, Math.PI * 2, false);
            context.stroke();
            context.restore();
            this.width = this.height = 2 * radius;
        }

        @override
        public render() {
            context.save();
            context.transform(1, 0, 0, 1, -this.anchorOffsetX, -this.anchorOffsetY);
            this.data.forEach((arr: any[]) => {
                let type = arr[0];
                if (type == "fill") {
                    this.$fillRect(arr[1], arr[2], arr[3]);
                } else if (type == "stroke") {
                    this.$strokeRect(arr[1], arr[2], arr[3]);
                } else if (type == "circle") {
                    this.$circle(arr[1], arr[2], arr[3], arr[4]);
                } else { }
            });
            context.restore();
        }

        @override
        public $measureContentBounds(): any {
            return $tempRect.setTo(-this.anchorOffsetX * this.scaleX, -this.anchorOffsetY * this.scaleY,
                this.width * this.scaleX, this.height * this.scaleY);
        }

    }
}