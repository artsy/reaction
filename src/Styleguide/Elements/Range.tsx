import { color, space } from "@artsy/palette"
import { Range as Component } from "rc-slider"
import React from "react"
import styled from "styled-components"
import {
  BorderProps,
  borders,
  space as styledSpace,
  SpaceProps,
} from "styled-system"

export interface RangeProps extends BorderProps, SpaceProps {
  className?: string
  allowCross: boolean
  min: number
  max: number
  step: number
  defaultValue: number[]
  onAfterChange?: (min_max: [number, number]) => void
  onChange?: (min_max: [number, number]) => void
}

const Inner: React.SFC<RangeProps> = props => (
  <Component {...props} prefixCls={props.className} />
)

export const Range = styled(Inner)`
  ${borders};
  ${styledSpace};
  box-sizing: border-box;
  position: relative;
  height: ${space(0.5)}px;
  border-radius: ${space(0.5)}px;
  background-color: ${color("black10")};

  &-track {
    position: absolute;
    left: 0;
    height: ${space(0.5)}px;
    border-radius: ${space(0.5)}px;
    background-color: ${color("black100")};
    z-index: 1;
  }

  &-handle {
    position: absolute;
    margin-left: -10px;
    margin-top: -8px;
    width: ${space(2)}px;
    height: ${space(2)}px;
    cursor: pointer;
    border-radius: 50%;
    border: solid 2px ${color("black100")};
    background-color: ${color("black100")};
    z-index: 2;

    &:first-child {
      margin-left: ${space(1)}px;
    }

    &:last-child {
      margin-left: -${space(1)}px;
    }

    &:hover {
      border-color: ${color("black100")};
    }
    &-active {
      &:active {
        border-color: ${color("black100")};
        box-shadow: 0 0 5px ${color("black100")};
      }
    }
  }

  &-mark {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    font-size: 12px;
    z-index: 3;
  }

  &-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
    z-index: 1;
  }

  &-dot {
    position: absolute;
    bottom: -${space(0.5)}px;
    margin-left: -${space(1)}px;
    width: ${space(2)}px;
    height: ${space(2)}px;
    border: 2px solid ${color("black100")};
    background-color: ${color("black100")};
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
    &:first-child {
      margin-left: -${space(0.5)}px;
    }
    &:last-child {
      margin-left: -${space(0.5)}px;
    }
    &-active {
      border-color: ${color("black60")};
    }
  }

  &-disabled {
    background-color: ${color("black30")};

    &-track {
      background-color: #ccc;
    }

    &-handle,
    &-dot {
      border-color: #ccc;
      background-color: #fff;
      cursor: not-allowed;
    }

    &-mark-text,
    &-dot {
      cursor: not-allowed !important;
    }
  }
`
