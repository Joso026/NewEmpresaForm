const validaCep = (cep) => {
    // Realize as validações do campo CEP aqui
    // Exemplo: verificar se o CEP possui 8 dígitos, se é um número válido, etc.
    if (cep.length !== 8) {
        return "Formato de CEP inválido"
    }
    // Se todas as validações passarem, retorne null
    return null;
}

// Exporte as validações
export { validaCep };