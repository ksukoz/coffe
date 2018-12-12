import React, {Component} from 'react'
import {G, Text, Polygon, Line} from 'react-native-svg'

export default class Web extends Component {

    constructor(props) {
        super(props)
        this.state = {
            strokeDashArray: {
                0: [0, 0],
                1: [3, 2],
                2: [3, 2],
                3: [3, 2],
                4: [3, 2],
                5: [0, 0]
            }
        }
    }

    render() {
        let { webs, webPoints, level, textPoints, fieldNames} = this.props;
        return (
            <G>
                {webs.map(
                    (points, index) => {
                        return (
                            <Polygon
                                key={index}
                                points={points}
                                fill={"white"}
                                fillOpacity={0}
                                stroke={"white"}
                                strokeDasharray={this.state.strokeDashArray[index]}
                                //onPanResponderMove={() => f}
                            />
                        )
                    }
                )}
                {webPoints[level-1].map(
                    (item, index) => (
                        <G key={'G' + index}>
                            <Line
                                key={index}
                                stroke="white"
                                strokeWidth="0.5"
                                strokeDasharray={[0, 0]}
                                x1={0}
                                y1={0}
                                x2={item.x}
                                y2={item.y}/>
                        </G>
                    )
                )
                }
            </G>
        )
    }
}