
export default class Parser {
    static parseData(d) {

        var first = Object.keys(d)[0];
        
        var values = d[first];

        const chuncks = values.split(",");

        chuncks[0] = `${first}=${chuncks[0]}`;

        const obj = chuncks.reduce((accumulator, currentValue) => {
            const [key, value] = currentValue.split('=');
            accumulator[key] = isNaN(value) ? (value === 'true' ? true : (value === 'false' ? false : value)) : Number(value);
            return accumulator;
        }, {});

        return obj;
    }
}