import { seed_atvCategory, seed_bicycleCategory, seed_chariotCategory, seed_largeCarCategory, seed_mediumCarCategory, seed_motorcycleCategory, seed_pedicabCategory, seed_smallCarCategory, seed_truckCategory } from './cargo-type-category-seeds'
import { seed_classATV, seed_classBicycle, seed_classCarLarge, seed_classCarMedium, seed_classCarSmall, seed_classChariot, seed_classMotorCycleBig, seed_classMotorCycleRegular, seed_classTricycle, seed_classTruckLarge, seed_classTruckLargeExtended, seed_classTruckRegular4w, seed_classTruckRegular6w, seed_classTruckSmall } from './cargo-type-class-seeds'
import { seed_atvFootprint, seed_bicycleFootprint, seed_carLargeFootprint, seed_carMediumFootprint, seed_carrierFootprint, seed_carSmallFootprint, seed_motorcycleFootprint, seed_truckFootprint } from './cargo-type-footprint-seeds'
import { seed_active, seed_createdAt } from './index-seeds'

let cargoIndex = 0
let cargoMaxIndex = 9999
const createdAt = seed_createdAt
const active = seed_active

const xsCargoTypes: CargoType[] = [
  {
    id: 'ct-bicycle',
    footprint: seed_bicycleFootprint,
    name: 'Bicycle',
    index: cargoIndex++,
    description: 'BMX/Mountain Bike',
    category: seed_bicycleCategory,
    class: seed_classBicycle,
    active,
    createdAt
  },
  {
    id: 'ct-motorcycle-regular',
    footprint: seed_motorcycleFootprint,
    name: 'Motorcycle Regular',
    index: cargoIndex++,
    description: 'Motorcycle Regular',
    category: seed_motorcycleCategory,
    class: seed_classMotorCycleRegular,
    active,
    createdAt
  },
  {
    id: 'ct-motorcycle-big-motor-bike',
    footprint: seed_motorcycleFootprint,
    name: 'Big Motorcycle',
    index: cargoIndex++,
    description: 'Big Motorcycle',
    category: seed_motorcycleCategory,
    class: seed_classMotorCycleBig,
    createdAt,
    active
  },
  {
    id: 'ct-atv',
    footprint: seed_atvFootprint,
    name: 'ATV ',
    index: cargoIndex++,
    description: 'ATV',
    category: seed_atvCategory,
    active,
    class: seed_classATV,
    createdAt
  },
  {
    id: 'ct-pedicab-110cc-below',
    footprint: seed_carrierFootprint,
    name: 'Pedicab 110cc & Below',
    index: cargoIndex++,
    description: 'Pedicab 110cc & Below',
    category: seed_pedicabCategory,
    class: seed_classTricycle,
    active,
    createdAt
  },
  {
    id: 'ct-pedicab-110cc-above',
    footprint: seed_carrierFootprint,
    name: 'Pedicab 110cc & Above',
    index: cargoIndex++,
    description: 'Pedicab 110cc & Above',
    category: seed_pedicabCategory,
    class: seed_classTricycle,
    active,
    createdAt
  },
  {
    id: 'ct-chariot-110cc-below',
    footprint: seed_carrierFootprint,
    name: 'Chariot 110cc & Below',
    index: cargoIndex++,
    description: 'Chariot 110cc & Below',
    category: seed_chariotCategory,
    class: seed_classChariot,
    active,
    createdAt
  },
  {
    id: 'ct-chariot-110cc-above',
    footprint: seed_carrierFootprint,
    name: 'Chariot 110cc & Above',
    index: cargoIndex++,
    description: 'Chariot 110cc & Above',
    category: seed_chariotCategory,
    class: seed_classChariot,
    active,
    createdAt
  }
]

