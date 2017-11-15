import { react } from 'react'
import { render } from 'react-dom'

export default class Window extends React.Component {
    constructor(props) {
        super(props)
        props.trigger(this.update.bind(this))
        this.state = {
            component: this.createComponent(props.component),
            value: {},
            display: props.display ? 'visible' : 'hidden',
            call : props.call
        }
    }

    update(component, display, func) {
        this.setState({
            component: this.createComponent(component),
            display: display ? 'visible' : 'hidden',
            call: func,
            value: []
        })
    }
    createComponent(rule) {
        if (!rule) return <div></div>
        let component = rule.map((t, i) => {
            return <div className="row" key={Math.random()}>
                <div className="text">{t}:</div>
                <input type="text" onChange={(v) => {
                    let o = Object.assign({}, this.state.value)
                    o[t] = parseFloat(v.target.value)
                    this.setState({ value: o })
                }} />
            </div>
        })
        //console.log(component)
        return component
    }
    handleAnswer() {
        if (this.state.value && this.state.value.length > 0)
            for (let i in this.state.value.keys())
                if (!this.state.value[i])
                    return
                else
                    return
        this.state.call(this.state.value)
        this.hide()
    }

    hide() {
        this.setState({ display: 'hidden' })
    }

    render() {
        return (<div className='window' style={{ visibility: this.state.display }}>
            {this.state.component}
            <div className="row dock">
                <button onClick={this.handleAnswer.bind(this)}>OK</button>
                <button onClick={this.hide.bind(this)}>Hide</button>
            </div>
        </div>);
    }
}