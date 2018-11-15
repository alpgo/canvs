# canvs
canvas引擎从0开始

## 平面图形变换

### `基本变换`

* 移动 { x, y }

* 旋转 
    - `(顺时针旋转角度为正，因为canvas的坐标系为左手坐标系)`
    * rotation : `X轴,Y轴 旋转相同的角度`
    * skewX    : `Y轴旋转的角度`
    * skewY    : `X轴旋转的角度`

* 缩放 { scaleX, scaleY }

### `复合矩阵`

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

(7)  scaleX = Math.sqrt( a * a + b * b )
(8)  scaleY = Math.sqrt( c * c + d * d )
(9)  skewY  = Math.atan2(b, a)
(10) skewX  = Math.atan2(d, c) - Math.PI / 2 
     { tan(skewX) = -c/d } =>
     { cot(skewX + PI/2) = c/d } =>
     { tan(skewX + PI/2) = d/c } => 
     { skewX + PI/2 = Math.atan2(d, c) }
(11) IF(skewX == skewY) => (rotation = skewX = skewY)
```