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
    }
}