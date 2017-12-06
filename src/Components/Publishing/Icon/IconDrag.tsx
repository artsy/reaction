import React, { Component } from "react"

export class IconDrag extends Component<any, null> {
  static defaultProps = {
    color: "white",
    background: "black"
  }

  render() {
    return (
      <svg className='IconDrag' x="0px" y="0px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-1062.000000, -935.000000)">
          <g transform="translate(1062.000000, 934.000000)">
            <g transform="translate(0.785741, 0.701007)">
              <circle fill={this.props.background} cx="14.5" cy="15" r="14.5" />
              <g transform="translate(10.000000, 6.500000)" strokeWidth="2" stroke={this.props.color}>
                <polyline transform="translate(4.500000, 4.923718) rotate(-45.000000) translate(-4.500000, -4.923718)" points="1.5 1.92371784 7.5 1.92371784 7.5 7.92371784" />
                <polyline transform="translate(4.500000, 12.227216) rotate(-225.000000) translate(-4.500000, -12.227216)" points="1.5 9.2272156 7.5 9.2272156 7.5 15.2272156" />
                <path d="M4.5,1.98457492 L4.5,16.0089159" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}
