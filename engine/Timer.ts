/**
 * 游戏循环时间控制
 */

module eg {

    export var context: CanvasRenderingContext2D;

    const callbackList = [];

    // 游戏初始化
    export function gameInit() {
        // init canvas
        var canvas = document.getElementById('canvas') as HTMLCanvasElement;
        context = canvas.getContext('2d');
        // start game
        startTicker();
    }

    gameInit();

    // <F:EgretWeb.ts><M:startTicker>
    // 游戏循环心跳
    function startTicker() {
        var requestAnimationFrame = window["requestAnimationFrame"];
        requestAnimationFrame(onTicker);

        function onTicker() {
            gameLoop();
            requestAnimationFrame(onTicker);
        }
    }

    // 游戏循环渲染
    function gameLoop() {
        callbackList.forEach(fn => fn());
        render();
    }

    // 每帧定时器
    export function frameLoop(fn: Function) {
        callbackList.push(fn);
    }
}