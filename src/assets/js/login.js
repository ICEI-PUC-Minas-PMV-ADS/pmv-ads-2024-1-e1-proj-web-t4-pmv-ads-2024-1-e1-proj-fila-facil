const authenticatedUser = JSON.parse(sessionStorage.getItem('authenticatedUser') || '[]');
if (authenticatedUser.length !== 0) {
    redirectToIndex();
}

const formSection = document.querySelector('.mensagem');
const loginButton = document.getElementById('BtnEntrar');
const emailInput = document.getElementById('email_user');
const passwordInput = document.getElementById('senha_user');

function createAlertMessage(alertType, message) {
    return `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            <strong>Erro!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}


function redirectToIndex() {
    window.location.href = '../index.html';
}


function redirectToRestaurantes() {
    window.location.href = 'restaurantes.html';
}

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const existingAlert = formSection.querySelector('.alert');
    if (existingAlert) {
        formSection.removeChild(existingAlert);
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        const alertMessage = createAlertMessage('warning', 'Os campos de email e senha não podem ser vazios.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        return;
    }

    if (email === 'admin' && password === 'adm123') {
        const userInfo = { email: 'admin', password: 'adm123' };
        sessionStorage.setItem('authenticatedUser', JSON.stringify(userInfo));
        redirectToRestaurantes();
    } else {
        const alertMessage = createAlertMessage('danger', 'Usuário ou senha inválido. Tente novamente.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
    }
});
