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

        var container = new eg.DisplayObjectContainer();
        container.x = eg.stage.width / 2;
        container.y = eg.stage.height / 2;
        eg.stage.addChild(container);

        var rect = new eg.Shape();
        rect.fillRect("#3366CC", 100, 100);
        rect.strokeRect("#FF6600", 100, 100);
        rect.circle("#FF00FF", 50, 50, 50 * Math.sqrt(2));
        rect.anchorOffsetX = 100 / 2;
        rect.anchorOffsetY = 100 / 2;
        container.addChild(rect);
        eg.frameLoop(function () {
            container.rotation += 0.5;
        });

        var go = new eg.Bitmap("assets/go.png");
        go.anchorOffsetX = go.width / 2;
        go.anchorOffsetY = go.height / 2;
        container.addChild(go);
        eg.frameLoop(function () {
            go.rotation += -3;
        });

        eg.moveLeftRight(container, 200, 400);
    }

}