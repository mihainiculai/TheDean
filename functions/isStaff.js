const { PermissionsBitField } = require('discord.js');
module.exports = (client) => {
    client.isStaff = (member) => {
        isAdmin = member.permissions.has(PermissionsBitField.Flags.Administrator);
        isStaff = member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Moderator');
        return isAdmin || isStaff;
    }
}
