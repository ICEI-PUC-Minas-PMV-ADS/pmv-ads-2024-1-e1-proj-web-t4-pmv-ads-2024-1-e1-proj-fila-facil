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

    function displayModalAlert(alertType, message) {
        const modalAlerts = document.getElementById('modalAlerts');
        const alertMessage = createAlertMessage(alertType, message);
        modalAlerts.innerHTML = alertMessage;
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
            const newPasswordModal = new bootstrap.Modal(document.getElementById('newPasswordModal'));
            newPasswordModal.show();

            const newPasswordInput = document.getElementById('newPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');

            document.getElementById('saveNewPassword').addEventListener('click', function() {
                const newPassword = newPasswordInput.value.trim();
                const confirmPassword = confirmPasswordInput.value.trim();

                if (newPassword.length < 6) {
                    displayModalAlert('danger', 'A senha deve ter no mínimo 6 caracteres.');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    displayModalAlert('danger', 'As senhas não coincidem. Tente novamente.');
                    return;
                }

                if (newPassword === userInfo.password) {
                    displayModalAlert('danger', 'A nova senha não pode ser igual à senha anterior.');
                    return;
                }

                // Atualizamos a senha no localStorage
                userInfo.password = newPassword;
                localStorage.setItem(email, JSON.stringify(userInfo));

                displayModalAlert('success', 'Senha atualizada com sucesso.');

                newPasswordModal.hide();
                const alertMessage = createAlertMessage('success', 'Senha atualizada com sucesso.');
                formSection.insertAdjacentHTML('afterbegin', alertMessage);
                return;

            });

            return;
        }

        const alertMessage = createAlertMessage('danger', 'E-mail não encontrado. Cadastre uma conta.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        return;
    });