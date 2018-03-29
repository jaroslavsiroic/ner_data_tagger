
function toggleNotification() {
    return {
        type: 'TOGGLE_NOTIFICATION'
    };
}

function showNotification(message, color) {
    return {
        type: 'SHOW_NOTIFICATION',
        color: color,
        message: message
    };
}

function hideNotification() {
    return {
        type: 'HIDE_NOTIFICATION'
    };
}

module.exports = {
    toggleNotification,
    showNotification,
    hideNotification
}