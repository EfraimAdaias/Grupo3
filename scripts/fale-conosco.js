const camposObrigatorios = document.getElementsByClassName('input-box');
const form = document.querySelector('#formularioCadastro');
const celular = document.querySelector('#telefone');

// Ouvir o evento de submissão do formulário
form.addEventListener('submit', (event) => {
    const valido = validarFormulario();

    if (valido) {
        alert("Cadastro realizado com sucesso!")
    } else {
        event.preventDefault();
        alert("Dados inválidos. Por favor preencher os campos obrigatórios e tente novamente!");
    }
});

// Valida número de telefone.
celular.addEventListener('beforeinput', (event) => {
    if (event.data && '0123456789'.indexOf(event.data) < 0) {
        event.preventDefault();
    } else if (event.data && celular.value.length > 14) {
        event.preventDefault();
    }
});

celular.addEventListener('keypress', (event) => {
    celular.value = formatarTelefone(celular.value.replace(/\D/g, ''));
});

/**
 * Formata um número de telefone
 * @param {string} texto 
 * @returns string do telefone formatado. Ex.: 84999999999 -> (84) 99999-9999.
 */
function formatarTelefone(texto) {
    if (texto.length >= 2) {
        const ddd = texto.substring(0, 2);
        const parte1 = texto.substring(2, 6);
        const parte2 = texto.substring(6,10);

        if (parte2) {
            if (texto.length < 10) {
                return `(${ddd}) ${parte1}-${parte2}`;
            } else {
                const parte1 = texto.substring(2, 7);
                const parte2 = texto.substring(7);

                return `(${ddd}) ${parte1}-${parte2}`;
            }
        } else if (parte1) {
            return `(${ddd}) ${parte1}`;
        } else {
            return `(${ddd}`;
        }
    } else if (texto.length > 0) {
        return '(' + texto;
    } else {
        return '';
    }
}

/**
 * Função que valida formulário
 * @returns retorna se o formulário está válido.
 */
function validarFormulario() {
    let formularioValido = true;

    for (const campo of camposObrigatorios) {
        const input = buscarInput(campo);
        const expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (input.type) {
            // O usuário preencheu o campo
            if (input.value) {
                campo.classList.remove('campo-vazio');
                campo.classList.remove('erro');

                // O e-mail preenchido é válido
                if (input.type === 'email') {
                    if (expEmail.test(input.value)) {
                        campo.classList.remove('campo-invalido');
                        campo.classList.remove('erro');
                    } else {
                        campo.classList.add('campo-invalido');
                        campo.classList.add('erro');
                        formularioValido = false;
                    }
                }

                // Valida o telefone 
                if (input === celular) {
                    if (input.value.length < 14) {
                        campo.classList.add('campo-invalido');
                        campo.classList.add('erro');
                        formularioValido = false;
                    } else {
                        campo.classList.remove('campo-invalido');
                        campo.classList.remove('erro');
                    }
                }

            } else if (input.type === 'checkbox') {
                // Verifica se o checkbox foi marcado
                if (input.checked) {
                    campo.classList.remove('campo-vazio');
                    campo.classList.remove('erro');
                } else {
                    campo.classList.add('campo-vazio');
                    campo.classList.add('erro');
                    formularioValido = false;
                }

            } else {
                // Campo não preenchido.
                campo.classList.add('campo-vazio');
                campo.classList.add('erro');
                formularioValido = false;
            }
        }
    }
    return formularioValido;
}

/**
 * Função que recupera o input
 * @param {HTMLDivElement} campo 
 * @returns retorna o input html que o usuário interagiu/preencheu.
 */
function buscarInput(campo) {
    return campo.querySelector('input') ||
        campo.querySelector('textarea') ||
        campo.querySelector('select');
}