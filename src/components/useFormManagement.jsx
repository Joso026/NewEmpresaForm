// src/hooks/useFormManagement.js
import { useState } from 'react';
import { transformFormData } from './formDataUtils';
import axios from 'axios';

const url = process.env.REACT_APP_ENDPOINT_URL;

const useFormManagement = () => {
  const [formData, setFormData] = useState({
    'Dados da Empresa': {
      razaoSocial: { label: 'Razão Social', gridSpan: 3 },
      razaoSocial2: { label: 'Razão Social (2º Opção)', gridSpan: 3 },
      razaoSocial3: { label: 'Razão Social (3º Opção)', gridSpan: 3 },
      nomeFantasia: { label: 'Nome Fantasia (Opcional)', gridSpan: 3, holder: 'Nome Fantasia' },
      cepEmpresa: { label: 'CEP', type: 'number' },
      logradouroEmpresa: { label: 'Logradouro' },
      numeroEmpresa: { label: 'Numero', type: 'number' },
      bairroEmpresa: { label: 'Bairro' },
      cidadeEmpresa: { label: 'Cidade' },
      estadoEmpresa: { label: 'Estado' },
      complementoEmpresa: { label: 'Complemento' },
      emailEmpresa: { label: 'E-mail da empresa', type: 'email' },
      telefoneEmpresa: { label: 'Telefone da empresa', type: 'number' },
      capitalSocial: { label: 'Capital social R$', type: 'number' },
      formaDeIntegralizacao: { label: 'Forma de integralização', type: 'radio', options: [{ label: 'Em dinheiro', value: 'Em dinheiro' }, { label: 'Bens e imoveis', value: 'Bens e imoveis' }, { label: 'Titulos de crédito', value: 'Titulos de crédito' }, { label: 'Participação em outras empresas', value: 'Participação em outras empresas' }], gridSpan: 3 },
      formaDePagamento: { label: 'Forma de pagamento', type: 'radio', options: [{ label: 'A vista', value: 'A vista' }, { label: 'Parcelado', value: 'Parcelado' }], gridSpan: 3, isVisible: false },
      atividadeEmpresa: { label: 'Atividade da empresa (Descrição da atividade)', holder: 'Descrição da atividade', gridSpan: 3 },
      previsaoFaturamento: { label: 'Previsão de Faturamento', type: 'number' },
      numeroEmpregados: { label: 'Nº de empregados' },
      filiaisEmpresa: { label: 'Filiais' }
    },

    'Dados do Imóvel': {
      iptuEmpresa: { label: 'IPTU (Numero do indice cadastral)', type: 'number' },
      areaEmpresa: { label: 'Área total utilizada pela empresa em m²', type: 'number' },
      areaCoberta: { label: 'Área coberta em m²', type: 'number' },
      areaDescoberta: { label: 'Área descoberta em m²', type: 'number' }
    },

    'Informações do CORPO DE BOMBEIROS MILITAR': {
      atividadeInocuaVirtual: { label: 'A atividade é explorada em ambiente inócuo ou virtual?', type: 'radio' },
      patrimonioHistorico: { label: 'A atividade é exercida em imóvel que compõe o Patrimônio Histórico e Cultural?', type: 'radio' },
      areaInferior200m: { label: 'A atividade é exercida em estabelecimento que ocupa em todo ou em parte imóvel com área construída igual ou inferior a 200m²?', type: 'radio' },
      areaSuperior930m: { label: 'A atividade é exercida em imóvel com área construída superior a 930 m²?', type: 'radio' },
      maisTresPavimentos: { label: 'A atividade é exercida em imóvel com mais de 03 (três) pavimentos ou altura maior que 12 (doze) metros?', type: 'radio' },
      armazenamentoCombustivel: { label: 'A atividade demanda armazenamento de líquido combustível ou inflamável ainda que fracionado em volume superior a 1000L?', type: 'radio' },
      atividadeAreaCBMMG: { label: 'A atividade é desenvolvida por pessoa física ou jurídica na área de competência do Corpo de Bombeiros Militar de Minas Gerais?', type: 'radio' },
      utilizacaoGLP: { label: 'A atividade demanda a utilização ou armazenamento de gás liquefeito de petróleo (GLP) acima de 190 kg?', type: 'radio' },
      lotacaoPublico: { label: 'A atividade é exercida em estabelecimento que possui lotação de público superior a 100 pessoas?', type: 'radio' },
      comercializacaoPrevencaoIncendio: { label: 'A atividade destina-se à comercialização, instalação, manutenção e conservação de aparelhos de prevenção contra incêndio e pânico, por pessoa física ou jurídica?', type: 'radio' },
      subsoloDiferenteEstacionamento: { label: 'A atividade é exercida em imóvel que possua subsolo com uso distinto de estacionamento?', type: 'radio' }
    },

    '': {
      numeroSocios: { label: 'Número de Sócios', type: 'number' }
    }
  });
  
  const [formSent, setFormSent] = useState(false);
  const [confettiCount, setConfettiCount] = useState(100); // Número inicial de peças do confetti

  const updateSociosSections = (numSocios) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

        Object.keys(newFormData).forEach((key) => {
          if ((key.startsWith('Socio ') && parseInt(key.split(' ')[1]) > numSocios)) {
            delete newFormData[key];
          }
      });

      for (let i = 1; i <= numSocios; i++) {
        newFormData['Socio ' + i] = {
          ['nomeSocio' + i]: { label: 'Nome' },
          ['estadoCivilSocio' + i]: { label: 'Estado Civil' },
          ['profissaoSocio' + i]: { label: 'Profissão' },
          ['cepEmpresa' + i]: { label: 'CEP', type: 'number' },
          ['logradouroEmpresa' + i]: { label: 'Logradouro' },
          ['numeroEmpresa' + i]: { label: 'Numero', type: 'number' },
          ['bairroEmpresa' + i]: { label: 'Bairro' },
          ['cidadeEmpresa' + i]: { label: 'Cidade' },
          ['estadoEmpresa' + i]: { label: 'Estado' },
          ['complementoEmpresa' + i]: { label: 'Complemento' },
          ['identidadeSocio' + i]: { label: 'Identidade' },
          ['cpfSocio' + i]: { label: 'CPF', type: 'number' },
          ['dataNascimentoSocio' + i]: { label: 'Data de Nascimento', type: 'date' },
          ['socioAdministrador' + i]: { label: 'Sócio Administrador?', type: 'radio' },
          ['assinaturaEmpresa' + i]: { label: 'Assinatura pela empresa', type: 'radio', options: [{ label: 'Em conjunto', value: 'Em conjunto' }, { label: 'Individual', value: 'Individual' }], isVisible: false },
          ['retiradaProLabore' + i]: { label: 'Realizará a retirada Pró-labore', type: 'radio', isVisible: false },
          ['valorRetirada' + i]: { label: 'Valor da retirada', type: 'number', isVisible: false },
          ['participacaoCapitalSocial' + i]: { label: 'Participação no Capital Social' },
          ['emailSocio' + i]: { label: 'E-mail' },
          ['telefoneSocio' + i]: { label: 'Telefone para contato', type: 'number' },
          ['nacionalidadeSocio' + i]: { label: 'Nacionalidade' }
        };
      }

      return newFormData;
    });
  };

  const handleChange = (section, key, value) => {
    const isEmpresaSection = section === 'Dados da Empresa';
    const isSocioNumberSection = section === '';
    const isSocioAdministrador = key.startsWith('socioAdministrador');
    const isRetiradaProLabore = key.startsWith('retiradaProLabore');

    if (isSocioNumberSection && key === 'numeroSocios') {
      const numSocios = Math.min(Number(value), 25); // Limita o número de sócios a 25
      updateSociosSections(numSocios);
    }

    if (key === 'formaDeIntegralizacao' && isEmpresaSection) {
      setFormVisibility('formaDePagamento', value === 'Em dinheiro');
    }

    if (isSocioAdministrador) {
      setFormVisibility('assinaturaEmpresa' + key.slice(-1), value === 'Sim');
      setFormVisibility('retiradaProLabore' + key.slice(-1), value === 'Sim');
    }

    if (isRetiradaProLabore) {
      setFormVisibility('valorRetirada' + key.slice(-1), value === 'Sim');
    }

    function setFormVisibility(fieldName, isVisible) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [fieldName]: {
            ...prevFormData[section][fieldName],
            isVisible: isVisible
          }
        }
      }));
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [key]: {
          ...prevFormData[section][key],
          value: value
        }
      }
    }));
  };

  const handleSubmit = async (event, base64File) => {
    event.preventDefault();

    const transformedFormData = transformFormData(formData);
    console.log(transformedFormData);
    
    try {
      const response = await axios.post(url, transformedFormData);
      console.log('Requisição bem sucedida', response.data);
      setFormSent(true);
      setConfettiCount(100);

      const confettiInterval = setInterval(() => {
        setConfettiCount((prevCount) => Math.max(prevCount - 4, 0));
      }, 500);

      setTimeout(() => {
        clearInterval(confettiInterval);
      }, 40000);

    } catch (error) {
      console.error('Falha na requisição:', error);
    }
  };

  return { formData, setFormData, handleChange, handleSubmit, formSent, confettiCount };
};

export default useFormManagement;
