/**
 * Author: https://gist.github.com/maxdeviant/cfed775121829eb02283347083915383
 */

declare module "styled-system" {
  export interface BaseTheme {
    breakpoints?: number[]
    space?: number[]
    fontSizes?: number[]
    colors?: {
      [name: string]: string
    }
  }

  type ResponsiveValue<T> = T | Array<T | null>

  /**
   * Core
   */

  export type SpaceValue = number | string
  export type ResponsiveSpaceValue = ResponsiveValue<SpaceValue>

  export interface SpaceProps {
    m?: ResponsiveSpaceValue
    mt?: ResponsiveSpaceValue
    mr?: ResponsiveSpaceValue
    mb?: ResponsiveSpaceValue
    ml?: ResponsiveSpaceValue
    mx?: ResponsiveSpaceValue
    my?: ResponsiveSpaceValue
    p?: ResponsiveSpaceValue
    pt?: ResponsiveSpaceValue
    pr?: ResponsiveSpaceValue
    pb?: ResponsiveSpaceValue
    pl?: ResponsiveSpaceValue
    px?: ResponsiveSpaceValue
    py?: ResponsiveSpaceValue
  }

  export function space(...args: any[]): any

  export type WidthValue = number | string
  export type ResponsiveWidthValue = ResponsiveValue<WidthValue>

  export interface WidthProps {
    width?: ResponsiveWidthValue
  }

  export interface MinWidthProps {
    minWidth?: ResponsiveWidthValue
  }

  export interface MaxWidthProps {
    maxWidth?: ResponsiveWidthValue
  }

  export type HeightValue = number | string
  export type ResponsiveHeightValue = ResponsiveValue<HeightValue>

  export interface HeightProps {
    height?: ResponsiveHeightValue
  }

  export interface MinHeightProps {
    minHeight?: ResponsiveHeightValue
  }

  export interface MaxHeightProps {
    maxHeight?: ResponsiveHeightValue
  }

  export function width(...args: any[]): any
  export function minWidth(...args: any[]): any
  export function maxWidth(...args: any[]): any
  export function height(...args: any[]): any
  export function minHeight(...args: any[]): any
  export function maxHeight(...args: any[]): any

  export interface SizeProps {
    size?: ResponsiveWidthValue | ResponsiveHeightValue
  }

  export function size(...args: any[]): any

  export type FontSizeValue = number | string
  export type ResponsiveFontSizeValue = ResponsiveValue<FontSizeValue>

  export interface FontSizeProps {
    fontSize?: ResponsiveFontSizeValue
  }

  export function fontSize(...args: any[]): any

  export type ColorValue = string
  export type ResponsiveColorValue = ResponsiveValue<ColorValue>

  // export interface ColorProps {
  //   color?: ResponsiveColorValue
  //   bg?: ResponsiveColorValue
  // }

  export function color(...args: any[]): any

  /**
   * Extras
   */

  export type TextAlignValue =
    | "left"
    | "right"
    | "center"
    | "justify"
    | "justify-all"
    | "start"
    | "end"
    | "match-parent"
  export type ResponsiveTextAlignValue = ResponsiveValue<TextAlignValue>

  export interface TextAlignProps {
    align?: ResponsiveTextAlignValue
  }

  export function textAlign(...args: any[]): any

  export type FontWeightValue =
    | "normal"
    | "bold"
    | "lighter"
    | "bolder"
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900

  export interface FontWeightProps {
    fontWeight?: FontWeightValue
  }

  export function fontWeight(...args: any[]): any

  export type AlignItemsValue =
    | "normal"
    | "stretch"
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "self-start"
    | "self-end"
    | "left"
    | "right"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "safe center"
    | "unsafe center"
  export type ResponsiveAlignItemsValue = ResponsiveValue<AlignItemsValue>

  export interface AlignItemsProps {
    align?: ResponsiveAlignItemsValue
    alignItems?: ResponsiveAlignItemsValue
  }

  export type AlignContentValue =
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "normal"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch"
    | "safe center"
    | "unsafe center"
    | "inherit"
    | "initial"
    | "unset"
  export type ResponsiveAlignContentValue = ResponsiveValue<AlignContentValue>

  export interface AlignContentProps {
    alignContent?: ResponsiveAlignItemsValue
  }

  export function alignItems(...args: any[]): any
  export function alignContent(...args: any[]): any

  export type JustifyContentValue =
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "left"
    | "right"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch"
    | "safe center"
    | "unsafe center"
  export type ResponsiveJustifyContentValue = ResponsiveValue<
    JustifyContentValue
  >

  export interface JustifyContentProps {
    justify?: ResponsiveJustifyContentValue
    justifyContent?: ResponsiveJustifyContentValue
  }

  export function justifyContent(...args: any[]): any

  export interface FlexWrapProps {
    wrap?: boolean
  }

  export function flexWrap(...args: any[]): any

