module eg {
    export function render() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        count = 0;
        renderContainer(stage);
    }

    // 每一帧渲染对象次数
    var count = 0;

    export function renderContainer(container: DisplayObjectContainer) {
        if (container.cacheAsBitmap) {
            if (!container.displayList) {
                container.displayList = new RenderNode(container);
            } else if (container.childMatrixChanged) {
                container.displayList.cacheAsOffCanvas(container);
            }
            container.childMatrixChanged = false;
            count++;
            container.displayList.render();
            return;
        } else {
            container.displayList = null;
        }
        container.$children.forEach(function (child) {
            if (child instanceof DisplayObjectContainer) {
                renderContainer(child);
            } else {
                count++;
                renderChild(child, context);
            }
        });
        // display fps
        document.getElementById('fps').innerHTML = count + "";
    }

    export function renderChild(child: DisplayObject, context2D) {
        context2D.save();
        var m = child.$getConcatenatedMatrix();
        context2D.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
        child.render(context2D);
        context2D.restore();
    }
}