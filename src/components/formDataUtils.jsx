/**
 * Transforma os dados do formulário para um formato plano.
 * @param {Object} formData - Os dados do formulário no formato atual.
 * @returns {Object} Os dados do formulário transformados.
 */
export const transformFormData = (formData) => {
  console.log(formData);
  const newFormData = {};

  const transformSectionData = (sectionData) => (
      Object.entries(sectionData).reduce((sectionAcc, [key, { label, value, type }]) => {
          sectionAcc[label] = type === 'radio' && (value === 'Sim' || value === 'Não') ? value === 'Sim' : (value ?? '');
          return sectionAcc;
      }, {})
  );

  newFormData['Socios'] = [];

  Object.keys(formData).forEach(section => {
      if (section.startsWith('Socio')) {
          newFormData['Socios'].push(transformSectionData(formData[section]));
      } else {
          newFormData[section] = transformSectionData(formData[section]);
      }
  });

  return newFormData;
};