  export type FlexDirectionValue =
    | "row"
    | "row-reverse"
    | "column"
    | "column-reverse"
  export type ResponsiveFlexDirectionValue = ResponsiveValue<FlexDirectionValue>

  export interface FlexDirectionProps {
    flexDirection?: ResponsiveFlexDirectionValue
  }

  export function flexDirection(...args: any[]): any

  export type FlexValue = string
  export type ResponsiveFlexValue = ResponsiveValue<FlexValue>

  export interface FlexProps {
    flex?: ResponsiveFlexValue
  }

  export function flex(...args: any[]): any

  export type AlignSelfValue =
    | "auto"
    | "normal"
    | "center"
    | "start"
    | "end"
    | "self-start"
    | "self-end"
    | "flex-start"
    | "flex-end"
    | "left"
    | "right"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "stretch"
    | "safe center"
    | "unsafe center"
  export type ResponsiveAlignSelfValue = ResponsiveValue<AlignSelfValue>

  export interface AlignSelfProps {
    alignSelf?: ResponsiveAlignSelfValue
  }

  export function alignSelf(...args: any[]): any

  export type BorderRadiusValue = number

  export function border(...args: any[]): any
  export function borders(...args: any[]): any

  export interface BorderRadiusProps {
    borderRadius?: BorderRadiusValue
  }

  export function borderRadius(...args: any[]): any

  export type BorderColorValue = string

  export interface BorderColorProps {
    borderColor?: BorderColorValue
  }

  export function borderColor(...args: any[]): any

  export type BorderWidthValue = number

  export interface BorderWidthProps {
    borderWidth?: BorderWidthValue
    borderTop?: boolean
    borderRight?: boolean
    borderBottom?: boolean
    borderLeft?: boolean
  }

  export function borderWidth(...args: any[]): any

  export type BoxShadowValue = number

  export interface BoxShadowProps {
    boxShadow?: BoxShadowValue
  }

  export function boxShadow(...args: any[]): any

  export type PseudoStyleValue = {
    color?: string
    backgroundColor?: string
    borderColor?: string
    boxShadow?: number
  }

  export type HoverValue = PseudoStyleValue

  export interface HoverProps {
    hover?: HoverValue
  }

  export function hover(...args: any[]): any

  export type FocusValue = PseudoStyleValue

  export interface FocusProps {
    focus?: FocusValue
  }

  export function focus(...args: any[]): any

  export type ActiveValue = PseudoStyleValue

  export interface ActiveProps {
    active?: ActiveValue
  }

  export function active(...args: any[]): any

  export type DisabledValue = PseudoStyleValue

  export interface DisabledProps {
    disabledStyle?: DisabledValue
  }

  export function disabled(...args: any[]): any

  /**
   * Utilities
   */

  export function theme(keys: string): any
  export function themeGet(keys: string): any

  export function cleanElement(component: any): any

  export function removeProps(props: any): any

  /**
   * Low-level style functions
   */

  export interface LowLevelStyleFunctionArguments {
    prop: string
    cssProperty?: string
    key?: string
    numberToPx?: boolean
  }

  export function style(args: LowLevelStyleFunctionArguments): any

  export function responsiveStyle(args: LowLevelStyleFunctionArguments): any

  export function pseudoStyle(args: LowLevelStyleFunctionArguments): any

  /**
   * Artsy
   *
   * WIP / FIXME / Additions
   */

  export type BorderValue = string | number

  export interface BorderProps {
    border?: BorderValue
  }

  // FIXME: Should be able to use ColorProps above
  export interface ColorProps {
    color?: ColorValue
    bg?: ColorValue
    backgroundColor?: ColorValue
  }

  export function display(...args: any[]): any

  export type DisplayValue =
    | "inline"
    | "block"
    | "contents"
    | "flex"
    | "grid"
    | "inline-block"

  export interface DisplayProps {
    display?: DisplayValue
  }

  export type FlexBasisValue =
    | "auto"
    | "fill"
    | "max-content"
    | "min-content"
    | "fit-content"
    | "content"
    | "inherit"
    | "initial"
    | "unset"

  export interface FlexBasisProps {
    // TODO: The FlexBasisValue currently really only exists for documentation
    //       purposes, because flex-basis also accepts `Nem` and `Npx` strings.
    //       Not sure there’s a way to still have the union values show up as
    //       auto-completion results.
    flexBasis?: FlexBasisValue | string
  }

  export function flexBasis(...args: any[]): any

  export type PositionValue = string | number

  export interface PositionProps {
    top?: PositionValue
    right?: PositionValue
    bottom?: PositionValue
    left?: PositionValue
  }

  export function position(...args: any[]): any
  export function top(...args: any[]): any
  export function right(...args: any[]): any
  export function bottom(...args: any[]): any
  export function left(...args: any[]): any

  export type WhiteSpaceValue =
    | "inherit"
    | "initial"
    | "normal"
    | "nowrap"
    | "pre-line"
    | "pre-wrap"
    | "pre"

  export interface WhiteSpaceProps {
    whiteSpace?: WhiteSpaceValue
  }
}
