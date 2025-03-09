// type WeightUnit = 'grams' | 'kilograms' | 'tonnes'

export type WeightHumanFormatOptions = {
  smallestUnit?: WeightUnit
  largestUnit?: WeightUnit
  includeZeros?: boolean
}

export interface WeightOptionOptions {
  grams?: number
  kilograms?: number
  tonnes?: number
}

export class WeightInstance {
  static readonly gramsPerKilogram = 1000
  static readonly gramsPerTonne = this.gramsPerKilogram * 1000

  static zero = new WeightInstance()

  private weight: number // in grams

  constructor(weight: WeightOptionOptions = {}) {
    const { grams = 0, kilograms = 0, tonnes = 0 } = weight
    this.weight = grams + kilograms * WeightInstance.gramsPerKilogram + tonnes * WeightInstance.gramsPerTonne
  }

  static fromGrams(grams: number) {
    return new WeightInstance({ grams })
  }

  static fromKilograms(kilograms: number) {
    return new WeightInstance({ kilograms })
  }

  static fromTonnes(tonnes: number) {
    return new WeightInstance({ tonnes })
  }

  // static convertFromGrams(grams: number, unit: WeightUnit): number {
  //   return grams / WeightInstance.unitToGrams[unit]
  // }
  static convertFromGrams(grams: number, unit: WeightUnit): number {
    switch (unit) {
      case 'gram':
        return grams
      case 'kilogram':
        return grams / this.gramsPerKilogram
      case 'tonne':
        return grams / this.gramsPerTonne
      default:
        throw new Error(`Invalid unit: ${unit}`)
    }
  }

  // static convertToGrams(weight: number, unit: WeightUnit) {
  //   return weight * WeightInstance.unitToGrams[unit]
  // }

  static convertToGrams(value: number, unit: WeightUnit): number {
    switch (unit) {
      case 'gram':
        return value
      case 'kilogram':
        return value * this.gramsPerKilogram
      case 'tonne':
        return value * this.gramsPerTonne
      default:
        throw new Error(`Invalid unit: ${unit}`)
    }
  }

  static fromUnitToGrams(value: number, unit: WeightUnit) {
    switch (unit) {
      case 'tonne': {
        return this.fromTonnes(value)
      }
      case 'kilogram': {
        return this.fromKilograms(value)
      }
      default:{
        return this.fromGrams(value)
      }
    }
  }

  static convertFromKilograms(kilograms: number, unit: WeightUnit) {
    return kilograms / WeightInstance.unitToGrams[unit]
  }

  static convertFromTonnes(tonnes: number, unit: WeightUnit) {
    return tonnes / WeightInstance.unitToGrams[unit]
  }

  static convertToKilograms(grams: number): number {
    return grams / this.gramsPerKilogram
  }

  static convertToTonnes(grams: number): number {
    return grams / this.gramsPerTonne
  }

  get inGrams() {
    return this.weight
  }

  get inKilograms() {
    return this.weight / WeightInstance.gramsPerKilogram
  }

  get inTonnes() {
    return this.weight / WeightInstance.gramsPerTonne
  }

  toUnit(unit: WeightUnit) {
    switch (unit) {
      case 'kilogram' : return this.inKilograms
      case 'tonne' : return this.inTonnes
      default: return this.inGrams
    }
  }

  toString(): string {
    return `${this.weight}`
  }

  static unitToGrams: { [key in WeightUnit]: number } = {
    gram: 1,
    kilogram: WeightInstance.gramsPerKilogram,
    tonne: WeightInstance.gramsPerTonne
  }

  static unitSymbols: { [key in WeightUnit]: string } = {
    gram: 'g',
    kilogram: 'kg',
    tonne: 't'
  }

  inHumanFormat(options: WeightHumanFormatOptions = {}) {
    const { smallestUnit = 'gram', largestUnit = 'tonne', includeZeros = false } = options
    const WEIGHT_UNITS = ['gram', 'kilogram', 'tonne'] as const
    const units: WeightUnit[] = [...WEIGHT_UNITS]
    const start = units.indexOf(smallestUnit)
    const end = units.indexOf(largestUnit)

    // console.log(`Smallest unit: ${smallestUnit} (index ${start})`)
    // console.log(`Largest unit: ${largestUnit} (index ${end})`)

    let remainingGrams = this.weight

    // console.log(`Converting ${remainingGrams} grams to human format...`)

    const slicedUnits = units.slice(start, end + 1).reverse()
    // console.log(`Sliced units: ${slicedUnits}`)

    const parts = slicedUnits.map((unit) => {
      const unitGrams = WeightInstance.unitToGrams[unit]
      const value = Math.floor(remainingGrams / unitGrams)
      remainingGrams %= unitGrams
      // console.log(`Value in ${unit}: ${value}`)
      return value || includeZeros ? `${value}${WeightInstance.unitSymbols[unit]}` : null
    }).filter(Boolean)

    // console.log(`Parts: ${parts}`)

    return parts.join(' ')
  }

  static fromJson(grams: number) {
    return new WeightInstance({ grams })
  }

  toJson() {
    return this.weight
  }
}
// Create a new WeightInstance object with a weight of 1500 grams
// const weightInstance = new WeightInstance({ kilograms: 100 })

// // Log the weight in grams
// console.log(`${weightInstance.inGrams} g`) // Output: 1500 g

// // Log the weight in kilograms
// console.log(`${weightInstance.inKilograms} kg`) // Output: 1.5 kg

// // Log the weight in metric tons
// console.log(`${weightInstance.inTonnes} t`) // Output: 0.0015 mt

// // Log the weight in human format
// console.log('IN HUMAN: ', weightInstance.inHumanFormat()) // Output: "1500g"

// console.log('TONNE:  in GRAMS', weightInstance.toUnit('tonne'))
