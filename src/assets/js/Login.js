var usuario1 , usuario2 , usuario3;
var senha1 , senha2 , senha3;


usuario1 = "admin1@gmail.com";
senha1   = "adm1pass";
username1 = "admin1";

usuario2 = "admin2@gmail.com";
senha2   = "adm2pass";
username2 = "admin2";

usuario3 = "admin3@gmail.com";
senha3   = "adm3pass";
username3 = "admin3";

document.getElementById('BtnEntrar').addEventListener(
'click', function() 
{
    var emailuser = document.getElementById('email_user').value;
    var senhauser = document.getElementById('senha_user').value;

    if (emailuser.trim() === '') 
    {
        alert('É necessário preencher o campo de email.');
        return;
    }
    else if (senhauser.trim() === '') 
    {
        alert('É necessário preencher o campo de senha.');
        return;
    }
    else if (emailuser.trim() === '' || senhauser.trim() === '')
    {
        alert('É necessário preencher os campos de email e senha.');
        return;
    }


    if (emailuser === usuario1 && senhauser === senha1) 
    {
        alert('Bem-vindo ' + username1);
        //window.location.href = '../../pages/cardapio.html';
    } 
    else if (emailuser === usuario2 && senhauser === senha2)
    {
        alert('Bem-vindo ' + username2);
    }
    else if (emailuser === usuario3 && senhauser === senha3)
    {
        alert('Bem-vindo ' + username3);
    }
    else
    {
        alert('Credenciais inválidas. Por favor, tente novamente.');
    }
});
