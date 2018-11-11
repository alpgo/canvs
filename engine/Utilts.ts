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
}