import 'paper'

class myCanvas {
    constructor() {
        this.project = paper.project
        this.gird = new Layer()
        this.axies = new Layer()
        this.drawing = new Layer()
        this.offset = new Point(0, 0)
        this.scale = 1
        this.girdDistance = 100
        this.trans = new Point(0, 0)
        this.pixelQueue = []
        this.onDrawing = false
        this.delay = 100
        this.init()
        this.project.view.scale(this.scale, new Point(0, 0))
    }
    init() {
        this.project.view.onResize = (event) => {
            this.drawGird()
            this.drawAxie()
            this.drawing.activate()
            // let path = new Path.Line(0, 0,1000,1000)
            // path.strokeColor = 'black'
            // path.closePath()
        }
        //console.log(this.project.view.scaling)
    }

    setScale(i) {
        this.gird.view.translate(this.trans * -1)
        this.trans *= 0

        this.project.view.scale(i / this.scale, new Point(0, 0))
        this.scale = i
        this.drawAxie()
        this.drawGird()
    }

    drawAxie() {
        this.axies.removeChildren()
        this.axies.activate()
        if (this.offset.x == 0 && this.offset.y == 0)
            return
        let path = new Path.Line({
            from: [this.offset.x, 0],
            to: [this.offset.x, this.project.view.size.height - this.trans.y],
            strokeColor: 'red',
            strokeWidth: 1
        })
        let path2 = new Path.Line({
            from: [0, this.offset.y],
            to: [this.project.view.size.width - this.trans.x, this.offset.y],
            strokeColor: 'red',
            strokeWidth: 1
        })
    }

    setAxies(x, y) {
        this.offset = new Point(x, y)
        this.drawAxie()
    }

    clear() {
        this.drawing.removeChildren()
    }
    translate(x, y) {
        this.gird.view.translate(this.trans * -1)
        this.trans = new Point(-x, -y)
        this.gird.view.translate(this.trans)
        this.drawGird()
        this.drawAxie()
    }
    setGird(i) {
        this.girdDistance = i
        this.drawGird()
    }
    drawGird() {
        this.gird.removeChildren()
        this.gird.activate()
        if (this.girdDistance <= 0) {
            return
        }
        // Create a Paper.js Path to draw a line into it:
        for (let i = this.girdDistance; i < this.project.view.size.width / 0.5; i += this.girdDistance) {
            let path = new Path.Line({
                from: [i, 0],
                to: [i, this.project.view.size.height / 0.5],
                strokeColor: '#ddd',
                strokeWidth: 1
            });
        }
        for (let i = this.girdDistance; i < this.project.view.size.height / 0.5; i += this.girdDistance) {
            let path = new Path.Line({
                from: [0, i],
                to: [this.project.view.size.width / 0.5, i],
                strokeColor: '#ddd',
                strokeWidth: 1
            });
        }

    }

    _translate(...args) {
        let flag = 1
        if (this.offset.x != 0 && this.offset.y != 0)
            flag = -1
        return args.map((v) => {
            return new Point(v.x + this.offset.x, v.y * flag + this.offset.y)
        })
    }

    drawDDALine(p1, p2) {
        [p1, p2] = this._translate(p1, p2)
        if (Math.abs((p1.y - p2.y) / (p1.x - p2.x)) < 1) {
            [p1, p2] = this._assumex(p1, p2)
            let m = this._slope(p1, p2)
            let base = p1.y
            for (let i = p1.x; i <= p2.x; i++) {
                this.setPixel(i, base)
                base += m
            }
        } else {
            [p1, p2] = this._assumey(p1, p2)
            let m = this._slope(p1, p2)
            let base = p1.x
            for (let i = p1.y; i <= p2.y; i++) {
                this.setPixel(base, i)
                base += 1 / m
            }
        }
    }


