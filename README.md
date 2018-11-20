# canvs
canvas引擎从0开始

## 平面图形变换

### `基本变换`

* 移动 { x, y }

* 旋转  `(顺时针旋转角度为正，因为canvas的坐标系为左手坐标系)`
    * rotation : `X轴,Y轴 旋转相同的角度`
    * skewX    : `Y轴旋转的角度`
    * skewY    : `X轴旋转的角度`

* 缩放 { scaleX, scaleY }

### `复合变换`

#### 假设图形 `node` 的变换矩阵为 `M`
```
    [ a c x ]
M = [ b d y ]  <=> 三种基本变换的组合(组合顺序：移动A * 旋转B * 缩放C)
    [ 0 0 1 ]

    [ 1 0 x ]       
A = [ 0 1 y ]   
    [ 0 0 1 ]        

    [ cos(skewY)   -sin(skewX)   0 ]  
B = [ sin(skewY)    cos(skewX)   0 ] 
    [    0                 0     1 ]

    [ scaleX    0       0 ]
C = [   0     scaleY    0 ]
    [   0       0       1 ]

(1) M = A * B * C 

                [ scaleX * cos(skewY)   -scaleY * sin(skewX)    x ]
(2) A * B * C = [ scaleX * sin(skewY)    scaleY * cos(skewX)    y ]
                [        0                      0               1 ]

结合(1)(2)得：

(3) a = scaleX * cos(skewY)  ;
(4) b = scaleX * sin(skewY)  ;
(5) c = -scaleY * sin(skewX) ;
(6) d = scaleY * cos(skewX)  ;

结合(3)(4)(5)(6)得：

(7)  |scaleX| = Math.sqrt( a * a + b * b )
(8)  |scaleY| = Math.sqrt( c * c + d * d )
(9)  skewY  = Math.atan2(b, a)
(10) skewX  = Math.atan2(d, c) - Math.PI / 2 
     { tan(skewX) = -c/d } =>
     { cot(skewX + PI/2) = c/d } =>
     { tan(skewX + PI/2) = d/c } => 
     { skewX + PI/2 = Math.atan2(d, c) }
(11) IF(skewX == skewY) => (rotation = skewX = skewY)
```
### `补充`
图形 node 具有属性 `(每个属性就是变换的参数数据)`
* node.x 
* node.y
* node.scaleX
* node.scaleY
* node.skewX
* node.skewY
* node.rotation (等价于skewX == skewY)

图形对应的变换矩阵 Matrix 具有参数
* m.a 
* m.b
* m.c
* m.d
* m.tx
* m.ty

但是 node 与 Matrix 之间不可以互相转换, 如下：

(a) 已知node属性 ,  根据公式（2）可以计算出 Matrix 

(b) 已经Matrix参数, 无法推出唯一的node属性。
```
  1. 比如公式（7）, 只能求得 |scaleX|, 而不是 scaleX ;
  2. 其实以下两个矩阵相同:
         [ scaleX * cos(skewY)   -scaleY * sin(skewX)    x ]
    M1 = [ scaleX * sin(skewY)    scaleY * cos(skewX)    y ]
         [        0                      0               1 ]

         [ -scaleX * cos(skewY+PI)   scaleY * sin(skewX+PI)    x ]
    M2 = [ -scaleX * sin(skewY+PI)  -scaleY * cos(skewX+PI)    y ]
         [        0                         0                  1 ]

    M1 = M2 (可验证而得)

    若   node1 => M1, node2 => M2,
    那么 同一个矩阵对应两个不同的图形节点.
    node1.scaleX = -node2.scaleX; node1.skewY = node2.skewY+PI;
    node1.scaleY = -node2.scaleY; node1.skewX = node2.skewX+PI;
```
总结： 
* a. Matrix = F(Node) 是单值函数;  一个node对应唯一的Matrix
* b. Node = G(Matrix) 是多值函数;  一个Matrix对应两个Node
* c. 关于M1=M2,及矩阵分解成基本变换的组合,得出存在两种等价的却不同的变换方法路径,参考代码: [测试代码示例](test/testMatrix.html)
```
(M1) M1 = A1 * B1 * C1
    第一步：平移 context.transform(1,0,0,1,x,y)
    第二步：旋转 context.transform(cos(skewY),sin(skewY),-sin(skewX),cos(skewX),0,0)
    第三步：缩放 context.transform(scaleX,0,0,scaleY,0,0)
(M2) M2 = A2 * B2 * C2 
    第一步：平移 context.transform(1,0,0,1,x,y)
    第二步：旋转 context.transform(cos(skewY+PI),sin(skewY+PI),-sin(skewX+PI),cos(skewX+PI),0,0)
    第三步：缩放 context.transform(-scaleX,0,0,-scaleY,0,0)
```
