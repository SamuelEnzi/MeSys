import {Item, Fluid, Energy} from './sqlize.js';

export default class Data {
    static async insertItems(data) {
        for (var i = 0; i < data.length; i++){
            await Item.create({
                name: data[i].name,
                label: data[i].label,
                amount: data[i].size || 0,  // Assuming `size` maps to `amount` in your table
                data: JSON.stringify(data[i]),
            });
        }
    }

    static async insertFluid(data) {
        for (var i = 0; i < data.length; i++){
            await Fluid.create({
                name: data[i].name,
                label: data[i].label,
                amount: data[i].amount || 0,  // Assuming `size` maps to `amount` in your table
                data: JSON.stringify(data[i]),
            });
        }
    }

    static async insertEnergy(data) {
        await Energy.create({
            powerInjection : data.powerInjection || 0,
            powerUsage: data.powerUsage || 0,
            idlePowerUsage: data.idlePowerUsage || 0,  
            maxStoredPower: data.maxStoredPower || 0,  
            storedPower: data.storedPower || 0,  
            data: JSON.stringify(data),
        });
    }
}