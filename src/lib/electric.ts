import {makeElectricContext} from 'electric-sql/react'

import {Electric} from '../generated/client'

const electricContext = makeElectricContext<Electric>()
const Provider = electricContext.ElectricProvider
const {useElectric} = electricContext

export {Provider, useElectric}