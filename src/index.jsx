import myCanvas from './component/paper.js'
import { react } from 'react'
import { render } from 'react-dom'
import Window from './component/window'

let c = new myCanvas()

c.drawGird()
//c.setAxies(250, 250)
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()

let trigger;

menu.append(new MenuItem({
    label: 'DrawLine',
    submenu: [
        {
            label: "DDA", click: () => {
                trigger(['point1.x', 'point1.y', 'point2.x', 'point2.y'], true, (v) => {
                    //console.log(v)
                    c.drawDDALine(new Point(v['point1.x'], v['point1.y']), new Point(v['point2.x'], v['point2.y']))
                })
            }
        },
        {
            label: "Bresenham", click: () => {
                trigger(['point1.x', 'point1.y', 'point2.x', 'point2.y'], true, (v) => {
                    //console.log(v)
                    c.drawBresenhamLine(new Point(v['point1.x'], v['point1.y']), new Point(v['point2.x'], v['point2.y']))
                })
            }
        }
    ]
}))
menu.append(new MenuItem({
    label: 'DrawCircle',
    submenu: [
        {
            label: "Circle", click: () => {
                trigger(['x', 'y', 'r'], true, (v) => {
                    //console.log(v)
                    c.drawCircle(new Point(v['x'], v['y']), v['r'])
                })
            }
        },
        {
            label: "Ellipse", click: () => {
                trigger(['x', 'y', 'rx', 'ry'], true, (v) => {
                    //console.log(v)
                    c.drawEllipse(new Point(v['x'], v['y']), v['rx'], v['ry'])
                })
            }
        }
    ]
}))

menu.append(new MenuItem({
    label: 'Config',
    submenu: [
        {
            label: "setAxie", click: () => {
                trigger(['x', 'y'], true, (v) => {
                    //console.log(v)
                    c.setAxies(v['x'], v['y'])
                })
            }
        },
        {
            label: "setGird", click: () => {
                trigger(['distance'], true, (v) => {
                    //console.log(v)
                    c.setGird(v['distance'])
                })
            }
        },
        {
            label: "moveCanvas", click: () => {
                trigger(['x', 'y'], true, (v) => {
                    //console.log(v)
                    c.translate(v['x'], v['y'])
                })
            }
        },
        {
            label: "setDelay", click: () => {
                trigger(['print delay(ms)'], true, (v) => {
                    //console.log(v)
                    c.delay = parseInt(v['print delay(ms)'])
                })
            }
        },
        {
            label: "clearCanvas", click: () => {
                c.clear()
            }
        }
    ]
}))

menu.append(new MenuItem({
    label: 'Scale',
    submenu: [
        {
            label: "0.5", click: () => {
                c.setScale(0.5)
            }
        },
        {
            label: "1", click: () => {
                c.setScale(1)
            }
        },
        {
            label: "2", click: () => {
                c.setScale(2)
            }
        },
        {
            label: "3", click: () => {
                c.setScale(3)
            }
        },
        {
            label: "4", click: () => {
                c.setScale(4)
            }
        }
    ]
}))

menu.append(new MenuItem({
    label: 'View',
    submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        {role: 'resetzoom'},
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { role: 'minimize' },
        { role: 'close' }
    ]
}))

Menu.setApplicationMenu(menu)


ReactDOM.render(
    <Window component={['point1.x', 'point1.y', 'point2.x', 'point2.y']} display={false} call={(v) => {
    }}
        trigger={(func) => {
            trigger = func
        }}
    />,
    document.getElementById('main')
);