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
    }
}