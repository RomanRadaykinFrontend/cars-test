import {CarLibraryItem, ValueType} from "../types/cars";

const getCorrectYear = (date: string | undefined) => {
    if(date){
        const correctDate = new Date(date)
        const day = correctDate.getDay();
        const month = correctDate.getMonth() + 1
        const year = correctDate.getFullYear()
        const hours = correctDate.getHours()
        const minutes = correctDate.getMinutes()
        const correctFormat = (num: number) => {
            return num < 10 ? `0${num}` : num
        }
        return `${correctFormat(day) }.${correctFormat(month)}.${correctFormat(year)} ${correctFormat(hours)}:${correctFormat(minutes)}`
    }
    return undefined
}

export const getCorrectCarValue = (car: CarLibraryItem): ValueType[] => {
    const fieldsArray = [
        {name: 'Model', value: car.model},
        {name: 'Hash', value: car.hash},
        {name: 'Manufacturer', value: car.manufacturer},
        {name: 'Class', value: car.class},
        {name: 'Type', value: car.type},
        {name: 'Seats', value: car.seats},
        {name: 'Has auto pilot', value: car.hasAutoPilot},
        {name: 'Has auto pilot', value: car.hasAutoPilot},
        {name: 'Convertible roof', value: car.convertibleRoof},
        {name: 'Sirens', value: car.sirens},
        {name: 'FuelType', value: car.fuelType},
        {name: 'Baggage size', value: car.baggageSize},
        {name: 'Fuel level max raw', value: car.fuelLevelMaxRaw},
        {name: 'Fuel usage per KM', value: car.fuelUsagePerKM},
        {name: 'Brand id', value: car.brandId},
        {name: 'Created at', value: getCorrectYear(car.createdAt)},
        {name: 'Updated at', value: getCorrectYear(car.updatedAt)},
        {name: 'Deleted at', value: getCorrectYear(car.deletedAt)},
    ]
    return fieldsArray.filter(item => !!item.value)
}

export const getUniqueParams = (cars: CarLibraryItem[]) => {
    const allProperties: Record<string, any[]> = {}
    const keys = Object.keys(cars[0])
    keys.forEach(key => {
        allProperties[key] = []
    })
    cars.forEach((car: Record<string, any>) => {
        keys.forEach(key => allProperties[key].push(car[key]))
    })
    keys.forEach(key => {
        const isAllElementsSame = allProperties[key].every((value) => value === allProperties[key][0])
        if (isAllElementsSame) {
            delete allProperties[key]
        }
    })
    delete allProperties.images;
    const uniqueKeys = Object.keys(allProperties)
    return cars.map(car => {
        const newCar = {...car}
        for (let key in newCar) {
            const newKey = key as keyof CarLibraryItem
            if (!uniqueKeys.includes(key)) {
                delete newCar[newKey]
            }
        }
        return newCar
    })
}