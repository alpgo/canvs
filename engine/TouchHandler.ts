module eg {
    /**
     * 触摸事件管理
     */
    class TouchHandle {
        constructor() {

        }

        init() {
            this.canvas = context.canvas;
            this.addListeners();
        }

        private canvas: HTMLCanvasElement;

        addListeners() {
            this.canvas.addEventListener("mousedown", this.onTouchBegin.bind(this));
            this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
            this.canvas.addEventListener("mouseup", this.onTouchEnd.bind(this));
        }

        onTouchBegin(event: any) {
            var loc = this.getLocation(event);
            var target = this.findTarget(loc.x, loc.y);
            if (target) {
                console.log(target);
            }
        }

        onMouseMove(event: any) {
            // console.log(event);
        }

        onTouchEnd(event: any) {
            // console.log(event);
        }

        private getLocation(event: any): { x: number, y: number } {
            let x = event.pageX;
            let y = event.pageY;
            return { x, y };
        }

        private findTarget(stageX: number, stageY: number): DisplayObject {
            return stage.hitTest(stageX, stageY);
        }
    }

    export const $touchHandle = new TouchHandle();
}