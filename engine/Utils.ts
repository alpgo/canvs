module eg {

    export function override(target, propertyKey, descriptor) { }

    export var $tempRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,

        setTo: function (x: number, y: number, w: number, h: number) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            return this;
        },

        contains: function (localX: number, localY: number): boolean {
            if (localX >= this.x
                && localX <= this.x + this.width
                && localY >= this.y
                && localY <= this.y + this.height
            ) {
                return true;
            } else {
                return false;
            }
        }
    };

    /**
     * 事件功能
     */
    export class Event {

        public static TouchStart: string = "touchstart";

        public static TouchEnd: string = "touchend";

        public static TouchMove: string = "touchmove";

        private $eventMap = {};

        addEventListener(eventName: string, callback: Function, target: any) {
            let arr = this.$eventMap[eventName] = this.$eventMap[eventName] || [];
            for (let i = 0; i < arr.length; i += 2) {
                let fn = arr[i];
                let that = arr[i + 1];
                if (fn === callback && that === target) {
                    console.warn(`重复监听${callback} - ${target}`);
                    return;
                }
            }
            arr.push(callback, target);
        }

        removeEventListener(eventName: string, callback: Function, target: any) {
            if (!this.$eventMap[eventName]) return;

            let arr: any[] = this.$eventMap[eventName];
            for (let i = 0; i < arr.length; i += 2) {
                let fn = arr[i];
                let that = arr[i + 1];
                if (fn === callback && that === target) {
                    arr.splice(i, 2);
                    break;
                }
            }
            if (arr.length == 0) {
                delete this.$eventMap[eventName];
            }
        }

        dispatchEvent(eventName: string, data: any) {
            if (!this.$eventMap[eventName]) return;

            let arr: any[] = this.$eventMap[eventName];
            for (let i = 0; i < arr.length; i += 2) {
                let fn = arr[i];
                let that = arr[i + 1];
                fn.call(that, data);
            }
        }
    }
}