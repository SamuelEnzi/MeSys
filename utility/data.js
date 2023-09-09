import Item from './sqlize.js';

export default class Data {
    static async insertData(data) {
        for (var i = 0; i < data.length; i++){
            await Item.create({
                name: data[i].name,
                label: data[i].label,
                amount: data[i].size || 0,  // Assuming `size` maps to `amount` in your table
                data: JSON.stringify(data[i]),
            });
        }
    }
}