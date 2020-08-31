type ColorRGBA = {
    r: number
    g: number
    b: number
    a: number
}

type PixelCoords = {
    x: number
    y: number
}

type LineQueued = [number, number, number, number]

export default class FloodFiller {
  public imageData: ImageData;
  public color: any;
  public replacedColor: any;
  public tolerance: number;
  public queue: any[] = [];
  public modifiedPixelsCount = 0;
  public collectModifiedPixels: any;
  public modifiedPixels: any;
  public coords: any = [];
  public maxX: number = -1;
  public minX: number = -1;
  public maxY: number = -1;
  public minY: number = -1;

  /**
   * Class constructor
   * @param imageData Canvas ImageData
   */
  constructor(imageData: ImageData) {
    this.imageData = imageData;
    this.tolerance = 0;
  }

  /**
   * Gets color of specific pixel.
   * @param imageData Canvas ImageData
   * @param x X coordinate
   * @param y Y coordinate
   */
  public getColorAtPixel = (
    imageData: ImageData,
    x: number,
    y: number,
  ): ColorRGBA => {
    const { width, data } = imageData
    const startPos = 4 * (y * width + x)
    if (data[startPos + 3] === undefined) {
        throw new Error(`Invalid pixel coordinates: x=${x}; y=${y}`)
    }
    return {
        r: data[startPos],
        g: data[startPos + 1],
        b: data[startPos + 2],
        a: data[startPos + 3],
    }
  }

  /**
   * Changes hex color to rgba
   * @param hex color hex string
   * @param alpha Opacity
   */
  public hex2RGBA(hex: string, alpha:number = 255): ColorRGBA {
    let parsedHex = hex
    if (hex.indexOf('#') === 0) {
        parsedHex = hex.slice(1)
    }
    // convert 3-digit hex to 6-digits.
    if (parsedHex.length === 3) {
        parsedHex =
            parsedHex[0] +
            parsedHex[0] +
            parsedHex[1] +
            parsedHex[1] +
            parsedHex[2] +
            parsedHex[2]
    }
    if (parsedHex.length !== 6 && parsedHex !== 'transparent') {
      throw new Error(`Invalid HEX color ${parsedHex}.`)
    } else if (parsedHex === 'transparent') {
      return {
        r:255, g:255, b:255, a:0
      };
    }

    const r = parseInt(parsedHex.slice(0, 2), 16)
    const g = parseInt(parsedHex.slice(2, 4), 16)
    const b = parseInt(parsedHex.slice(4, 6), 16)
    return {
        r,
        g,
        b,
        a: alpha,
    }
  }

  /**
   * Checks if colors are the same.
   * @param a Color to compare
   * @param b Color to compare
   * @param tolerance Color tolerance. If not 0, will return true to slight variations.
   */
  public isSameColor = (
    a: ColorRGBA,
    b: ColorRGBA,
    tolerance = 0,
  ): boolean => {

    return !(
        Math.abs(a.r - b.r) > tolerance ||
        Math.abs(a.g - b.g) > tolerance ||
        Math.abs(a.b - b.b) > tolerance ||
        Math.abs(a.a - b.a) > tolerance
    )
  }

  /**
   * Adds line to color fill to queue
   * @param line Line to color fill
   */
  private addToQueue(line: LineQueued): void {
    this.queue.push(line)
  }

  /**
   * Removes line to color fill from queue
   */
  private popFromQueue(): LineQueued | null {
    if (!this.queue.length) {
      return null
    }
    //@ts-ignore
    return this.queue.pop()
  }

  /**
   * Checks if coordinates and pixel are valid.
   * @param pixel Coordinates of pixel.
   */
  private isValidTarget(pixel: PixelCoords | null): boolean {
    if (pixel === null) {
      //@ts-ignore
      return
    }
    const pixelColor = this.getColorAtPixel(this.imageData, pixel.x, pixel.y)
    const tempTolerance = 100; // This is to prevent white spaces around paths.
    return this.isSameColor(this.replacedColor, pixelColor, tempTolerance);
  }

  /**
   * Changes color of pixel at specific coordinates.
   * @param imageData Canvas ImageData
   * @param color New color of pixel.
   * @param x X coordinate
   * @param y Y coordinate
   */
  public setColorAtPixel(
    imageData: ImageData,
    color: ColorRGBA,
    x: number,
    y: number,
  ): void {
    const { width, data } = imageData;
    const startPos = 4 * (y * width + x)
    if (data[startPos + 3] === undefined) {
        throw new Error(
            'Invalid pixel coordinates. Cannot set color at: x=' +
                x +
                '; y=' +
                y,
        )
    }

    if (x > this.maxX) { this.maxX = x; }
    if (y > this.maxY) { this.maxY = y; }
    if (x < this.minX || this.minX === -1) { this.minX = x; }
    if (y < this.minY || this.minY === -1) { this.minY = y; }

    data[startPos + 0] = color.r & 0xff;
    data[startPos + 1] = color.g & 0xff;
    data[startPos + 2] = color.b & 0xff;
    data[startPos + 3] = color.a & 0xff;
    this.coords[startPos + 0] = color.r & 0xff;
    this.coords[startPos + 1] = color.g & 0xff;
    this.coords[startPos + 2] = color.b & 0xff;
    this.coords[startPos + 3] = color.a & 0xff;
  }

