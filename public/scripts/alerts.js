function showAlert(type, message) {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'alert-center');
    alertElement.setAttribute('role', 'alert');
    alertElement.innerHTML = `
        <strong>${message}</strong>
        
    `;

    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.appendChild(alertElement);

    setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => {
            alertElement.remove();
        }, 1000);
    }, 5000);
}