const unListedCargoTypes: CargoType[] = [
  {
    id: 'ct-small-car-unspecified',
    footprint: seed_carSmallFootprint,
    name: 'Unlisted? (Small Car)',
    index: cargoMaxIndex--,
    description: 'Unlisted Small Car',
    category: seed_smallCarCategory,
    class: seed_classCarSmall,
    active,
    createdAt
  },
  {
    id: 'ct-medium-car-unspecified',
    footprint: seed_carMediumFootprint,
    name: 'Unlisted? (Medium Car)',
    index: cargoMaxIndex--,
    class: seed_classCarMedium,
    description: 'Unlisted Medium Car',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-large-car-unspecified',
    footprint: seed_carLargeFootprint,
    name: 'Unlisted? (Large Car)',
    index: cargoMaxIndex--,
    class: seed_classCarLarge,
    description: 'Unlisted Large Car',
    category: seed_largeCarCategory,
    createdAt,
    active
  },

  {
    id: 'ct-truck-small-unspecified',
    footprint: seed_carSmallFootprint,
    name: 'Unlisted? (Truck Small 4w)',
    index: cargoMaxIndex--,
    description: 'Unlisted Truck Small (4w)',
    category: seed_truckCategory,
    class: seed_classTruckRegular4w,
    active,
    createdAt
  },
  {
    id: 'ct-truck-medium-unspecified',
    footprint: seed_carMediumFootprint,
    name: 'Unlisted? (Truck Medium 6w)',
    index: cargoMaxIndex--,
    class: seed_classTruckRegular6w,
    description: 'Unlisted Truck Medium (6w)',
    category: seed_truckCategory,
    createdAt,
    active
  },
  {
    id: 'ct-truck-large-unspecified',
    footprint: seed_carLargeFootprint,
    name: 'Unlisted? (Truck Large)',
    index: cargoMaxIndex--,
    class: seed_classTruckLargeExtended,
    description: 'Unlisted Truck Large',
    category: seed_truckCategory,
    createdAt,
    active
  },
  {
    id: 'ct-truck-large-ext-unspecified',
    footprint: seed_carLargeFootprint,
    name: 'Unlisted? (Truck Large Extended)',
    index: cargoMaxIndex--,
    class: seed_classTruckLargeExtended,
    description: 'Unlisted Truck Large (Extended)',
    category: seed_truckCategory,
    createdAt,
    active
  }
]

