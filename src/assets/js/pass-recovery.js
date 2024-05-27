authenticatedUser = JSON.parse(sessionStorage.getItem('authenticatedUser') || '[]');
if (authenticatedUser.length != 0) {
    redirectToIndex();
}

const formSection = document.querySelector('.mensagem');
const loginButton = document.getElementById('BtnEntrar');
const emailInput = document.getElementById('email_user');

function createAlertMessage(alertType, message) {
    return `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            <strong></strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}

function redirectToIndex(message) {
    const successMessage = createAlertMessage('success', message);
    formSection.insertAdjacentHTML('afterbegin', successMessage);
}


loginButton.addEventListener('click', function(element) {
    element.preventDefault();

    const existingAlert = formSection.querySelector('.alert');
    if (existingAlert) {
        formSection.removeChild(existingAlert);
    }

    const email = emailInput.value.trim();

    if (!email) {
        const alertMessage = createAlertMessage('warning', 'O campo de e-mail não pode ser vazio.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        return;
    }

    let userInfo = JSON.parse(localStorage.getItem(email));

    if (userInfo) {
        const alertMessage = createAlertMessage('success', 'Senha enviada ao e-mail cadastrado.');
        
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        return;
    }

    const alertMessage = createAlertMessage('danger', 'E-mail não encontrado. Cadastre uma conta.');
    formSection.insertAdjacentHTML('afterbegin', alertMessage);
});
