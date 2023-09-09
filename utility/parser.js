
export default class Parser {
    static parseData(d) {
        return d.split(';').map(itemStr => {
            const item = {};
            itemStr.split(',').forEach(pair => {
                const [key, value] = pair.split('=');
                item[key] = value;
            });
            return item;
        });
    }
}