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
            event.preventDefault();
            var loc = this.getLocation(event);
            var target = this.findTarget(loc.x, loc.y);
            if (target) {
                target.dispatchEvent(Event.TouchStart, event);
            }
        }

        onMouseMove(event: any) {
            event.preventDefault();
            // console.log(event);
        }

        onTouchEnd(event: any) {
            event.preventDefault();
            // console.log(event);
        }

        private getLocation(event: any): { x: number, y: number } {
            let rect = context.canvas.getBoundingClientRect();
            let x = event.pageX - rect.left;
            let y = event.pageY - rect.top;
            return { x, y };
        }

        private findTarget(stageX: number, stageY: number): DisplayObject {
            return stage.hitTest(stageX, stageY);
        }
    }

    export const $touchHandle = new TouchHandle();
}