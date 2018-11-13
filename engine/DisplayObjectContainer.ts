/// <reference path="DisplayObject.ts" />

module eg {

    export class DisplayObjectContainer extends DisplayObject {

        public constructor() {
            super();
        }

        public $children: DisplayObject[] = [];

        public addChild(child: DisplayObject) {
            child.parent = this;
            this.$children.push(child);
        }

        public hitTest(stageX: number, stageY: number): DisplayObject {
            const children = this.$children;
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i];
                let target = child.hitTest(stageX, stageY);
                if (target) {
                    return target;
                }
            }
            return null;
        }
    }
}