  /**
   * Begins process to change color of pixel
   * @param color Color to change to
   * @param pixel Pixel at specific coordinate
   */
  private setPixelColor(color: ColorRGBA, pixel: PixelCoords): void {
    this.setColorAtPixel(this.imageData, color, pixel.x, pixel.y)
    this.modifiedPixelsCount++
    this.collectModifiedPixels &&
    this.modifiedPixels.add(`${pixel.x}|${pixel.y}`)
  }

  /**
   * Checks neighboring pixels.
   * @param direction Direction to check to
   * @param x X coordinate
   * @param y Y coordinate
   */
  private getPixelNeighbour(
      direction: string,
      x: number,
      y: number,
  ): PixelCoords | null {
      x = x | 0
      y = y | 0
      let coords: PixelCoords | null = null;
      switch (direction) {
          case 'right':
              coords = { x: (x + 1) | 0, y }
              break
          case 'left':
              coords = { x: (x - 1) | 0, y }
              break
      }
      if (coords && coords.x >= 0 && coords.x < this.imageData.width) {
          return coords
      }
      return null
  }

  /**
   * Start filling line at specific coordinate.
   * @param x X coordinate
   * @param y Y coordinate
   */
  private fillLineAt(x: number, y: number): [number, number] {
      if (!this.isValidTarget({ x, y })) {
          return [-1, -1]
      }
      this.setPixelColor(this.color, { x, y })
      let minX = x
      let maxX = x
      let px = this.getPixelNeighbour('left', minX, y)

      while (px && this.isValidTarget(px)) {
          this.setPixelColor(this.color, px)
          minX = px.x
          px = this.getPixelNeighbour('left', minX, y)
      }
      px = this.getPixelNeighbour('right', maxX, y)
      // prevPx = null;
      while (px && this.isValidTarget(px)) {
          this.setPixelColor(this.color, px)
          maxX = px.x
          px = this.getPixelNeighbour('right', maxX, y)
      }

      return [minX, maxX]
  }

  /**
   * While lines in queue, keeps checking if pixels need to color modified.
   */
  private fillQueue(): void {
    let line = this.popFromQueue()
    while (line) {
      const [start, end, y, parentY] = line
      let currX = start
      while (currX !== -1 && currX <= end) {
        const [lineStart, lineEnd] = this.fillLineAt(currX, y)
        if (lineStart !== -1) {
          if (
            lineStart >= start &&
            lineEnd <= end &&
            parentY !== -1
          ) {
            if (parentY < y && y + 1 < this.imageData.height) {
              this.addToQueue([lineStart, lineEnd, y + 1, y])
            }
            if (parentY > y && y > 0) {
              this.addToQueue([lineStart, lineEnd, y - 1, y])
            }
          } else {
            if (y > 0) {
              this.addToQueue([lineStart, lineEnd, y - 1, y])
            }
            if (y + 1 < this.imageData.height) {
              this.addToQueue([lineStart, lineEnd, y + 1, y])
            }
          }
        }
        if (lineEnd === -1 && currX <= end) {
          currX += 1
        } else {
          currX = lineEnd + 1
        }
      }
      line = this.popFromQueue()
    }
  }

  /**
   * Executes flood fill.
   * @param point Mouse click location coordinates
   * @param colorHex Color to change to.
   * @param tolerance Color tolerance.
   */
  public fill = async (point: {x: number, y: number}, colorHex: string, tolerance: number): Promise<any> => {
    try {  
      this.color = this.hex2RGBA(colorHex);
      this.replacedColor = this.getColorAtPixel(this.imageData, point.x, point.y);
      this.tolerance = tolerance;

      if (this.isSameColor(this.replacedColor, this.color, this.tolerance)) {
        return;
      }

      this.addToQueue([point.x, point.x, point.y, -1])
      this.fillQueue()

      return {
        coords: this.coords,
        x: this.minX,
        y: this.minY,
        width: this.maxX - this.minX,
        height: this.maxY - this.minY,
      }
    } catch(e) {
      console.log('error: ', e);
      return;
    }
  }
}
