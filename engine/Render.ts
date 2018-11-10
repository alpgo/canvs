module eg {
    export function render() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        renderContainer(stage);
    }

    function renderContainer(container: DisplayObjectContainer) {
        container.$children.forEach(function (child) {
            if (child instanceof DisplayObjectContainer) {
                renderContainer(child);
            } else {
                renderChild(child);
            }
        });
    }

    function renderChild(child: DisplayObject) {
        context.save();
        var m = child.$getConcatenatedMatrix();
        context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
        child.render();
        context.restore();
    }
}