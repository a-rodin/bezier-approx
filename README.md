bezier-approx
=============

Small library that allows to approximate cubic Bezier curves with a number of 
quadratic Bezier curves. 

Algorith
---------
The algorithm it uses is following: 
 * split quadratic curve into _k_ segments
 * approximate each segment using Generic Midpoint approach (which is described i.e. [here](http://www.timotheegroleau.com/Flash/articles/cubic_bezier_in_flash.htm))
 * check is the approximation good enough evaluating distance between cubic segment and quadratic approximation in 10 points and using the largest distance as a error
 * if error is small enough stop, otherwise increase _k_ and repeat until _k_ exceeds maximum number of segments

Usage
-----

    var bezier = require('bezier-approx');
    var quads = bezier.cubicToQuad(0, 0, 10, 9, 20, 11, 30, 0, 0.1);
    // quads = [ 0, 0, 7.9411764705882355, 7.147058823529412, 15, 7.5, 22.82608695652174, 7.891304347826087, 30, 0 ]
    var isClose = bezier.isApproximationClose(0, 0, 10, 9, 20, 11, 30, 0, quads, 0.1) // isClose is true

It converts given quadratic curve to two quadratic ones. The structure of output array is following:

    [ P0x, P0y, C1x, C1y, P1x, P1y, C2x, C2y, ..., Cnx, Cny, Pnx, Pny ]

where _Pi_ are base points and _Ci_ are control points.
