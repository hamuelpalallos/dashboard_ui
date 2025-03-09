// type LengthUnit = 'millimeters' | 'centimeters' | 'meters' | 'kilometers'

export type LengthHumanFormatOptions = {
  smallestUnit?: LengthUnit
  largestUnit?: LengthUnit
  includeZeros?: boolean
}

export interface LengthOptionOptions {
  millimeters?: number
  centimeters?: number
  meters?: number
  kilometers?: number
}

export class LengthInstance {
  static readonly millimetersPerCentimeter = 10
  static readonly millimetersPerMeter = 1000
  static readonly millimetersPerKilometer = 1000000

  static zero = new LengthInstance()

  private length: number // in millimeters

  constructor(length: LengthOptionOptions = {}) {
    const { millimeters = 0, centimeters = 0, meters = 0, kilometers = 0 } = length
    this.length = millimeters + centimeters * LengthInstance.millimetersPerCentimeter + meters * LengthInstance.millimetersPerMeter + kilometers * LengthInstance.millimetersPerKilometer
  }

  static fromMillimeters(millimeters: number) {
    return new LengthInstance({ millimeters })
  }

  static fromCentimeters(centimeters: number) {
    return new LengthInstance({ centimeters })
  }

  static fromMeters(meters: number) {
    return new LengthInstance({ meters })
  }

  static fromKilometers(kilometers: number) {
    return new LengthInstance({ kilometers })
  }

  static convertFromMillimeters(millimeters: number, unit: LengthUnit): number {
    switch (unit) {
      case 'millimeter':
        return millimeters
      case 'centimeter':
        return millimeters / this.millimetersPerCentimeter
      case 'meter':
        return millimeters / this.millimetersPerMeter
      case 'kilometer':
        return millimeters / this.millimetersPerKilometer
      default:
        throw new Error(`Invalid unit: ${unit}`)
    }
  }

  static fromUnit(value: number, unit: LengthUnit): LengthInstance {
    return new LengthInstance({ [unit]: value })
  }

  static convertToMillimeters(value: number, unit: LengthUnit): number {
    switch (unit) {
      case 'millimeter':
        return value
      case 'centimeter':
        return value * this.millimetersPerCentimeter
      case 'meter':
        return value * this.millimetersPerMeter
      case 'kilometer':
        return value * this.millimetersPerKilometer
      default:
        throw new Error(`Invalid unit: ${unit}`)
    }
  }

  get inMillimeters() {
    return this.length
  }

  get inCentimeters() {
    return this.length / LengthInstance.millimetersPerCentimeter
  }

  get inMeters() {
    return this.length / LengthInstance.millimetersPerMeter
  }

  get inKilometers() {
    return this.length / LengthInstance.millimetersPerKilometer
  }

  toUnit(unit: LengthUnit) {
    switch (unit) {
      case 'centimeter' : return this.inCentimeters
      case 'meter' : return this.inMeters
      case 'kilometer' : return this.inKilometers
      default: return this.inMillimeters
    }
  }

  toString(): string {
    return `${this.length}`
  }

  static unitToMillimeters: { [key in LengthUnit]: number } = {
    millimeter: 1,
    centimeter: LengthInstance.millimetersPerCentimeter,
    meter: LengthInstance.millimetersPerMeter,
    kilometer: LengthInstance.millimetersPerKilometer,
  }

  static unitSymbols: { [key in LengthUnit]: string } = {
    millimeter: 'mm',
    centimeter: 'cm',
    meter: 'm',
    kilometer: 'km',
  }

  static unitNames: { [key in LengthUnit]: string } = {
    millimeter: 'Millimeters',
    centimeter: 'Centimeters',
    meter: 'Meters',
    kilometer: 'Kilometers',
  }
}
