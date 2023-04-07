module.exports = (client) => {
    client.getDuration = (duration) => {
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);

        return `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    };
}