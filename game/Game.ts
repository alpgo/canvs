module game {

    var picAssets = [
        "assets/button.png",
        "assets/go.png",
        "assets/cr2.gif",
        "assets/h1.gif",
        "assets/h2.gif",
        "assets/h3.gif",
    ];

    // 游戏入口
    export function startGame() {
        eg.init();
        eg.loadImageArray(picAssets, main);
    }

    function main() {
        eg.setStageWidth(600);
        eg.setStageHeight(400);

        var button0 = new eg.DisplayObjectContainer();
        eg.stage.addChild(button0);

        var button1 = new eg.Bitmap("assets/button.png");
        button0.addChild(button1);

        button0.x = eg.getStageWidth() - button1.width >> 1;
        button0.y = eg.getStageHeight() - button1.height >> 1;

        var go = new eg.Bitmap("assets/go.png");
        button0.addChild(go);
        go.x = button1.width / 2;
        go.y = 60;

        go.scale = 1;
        go.anchorOffsetX = go.width / 2;
        go.anchorOffsetY = go.height / 2;
        eg.frameLoop(function () {
            go.rotation += 1;
        });
        eg.moveLeftRight(button0, 0, 400);
        eg.scaleLowHigh(button0, 0.8, 1.2);
    }

}