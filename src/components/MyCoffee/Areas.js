import React, {Component} from 'react'
import {G, Polygon,Circle} from 'react-native-svg'

export default class Areas extends Component {

    static defaultProps = {
        colors:[
            '#ea9308', '#ea9308', '#ea9308', '#ea9308', '#ea9308'
        ]
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {areas,colors} = this.props
        let render = areas.map(
            (items, index) => (
                <G key={'area' + index}>
                    <Polygon
                        points={items.area}
                        fill={colors[index]}
                        fillOpacity={index == 0 ? "0.5" : "1"}
                        stroke={colors[index]}
                    />
                    {items.circles.map(
                        (item, inSideindex) => (
                            <Circle
                                key={'circle' + index + inSideindex}
                                cx={item.x}
                                cy={item.y}
                                r={index == 0 ? 3 : 0}
                                stroke={colors[index]}
                                fill={'#ea9308'}
                                strokeWidth={index == 0 ? 6 : 0}
                            />
                        )
                    )
                    }
                </G>
            )
        )
        return (
            <G>
                {render}
            </G>
        )
    }
}