/**
 * 资源加载
 */
module eg {

    // 资源缓存
    var resCache = {};

    // 获取资源
    export function getRes(url) {
        var image = resCache[url];
        !image && console.warn(`资源${url}不存在`);
        return image;
    }

    // 加载一张图片
    export function loadImage(url: string, complete: any) {
        if (resCache[url]) {
            return;
        }
        var image = new Image();
        image.src = url;
        image.onload = function () {
            resCache[url] = image;
            complete();
        };
    }

    // 加载一组图片
    export function loadImageArray(arr: string[], complete: any) {
        let length = arr.length;
        arr.forEach(function (url) {
            loadImage(url, () => {
                length--;
                if (length <= 0) {
                    complete();
                }
            });
        });
    }
}