const smallCarTypes: CargoType[] = [
  {
    id: 'ct-ford-eco-sport',
    footprint: seed_carSmallFootprint,
    name: 'Eco Sport',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Ford Eco Sport',
    category: seed_smallCarCategory,
    createdAt,
    active
  },

  {
    id: 'ct-geely-gx3-pro',
    footprint: seed_carSmallFootprint,
    name: 'GX3 Pro',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Geely GX3 Pro',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  // add the mazda cx-30
  {
    id: 'ct-mazda-cx-30',
    footprint: seed_carSmallFootprint,
    name: 'CX-30',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Mazda CX-30',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  // add the mazda cx-3
  {
    id: 'ct-mazda-cx-3',
    footprint: seed_carSmallFootprint,
    name: 'CX-3',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Mazda CX-3',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-stonic',
    footprint: seed_carSmallFootprint,
    name: 'Stonic',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Kia Stonic',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  // add kona
  {
    id: 'ct-hyundai-kona',
    footprint: seed_carSmallFootprint,
    name: 'Kona',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Hyundai Kona',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-raize',
    footprint: seed_carSmallFootprint,
    name: 'Raize',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Toyota Raize',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-hyundai-neon',
    footprint: seed_carSmallFootprint,
    name: 'Eon',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Hyundai Eon',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-hyundai-reina',
    footprint: seed_carSmallFootprint,
    name: 'Reina',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Hyundai Reina',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-picanto',
    footprint: seed_carSmallFootprint,
    name: 'Picanto',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Kia Picanto',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-soul',
    footprint: seed_carSmallFootprint,
    name: 'Soul',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Kia Soul',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-jimny',
    footprint: seed_carSmallFootprint,
    name: 'Jimny',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Suzuki Jimny',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-alto',
    footprint: seed_carSmallFootprint,
    name: 'Alto',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Suzuki Alto',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-ciaz',
    footprint: seed_carSmallFootprint,
    name: 'Ciaz',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Suzuki Ciaz',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-dzire',
    footprint: seed_carSmallFootprint,
    name: 'Dzire',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Suzuki Dzire',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-s-presso',
    footprint: seed_carSmallFootprint,
    name: 'S-Presso',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Suzuki S-Presso',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-swift',
    footprint: seed_carSmallFootprint,
    name: 'Swift',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Suzuki Swift',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-vitara-3-doors',
    footprint: seed_carSmallFootprint,
    name: 'Vitara (3 Doors)',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Suzuki Vitara (3 Doors)',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-cube',
    footprint: seed_carSmallFootprint,
    name: 'Cube',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Nissan Cube',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-almera',
    footprint: seed_carSmallFootprint,
    name: 'Almera',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Nissan Almera',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-juke',
    footprint: seed_carSmallFootprint,
    name: 'Juke',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Nissan Juke',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-vios',
    footprint: seed_carSmallFootprint,
    name: 'Vios',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Toyota Vios',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-wigo',
    footprint: seed_carSmallFootprint,
    name: 'Wigo',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Toyota Wigo',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-pajero-3-doors',
    footprint: seed_carSmallFootprint,
    name: 'Pajero (3 Doors)',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Mitsubishi Pajero (3 Doors)',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-mirage',
    footprint: seed_carSmallFootprint,
    name: 'Mirage',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Mitsubishi Mirage',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-honda-hrv',
    footprint: seed_carSmallFootprint,
    name: 'HR-V',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Honda HR-V',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-sports-car-01',
    footprint: seed_carSmallFootprint,
    name: 'Sports Car',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'General Sports Cars',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-subaru-wrx',
    footprint: seed_carSmallFootprint,
    name: 'WRX',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Subaru WRX',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-lancer',
    footprint: seed_carSmallFootprint,
    name: 'Lancer',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Mitsubishi Lancer',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-honda-civic',
    footprint: seed_carSmallFootprint,
    name: 'Civic',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Honda Civic',
    category: seed_smallCarCategory,
    createdAt,
    active
  },

  {
    id: 'ct-gac-gs3-emzoom',
    footprint: seed_carSmallFootprint,
    name: 'GS3 Emzoom',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'GAC GS3 Emzoom',
    category: seed_smallCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-seltos',
    footprint: seed_carSmallFootprint,
    name: 'Seltos',
    index: cargoIndex++,
    class: seed_classCarSmall,
    description: 'Kia Seltos',
    category: seed_smallCarCategory,
    createdAt,
    active
  }

]

const mediumCarTypes: CargoType[] = [
  {
    id: 'ct-isuzu-crosswind',
    footprint: seed_carMediumFootprint,
    name: 'Crosswind',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Isuzu Crosswind',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  // add t-cross
  {
    id: 'ct-volkswagen-t-cross',
    footprint: seed_carMediumFootprint,
    name: 'T-Cross',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Volkswagen T-Cross',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-livina',
    footprint: seed_carMediumFootprint,
    name: 'Livina',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Nissan Livina',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  // Zenix
  {
    id: 'ct-toyota-zenix',
    footprint: seed_carMediumFootprint,
    name: 'Zenix',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Zenix',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  {
    id: 'ct-isuzu-adventure',
    footprint: seed_carMediumFootprint,
    name: 'Adventure',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Isuzu Adventure',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-trooper',
    footprint: seed_carMediumFootprint,
    name: 'Trooper',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Isuzu Trooper',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-mux',
    footprint: seed_carMediumFootprint,
    name: 'Mux',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Isuzu Mux',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-alterra',
    footprint: seed_carMediumFootprint,
    name: 'Alterra',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Isuzu Alterra',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-fortuner',
    footprint: seed_carMediumFootprint,
    name: 'Fortuner',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Fortuner',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-rush',
    footprint: seed_carMediumFootprint,
    name: 'Rush',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Rush',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-avanza',
    footprint: seed_carMediumFootprint,
    name: 'Avanza',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Avanza',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-sportivo',
    footprint: seed_carMediumFootprint,
    name: 'Sportivo',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Sportivo',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-highlander',
    footprint: seed_carMediumFootprint,
    name: 'Highlander',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Highlander',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-fj-cruiser',
    footprint: seed_carMediumFootprint,
    name: 'Fj Cruiser',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Fj Cruiser ',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-lite-ace',
    footprint: seed_carMediumFootprint,
    name: 'Lite Ace',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Lite Ace',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-town-ace',
    footprint: seed_carMediumFootprint,
    name: 'Town Ace',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Town Ace',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-rav-4',
    footprint: seed_carMediumFootprint,
    name: 'RAV 4',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota RAV 4',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-innova',
    footprint: seed_carMediumFootprint,
    name: 'Innova',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Innova',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-veloz',
    footprint: seed_carMediumFootprint,
    name: 'Veloz',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Veloz',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-revo',
    footprint: seed_carMediumFootprint,
    name: 'Revo',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Revo',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-hyundai-tucson',
    footprint: seed_carMediumFootprint,
    name: 'Tucson',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Hyundai Tucson',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-hyundai-santa-fe',
    footprint: seed_carMediumFootprint,
    name: 'Santa Fe',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Hyundai Santa Fe',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-ertiga',
    footprint: seed_carMediumFootprint,
    name: 'Ertiga',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Suzuki Ertiga',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-carry',
    footprint: seed_carMediumFootprint,
    name: 'Carry',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Suzuki Carry',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-apv',
    footprint: seed_carMediumFootprint,
    name: 'APV',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Suzuki APV',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-suzuki-vitara-4-doors',
    footprint: seed_carMediumFootprint,
    name: 'Vitara (4 Doors)',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Suzuki Vitara (4 Doors)',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-honda-b-rv',
    footprint: seed_carMediumFootprint,
    name: 'B-RV',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Honda B-RV',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-honda-c-rv',
    footprint: seed_carMediumFootprint,
    name: 'C-RV',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Honda C-RV',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-honda-mobilio',
    footprint: seed_carMediumFootprint,
    name: 'Mobilio',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Honda Mobilio',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-honda-odyssey',
    footprint: seed_carMediumFootprint,
    name: 'Odyssey',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Honda Odyssey',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-montero',
    footprint: seed_carMediumFootprint,
    name: 'Montero',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Mitsubishi Montero',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-xpander',
    footprint: seed_carMediumFootprint,
    name: 'Xpander',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Mitsubishi Xpander',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-outlander',
    footprint: seed_carMediumFootprint,
    name: 'Outlander',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Mitsubishi Outlander',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-pajero-5-doors',
    footprint: seed_carMediumFootprint,
    name: 'Pajero (5 doors)',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Mitsubishi Pajero (5 doors)',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-x-trail',
    footprint: seed_carMediumFootprint,
    name: 'X Trail',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Nissan X Trail',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-pathfinder',
    footprint: seed_carMediumFootprint,
    name: 'Pathfinder',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Nissan Pathfinder',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-terra',
    footprint: seed_carMediumFootprint,
    name: 'Terra',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Nissan Terra',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-kicks',
    footprint: seed_carMediumFootprint,
    name: 'Kicks',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Nissan Kicks',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-sportage',
    footprint: seed_carMediumFootprint,
    name: 'Sportage',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Kia Sportage',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-sorento',
    footprint: seed_carMediumFootprint,
    name: 'Sorento',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Kia Sorento',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-carnival',
    footprint: seed_carMediumFootprint,
    name: 'Carnival',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Kia Carnival',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-ford-escape',
    footprint: seed_carMediumFootprint,
    name: 'Escape',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Ford Escape',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-ford-explorer',
    footprint: seed_carMediumFootprint,
    name: 'Explorer',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Ford Explorer',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-ford-everest',
    footprint: seed_carMediumFootprint,
    name: 'Everest',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Ford Everest',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-chevrolet-trailblazer',
    footprint: seed_carMediumFootprint,
    name: 'Trailblazer',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Chevrolet Trailblazer',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-geely-coolray',
    footprint: seed_carMediumFootprint,
    name: 'Coolray',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Geely Coolray',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-ssangyong-rexton',
    footprint: seed_carMediumFootprint,
    name: 'Rexton',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Ssangyong Rexton',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-ssangyong-korando',
    footprint: seed_carMediumFootprint,
    name: 'Korando',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Ssangyong Korando',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mg-zs',
    footprint: seed_carMediumFootprint,
    name: 'ZS',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'MG ZS',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-subaru-forester',
    footprint: seed_carMediumFootprint,
    name: 'Forester',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Subaru Forester',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mazda-cx-5',
    footprint: seed_carMediumFootprint,
    name: 'CX-5',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Mazda CX-5',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-ford-territory',
    footprint: seed_carMediumFootprint,
    name: 'Territory',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Ford Territory',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-cherry-tiggo',
    footprint: seed_carMediumFootprint,
    name: 'Tiggo',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Cherry Tiggo',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  {
    id: 'ct-hyundai-stargazer',
    footprint: seed_carMediumFootprint,
    name: 'Stargazer',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Hyundai Stargazer',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  // Toyota Yaris Cross
  {
    id: 'ct-toyota-yaris-cross',
    footprint: seed_carMediumFootprint,
    name: 'Yaris Cross',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Yaris Cross',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  // Toyota Corolla Cross
  {
    id: 'ct-toyota-corolla-cross',
    footprint: seed_carMediumFootprint,
    name: 'Corolla Cross',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Toyota Corolla Cross',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  // Hyundai Custin

  {
    id: 'ct-hyundai-custin',
    footprint: seed_carMediumFootprint,
    name: 'Custin',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Hyundai Custin',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  // add peugeot 2008 SUV to medium? car types
  {
    id: 'ct-peugeot-2008-suv',
    footprint: seed_carMediumFootprint,
    name: 'Peugeot 2008',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Peugeot 2008 SUV',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  // add peugeot 3008 SUV to medium? car types
  {
    id: 'ct-peugeot-3008-suv',
    footprint: seed_carMediumFootprint,
    name: 'Peugeot 3008',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Peugeot 3008 SUV',
    category: seed_mediumCarCategory,
    createdAt,
    active
  },

  // add peugeot 5008 SUV to medium? car types

  {
    id: 'ct-peugeot-5008-suv',
    footprint: seed_carMediumFootprint,
    name: 'Peugeot 5008',
    index: cargoIndex++,
    class: seed_classCarMedium,
    description: 'Peugeot 5008 SUV',
    category: seed_mediumCarCategory,
    createdAt,
    active
  }

]

const largeCarTypes: CargoType[] = [
  {
    id: 'ct-toyota-grandia',
    footprint: seed_carLargeFootprint,
    name: 'Grandia',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Toyota Grandia',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  //  Navara
  {
    id: 'ct-nissan-navara',
    footprint: seed_carLargeFootprint,
    name: 'Navara',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Nissan Navara',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-hiace',
    footprint: seed_carLargeFootprint,
    name: 'HiAce',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Toyota HiAce',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-pick-up',
    footprint: seed_carLargeFootprint,
    name: 'Pick Up',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Toyota Pick Up',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-prado',
    footprint: seed_carLargeFootprint,
    name: 'Prado',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Toyota Prado',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-toyota-land-cruiser',
    footprint: seed_carLargeFootprint,
    name: 'Land Cruiser',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Toyota Land Cruiser',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-urvan',
    footprint: seed_carLargeFootprint,
    name: 'Urvan',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Nissan Urvan',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-nissan-patrol',
    footprint: seed_carLargeFootprint,
    name: 'Patrol',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Nissan Patrol',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-l300',
    footprint: seed_carLargeFootprint,
    name: 'L300',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Mitsubishi L300',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-l200',
    footprint: seed_carLargeFootprint,
    name: 'L200',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Mitsubishi L200',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-hyundai-h100',
    footprint: seed_carLargeFootprint,
    name: 'H100',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Hyundai H100',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-hyundai-starex',
    footprint: seed_carLargeFootprint,
    name: 'Starex',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Hyundai Starex',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-hyundai-staria',
    footprint: seed_carLargeFootprint,
    name: 'Staria',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Hyundai Staria',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-chevrolet-suburban',
    footprint: seed_carLargeFootprint,
    name: 'Suburban',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Chevrolet Suburban',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-ford-expedition',
    footprint: seed_carLargeFootprint,
    name: 'Expedition',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Ford Expedition',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-m-cab-extended',
    footprint: seed_carLargeFootprint,
    name: 'Multicab Extended',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Isuzu Multicab Extended',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-terracab',
    footprint: seed_carLargeFootprint,
    name: 'Terracab',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Isuzu Terracab',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-traviz',
    footprint: seed_carLargeFootprint,
    name: 'Traviz',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Isuzu Traviz',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-foton-f-van',
    footprint: seed_carLargeFootprint,
    name: 'Foton F-Van',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Foton F-Van Foton',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-k2500',
    footprint: seed_carLargeFootprint,
    name: 'K2500',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Kia K2500',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-kia-k2700',
    footprint: seed_carLargeFootprint,
    name: 'K2700',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Kia K2700',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  {
    id: 'ct-jeep-wrangler',
    footprint: seed_carLargeFootprint,
    name: 'Wrangler',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Jeep Wrangler',
    category: seed_largeCarCategory,
    createdAt,
    active
  },

  {
    id: 'ct-isuzu-d-max',
    footprint: seed_carLargeFootprint,
    name: 'D-Max',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Isuzu D-Max',
    category: seed_largeCarCategory,
    createdAt,
    active
  },
  // staria
  {
    id: 'ct-hyundai-staria',
    footprint: seed_carLargeFootprint,
    name: 'Staria',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Hyundai Staria',
    category: seed_largeCarCategory,
    createdAt,
    active
  },

  // peugeot-traveller
  {
    id: 'ct-peugeot-traveller',
    footprint: seed_carLargeFootprint,
    name: 'Traveller',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Peugeot Traveller',
    category: seed_largeCarCategory,
    createdAt,
    active
  },

  {
    id: 'ct-ford-ranger',
    footprint: seed_carLargeFootprint,
    name: 'Ranger',
    index: cargoIndex++,
    class: seed_classCarLarge,
    description: 'Ford Ranger',
    category: seed_largeCarCategory,
    createdAt,
    active
  }
]

const truckCargoTypes: CargoType[] = [
  {
    id: 'ct-mazda-bongo-regular',
    footprint: seed_truckFootprint,
    name: 'Bongo',
    index: cargoIndex++,
    class: seed_classTruckSmall,
    description: 'Bongo Regular',
    category: seed_truckCategory,
    createdAt,
    active
  },
  // {
  //   id: 'ct-mazda-bongo-6w',
  //   footprint: seed_truckFootprint,
  //   name: 'Bongo Regular (6w)',
  //   index: cargoIndex++,
  //   class: seed_truckCategory,
  //   description: 'Mazda Bongo Regular (6w)',
  //   category: seed_truckCategory,
  //   createdAt,
  //   active,
  // },
  {
    id: 'ct-isuzu-elf-4w',
    footprint: seed_truckFootprint,
    name: 'Isuzu Elf (4W)',
    index: cargoIndex++,
    class: seed_classTruckRegular4w,
    description: 'Isuzu Elf (4W)',
    category: seed_truckCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-elf-6w',
    footprint: seed_truckFootprint,
    name: 'Isuzu Elf (6W)',
    index: cargoIndex++,
    class: seed_classTruckRegular6w,
    description: 'Isuzu Elf (4W)',
    category: seed_truckCategory,
    createdAt,
    active
  },

  {
    id: 'ct-mitsubishi-fuso-canter-4w',
    footprint: seed_truckFootprint,
    name: 'Canter (4W)',
    index: cargoIndex++,
    class: seed_classTruckRegular4w,
    description: 'Mitsubishi Fuso Canter (4W)',
    category: seed_truckCategory,
    createdAt,
    active
  },
  {
    id: 'ct-mitsubishi-fuso-canter-6w',
    footprint: seed_truckFootprint,
    name: 'Canter (6W)',
    index: cargoIndex++,
    class: seed_classTruckRegular6w,
    description: 'Mitsubishi Fuso Canter (4W)',
    category: seed_truckCategory,
    createdAt,
    active
  },

  {
    id: 'ct-mitsubishi-fuso-canter-6w',
    footprint: seed_truckFootprint,
    name: 'Canter (6W)',
    index: cargoIndex++,
    class: seed_classTruckRegular6w,
    description: 'Mitsubishi Fuso Canter (4W)',
    category: seed_truckCategory,
    createdAt,
    active
  },

  // {
  //   id: 'ct-bongo-extended',
  //   footprint: seed_carXLFootprint,
  //   name: 'Bongo Extended',
  //   index: cargoIndex++,
  //   class: seed_classCar2XL1370,
  //   description: 'Bongo Extended',
  //   category: seed_truckCategory,
  //   createdAt,
  //   active,
  // },
  // {
  //   id: 'ct-elf-6w',
  //   footprint: seed_carXLFootprint,
  //   name: 'Elf 6W',
  //   index: cargoIndex++,
  //   class: seed_classCar2XL1550,
  //   description: 'Elf 6W',
  //   category: seed_truckCategory,
  //   createdAt,
  //   active,
  // },
  // {
  //   id: 'ct-canter-6w',
  //   footprint: seed_carXLFootprint,
  //   name: 'Canter 6W',
  //   index: cargoIndex++,
  //   class: seed_classCar2XL1550,
  //   description: 'Canter 6W',
  //   category: seed_truckCategory,
  //   createdAt,
  //   active,
  // },
  {
    id: 'ct-mitsubishi-fuso-fighter',
    footprint: seed_truckFootprint,
    name: 'Fuso Fighter',
    index: cargoIndex++,
    class: seed_classTruckLarge,
    description: 'Mitsubishi Fuso Fighter',
    category: seed_truckCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-forward',
    footprint: seed_truckFootprint,
    name: 'Isuzu Forward',
    index: cargoIndex++,
    class: seed_classTruckLarge,
    description: 'Isuzu Forward',
    category: seed_truckCategory,
    createdAt,
    active
  },

  {
    id: 'ct-mitsubishi-fuso-fighter-ext',
    footprint: seed_truckFootprint,
    name: 'Fuso Fighter (Extended)',
    index: cargoIndex++,
    class: seed_classTruckLargeExtended,
    description: 'Mitsubishi Fuso Fighter (Extended)',
    category: seed_truckCategory,
    createdAt,
    active
  },
  {
    id: 'ct-isuzu-forward-ext',
    footprint: seed_truckFootprint,
    name: 'Isuzu Forward (Extended)',
    index: cargoIndex++,
    class: seed_classTruckLargeExtended,
    description: 'Isuzu Forward (Extended)',
    category: seed_truckCategory,
    createdAt,
    active
  }
  // {
  //   id: 'ct-isuzu-forward-extended',
  //   footprint: seed_carXLFootprint,
  //   name: 'Isuzu Forward Extended',
  //   index: cargoIndex++,
  //   class: seed_classCar2XL2210,
  //   description: 'Isuzu Forward Extended',
  //   category: seed_truckCategory,
  //   createdAt,
  //   active,
  // },
]

export const seed_cargoTypes: CargoType[] = [
  ...xsCargoTypes,
  ...unListedCargoTypes,
  ...smallCarTypes,
  ...mediumCarTypes,
  ...largeCarTypes,
  ...truckCargoTypes
]

// add staria to large car types
// add peugeot traveller to large car types

// add peugeot 2008 SUV to medium? car types
// add peugeot 3008 SUV to medium? car types
// add peugeot 5008 SUV to medium? car types
