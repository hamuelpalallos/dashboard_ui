import './index-seeds'
import * as port from './port-seeds'
import * as passenger_type_class from './passenger-type-class-seeds'
import * as passenger_type from './passenger-type-seeds'
import * as route from './route-seeds'
import * as conveyance from './conveyances-seeds'

export const ocean_jet = {
  port,
  passenger_type_class,
  passenger_type,
  route,
  conveyance
}