    drawBresenhamLine(p1, p2) {
        [p1, p2] = this._translate(p1, p2)
        if (Math.abs((p1.y - p2.y) / (p1.x - p2.x)) < 1) {
            [p1, p2] = this._assumex(p1, p2)
            const dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y)
            let p = 2 * dy - dx, y = p1.y
            this.setPixel(p1.x, p1.y)
            for (let i = p1.x; i < p2.x; i++) {
                if (p < 0) {
                    // console.log(p)
                    p += 2 * dy
                    this.setPixel(i + 1, y)
                } else {
                    // console.log(p)
                    p += 2 * dy - 2 * dx
                    y += p1.y < p2.y ? 1 : -1
                    this.setPixel(i + 1, y)
                }
            }
        } else {
            [p1, p2] = this._assumey(p1, p2)
            const dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y)
            let p = 2 * dx - dy, x = p1.x
            this.setPixel(p1.x, p1.y)
            for (let i = p1.y; i < p2.y; i++) {
                if (p < 0) {
                    // console.log(p)
                    p += 2 * dx
                    this.setPixel(x, i + 1)
                } else {
                    // console.log(p)
                    p += 2 * dx - 2 * dy
                    x += p1.x < p2.x ? 1 : -1
                    this.setPixel(x, i + 1)
                }
            }
        }
    }

    drawCircle(p, r) {
        [p] = this._translate(p)
        let drawAll = (x, y) => {
            this.setPixel(p.x + x, p.y + y)
            this.setPixel(p.x - x, p.y - y)
            this.setPixel(p.x + x, p.y - y)
            this.setPixel(p.x - x, p.y + y)
            this.setPixel(p.x + y, p.y + x)
            this.setPixel(p.x - y, p.y + x)
            this.setPixel(p.x + y, p.y - x)
            this.setPixel(p.x - y, p.y - x)
        }
        let x = 0, y = r
        let _p = 5 / 4 - r
        drawAll(x, y)
        while (x < y) {
            if (_p < 0) {
                drawAll(++x, y)
                _p += 2 * x + 1
            } else {
                drawAll(++x, --y)
                _p += 2 * x + 1 - 2 * y
            }
        }
    }

    drawEllipse(p, rx, ry) {
        [p] = this._translate(p)
        let drawAll = (x, y) => {
            this.setPixel(p.x + x, p.y + y)
            this.setPixel(p.x - x, p.y - y)
            this.setPixel(p.x + x, p.y - y)
            this.setPixel(p.x - x, p.y + y)
        }
        let x = 0, y = ry
        const ry2 = ry * ry, rx2 = rx * rx
        let _p = ry2 - rx2 * ry + 0.25 * rx2
        drawAll(x, ry)
        while (x * ry2 < rx2 * y) {
            if (_p < 0) {
                drawAll(++x, y)
                _p += 2 * x * ry2 + ry2
            } else {
                drawAll(++x, --y)
                _p += 2 * x * ry2 + ry2 - 2 * y * rx2
            }
        }
        while (y >= 0) {
            _p = ry2 * (x + 0.5) * (x + 0.5) + rx2 * (y - 1) * (y - 1) - rx2 * ry2
            if (_p > 0) {
                drawAll(x, --y)
                _p += - rx2 * y + rx2
            } else {
                drawAll(++x, --y)
                _p += 2 * ry2 * x - 2 * rx2 * y + rx2
            }
        }
    }

    _assumex(p1, p2) {
        if (p1.x > p2.x)
            return [p2, p1]
        else
            return [p1, p2]
    }
    _assumey(p1, p2) {
        if (p1.y > p2.y)
            return [p2, p1]
        else
            return [p1, p2]
    }

    _slope(p1, p2) {
        return (p1.y - p2.y) / (p1.x - p2.x)
    }

    drawPixel() {
        if (this.pixelQueue.length > 0) {
            this.onDrawing = true
            let point = this.pixelQueue.shift()
            this.drawing.activate()
            console.log("point : " + point.x + "," + point.y )
            let path = new Path.Rectangle(point, point + [.001, .001])
            path.strokeColor = 'black'
            path.closePath()
            //console.log(this.pixelQueue)
            if (this.pixelQueue.length > 0)
                setTimeout(this.drawPixel.bind(this), this.delay)
            else
                this.onDrawing = false
        } else {
            this.onDrawing = false
        }
    }

    setPixel(x, y) {
        let start = new Point(parseInt(x + 0.5), parseInt(y + 0.5))
        this.pixelQueue.push(start)
        //console.log(this.pixelQueue)
        if (!this.onDrawing)
            setTimeout(this.drawPixel.bind(this), this.delay)
        this.onDrawing = true
    }
}

export default myCanvas