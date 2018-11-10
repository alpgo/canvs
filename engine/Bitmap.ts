/// <reference path="DisplayObject.ts" />
module eg {

    export class Bitmap extends DisplayObject {

        private image: HTMLImageElement;

        constructor(public url: string) {
            super();
            this.image = getRes(url);
            if (!this.image) {
                console.warn(`image: ${url} not load`);
            }
        }

        public get width(): number {
            return this.image.width;
        }

        public get height(): number {
            return this.image.height;
        }

        public render() {
            context.drawImage(this.image, -this.anchorOffsetX, -this.anchorOffsetY);
        }
    }
}