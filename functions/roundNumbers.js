module.exports = (client) => {
    client.roundNumbers = async (number, decimals = 2) => {
        const offset = Number(`1e${decimals}`);
        return Math.round(number * offset) / offset;
    };
}