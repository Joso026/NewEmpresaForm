// src/hooks/useCep.js
import { useState } from 'react';
import { validaCep } from './Validacoes';

const useCep = (setFormData) => {
    const [erroCep, setErroCep] = useState('');

    // Função para buscar informações de endereço a partir do CEP.
    const getCepInformations = async (cepValue, section = 'Empresa', key) => {
        const erro = validaCep(cepValue);
        if (erro) {
            setErroCep(erro);
            return;
        } 
        else {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
            const data = await response.json();
            if (data.erro) {
                setErroCep("CEP Inválido");
                return;
            }
            
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    // ...prevState['Empresa'],
                    ...prevState[section],
                    ['logradouroEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')]: { ...prevState[section]['logradouroEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')], value: data.logradouro },
                    ['bairroEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')]: { ...prevState[section]['bairroEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')], value: data.bairro },
                    ['cidadeEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')]: { ...prevState[section]['cidadeEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')], value: data.localidade },
                    ['estadoEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')]: { ...prevState[section]['estadoEmpresa' + (section.startsWith('Socio') ? key.slice(-1) : '')], value: data.uf },            
                }
            }));
            setErroCep('');
        } catch (error) {
            console.error('Erro ao buscar informações do CEP:', error);
            setErroCep("Erro ao buscar CEP");
        }
    }};

    return { getCepInformations, erroCep };
};

export default useCep;
