import { colorMaps } from './colormaps.ts'

//------------------------------------------------------------------------------

/**
 * An object depicting a color scale, where values are mapped to colors
 */
export class ColorcetColorScale {
  //----------------------------------------------------------------------------

  /** Color values pulled from Colorcet definitions */
  private readonly allColors: ReadonlyArray<string>

  /** An array from values (in units like inches or years) to color values (0 to 1) */
  private readonly valuesToColorRange: ReadonlyArray<[number, number]>

  /** The HTML canvas to draw the texture to */
  private readonly canvas: HTMLCanvasElement | undefined

  /** The URL of the generated texture */
  private readonly textureURL: string

  //----------------------------------------------------------------------------

  /**
   * The constructor for a ColorcetColorScale object
   * @param props The name of the Colorcet to use, an array from values
   *              (in units like inches or years) to (0, 1) on this Colorcet,
   *              and the entire value range, from a minimum to a maximum value
   */
  constructor(props: {
    name?: string
    valuesToColorRange?: ReadonlyArray<[number, number]>
    valueRange?: [number, number]
    noImage?: boolean
  }) {
    const name = props.name ?? 'R2'
    const colorMap = colorMaps.get(name)
    if (!colorMap) throw Error(`Colorcet "${name}" does not exist!`)
    this.allColors = colorMap.data

    let min = props.valueRange?.at(0) ?? Number.POSITIVE_INFINITY
    let max = props.valueRange?.at(1) ?? Number.NEGATIVE_INFINITY
    if (!props.valueRange && !!props.valuesToColorRange) {
      props.valuesToColorRange.forEach(([value]) => {
        min = Math.min(min, value)
        max = Math.max(max, value)
      })
    }
    if (!isFinite(min)) min = 0.0
    if (!isFinite(max)) max = Math.max(min, 1.0)

    const valueRange = [min, max]
    const valuesToColorRange = props.valuesToColorRange ?? [[min, 0.0], [max, 1.0]]
    this.valuesToColorRange = [...valuesToColorRange].sort(
      ([valueA], [valueB]) => valueA - valueB
    )

    if (window && window.document)
      this.canvas = document.createElement('canvas')

    if (!this.canvas)
      throw Error(`Canvas does not exist for Colorcet "${name}"!`)

    if (!props.noImage) {
      const ctx = this.canvas.getContext('2d')
      if (!ctx) throw Error(`Could not get context for for Colorcet "${name}"!`)

      const height = 1
      const width = 512
      ctx.canvas.height = 1
      ctx.canvas.width = width
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = this.getColorForValue(
          lerp(valueRange[0], valueRange[1], x / (width - 1))
        )
        ctx.fillRect(x, 0, 1, height)
      }
      this.textureURL = this.canvas.toDataURL()
    } else this.textureURL = ''
  }

  /**
   * Returns the color for a given value, looking up values in the Colorcet data
   * @param value The value to get a color for, in units like inches or years
   */
  public getColorForValue = (value: number): string => {
    for (let i = 0; i < this.valuesToColorRange.length; i++) {
      const [curVal, curCol] = this.valuesToColorRange[i]
      if (value > curVal) continue
      if (i === 0) {
        const col = this.valuesToColorRange[0][1]
        const index = Math.round(col * (this.allColors.length - 1))
        return '#' + this.allColors[index]
      }
      else {
        const [prevVal, prevCol] = this.valuesToColorRange[i - 1]
        const col = lerp(
          prevCol,
          curCol,
          (value - prevVal) / (curVal - prevVal)
        )
        const index = Math.round(col * (this.allColors.length - 1))
        return '#' + this.allColors[index]
      }
    }
    const col = this.valuesToColorRange.at(-1)![1]
    const index = Math.round(col * (this.allColors.length - 1))
    return '#' + this.allColors[index]
  }

  /**
   * Returns the URL of the texture associated with this color scale
   */
  public getTextureURL = (): string => this.textureURL
}

//------------------------------------------------------------------------------

/**
 * A simple linear interpolation function between two numbers
 * @param a The number to return if t is 0
 * @param b The number to return if t is 1
 * @param t The interpolation value between 0 and 1
 */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t