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

// Method 2
export default class FloodFiller {
  public imageData: ImageData;

  // part of experimental
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

  // end experimental

  constructor(imageData: ImageData) {
    this.imageData = imageData;
    this.tolerance = 0;
  }

  private hexToRgb = (hex: string, opacity: number = 1) => {
    opacity = Math.round(opacity * 255) || 255;
    hex = hex.replace('#', '');
    const rgb: any = [];
    const re = new RegExp('(.{' + hex.length/3 + '})', 'g');
    (hex.match(re) as any[]).forEach(function(l) {
      rgb.push(parseInt(hex.length % 2 ? l+l : l, 16));
    });
    return rgb.concat(opacity);
  }
  
  public withinTolerance = (array1: Uint8ClampedArray, offset: any, array2: Uint8ClampedArray, tolerance: number = 0) => {
    let length = array2.length;
		let start = offset + length;

		// Iterate (in reverse) the items being compared in each array, checking their values are
		// within tolerance of each other
		while(start-- && length--) {
			if(Math.abs(array1[start] - array2[length]) > tolerance) {
				return false;
			}
		}

		return true;
  }

  public getPointOffset = (x: number, y: number) => {
    return 4 * (y * this.imageData.width + x)
  };

  public fill = (
    point: { x: number; y: number } | undefined,
    colorHex: string,
    tolerance: number
  ) => {
    let directions = [[1, 0], [0, 1], [0, -1], [-1, 0]];
    let coords = [];
    let points = [point];
    let seen = {};
    let key;
    let x;
    let y;
    let offset;
    let i;
    let x2;
    let y2;
    let minX = -1;
    let minY = -1;
    let maxX = -1;
    let maxY = -1;
    let targetOffset = this.getPointOffset(point?.x as number, point?.y as number);
    let target = this.imageData.data.slice(targetOffset, targetOffset + 4);
    let width = this.imageData.width;
    let height = this.imageData.height;
    let color = this.hexToRgb(colorHex, 1);

    // Keep going while we have points to walk
		while (!!(point = points.pop())) {
			x = point.x;
			y = point.y;
			offset = this.getPointOffset(x, y);

			// Move to next point if this pixel isn't within tolerance of the color being filled
			if (!this.withinTolerance(this.imageData.data, offset, target, tolerance)) {
				continue;
			}

			if (x > maxX) { maxX = x; }
			if (y > maxY) { maxY = y; }
			if (x < minX || minX === -1) { minX = x; }
			if (y < minY || minY === -1) { minY = y; }

			// Update the pixel to the fill color and add neighbours onto stack to traverse
			// the fill area
			i = directions.length;
			while (i--) {
				// Use the same loop for setting RGBA as for checking the neighbouring pixels
				if (i < 4) {
          // @ts-ignore
					this.imageData[offset + i] = color[i];
					coords[offset+i] = color[i];
				}

				// Get the new coordinate by adjusting x and y based on current step
				x2 = x + directions[i][0];
				y2 = y + directions[i][1];
				key = x2 + ',' + y2;

				// If new coordinate is out of bounds, or we've already added it, then skip to
        // trying the next neighbour without adding this one
        // @ts-ignore
				if (x2 < 0 || y2 < 0 || x2 >= width || y2 >= height || seen[key]) {
					continue;
				}

				// Push neighbour onto points array to be processed, and tag as seen
        points.push({ x: x2, y: y2 });
        // @ts-ignore
				seen[key] = true;
			}
		}

		return {
			x: minX,
			y: minY,
			width: maxX-minX,
			height: maxY-minY,
			coords: coords
		}
  }


  // Experimental, top works but slow

  private getColorAtPixel = (
    imageData: ImageData,
    x: number,
    y: number,
  ): ColorRGBA => {
    const { width, data } = imageData
    const startPos = 4 * (y * width + x)
    if (data[startPos + 3] === undefined) {
        throw new Error('Invalid pixel coordinates: x=' + x + '; y=' + y)
    }
    return {
        r: data[startPos],
        g: data[startPos + 1],
        b: data[startPos + 2],
        a: data[startPos + 3],
    }
  }

  public hex2RGBA(hex: string, alpha = 255): ColorRGBA {
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

  private addToQueue(line: LineQueued): void {
    this.queue.push(line)
  }

  private popFromQueue(): LineQueued | null {
    if (!this.queue.length) {
      return null
    }
    //@ts-ignore
    return this.queue.pop()
  }

  private isValidTarget(pixel: PixelCoords | null): boolean {
    if (pixel === null) {
      //@ts-ignore
      return
    }
    const pixelColor = this.getColorAtPixel(this.imageData, pixel.x, pixel.y)
    const tempTolerance = 100; // This is to prevent white spaces around paths.
    return this.isSameColor(this.replacedColor, pixelColor, tempTolerance);
  }

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

  private setPixelColor(color: ColorRGBA, pixel: PixelCoords): void {
    this.setColorAtPixel(this.imageData, color, pixel.x, pixel.y)
    this.modifiedPixelsCount++
    this.collectModifiedPixels &&
    this.modifiedPixels.add(`${pixel.x}|${pixel.y}`)
  }


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

  public fillExp = async (point: {x: number, y: number}, colorHex: string, tolerance: number): Promise<any> => {
    try {  
      this.color = this.hex2RGBA(colorHex);
      this.replacedColor = this.getColorAtPixel(this.imageData, point.x, point.y);
      this.tolerance = tolerance;

      if (this.isSameColor(this.replacedColor, this.color, this.tolerance)) {
        return;
      }

      console.log('start filling...', this.replacedColor, this.color);
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
