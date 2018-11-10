module eg {
    export class Matrix {
        constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }

        public a: number;
        public b: number;
        public c: number;
        public d: number;
        public tx: number;
        public ty: number;

        /**
         * 后置矩阵
         */
        public append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix {
            let a1 = this.a;
            let b1 = this.b;
            let c1 = this.c;
            let d1 = this.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
            }
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        }

        public $append(o: Matrix): Matrix {
            return this.append(o.a, o.b, o.c, o.d, o.tx, o.ty);
        }

    }
}