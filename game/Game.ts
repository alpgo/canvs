module game {

    var picAssets = [
        "assets/cr2.gif",
        "assets/h1.gif",
        "assets/h2.gif",
        "assets/h3.gif"
    ];

    // 游戏入口
    export function startGame() {
        eg.loadImageArray(picAssets, main);
    }

    function main() {
        eg.setStageWidth(600);
        eg.setStageHeight(400);
        var bg = new eg.DisplayObject("assets/cr2.gif");
        eg.addObject(bg);
        bg.x = eg.getStageWidth() / 2;
        bg.y = eg.getStageHeight() / 2;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        bg.scale = 1.2;
        eg.frameLoop(function () {
            bg.rotation += 1;
        });
    }
}