module eg {

    // 左右循环运动
    export function moveLeftRight(obj: DisplayObject, left: number, right: number) {
        let step = 2;
        frameLoop(function () {
            obj.x += step;
            if (obj.x <= left) {
                step = 2;
            } else if (obj.x >= right) {
                step = -2;
            } else { }
        });
    }

    // 缩放比例振动
    export function scaleLowHigh(obj: DisplayObject, low: number, high: number) {
        let step = 0.005;
        frameLoop(function () {
            obj.scale = obj.scaleX + step;
            if (obj.scaleX <= low) {
                step = 0.005;
            } else if (obj.scaleX >= high) {
                step = -0.005;
            } else { }
        });
    }
}
