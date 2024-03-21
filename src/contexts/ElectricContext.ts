import {makeElectricContext} from 'electric-sql/react'
import {Electric} from '../generated/client'

const ElectricContext = makeElectricContext<Electric>()
const useElectric = ElectricContext.useElectric

export default ElectricContext
export {useElectric}