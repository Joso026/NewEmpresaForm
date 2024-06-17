import React from 'react';
import Fields from './Fields';
import useCep from './useCep';
import useFormManagement from './useFormManagement';
import Confetti from 'react-confetti';

// Componente principal do formulário, que renderiza todos os campos e seções.
const FormComponent = () => {
    const { formData, setFormData, addRazaoSocial, handleChange, handleSubmit, formSent, confettiCount } = useFormManagement();
    const { getCepInformations, erroCep } = useCep(setFormData);

    return (
        <div className='bg-gray-700 flex flex-col justify-center min-h-screen'>
            {formSent ? (
                <div className="px-2 mb-60 text-white text-center">
                    <p className="my-2 text-2xl">Formulário enviado com sucesso!</p>
                    <p className="text-xl">Entraremos em contato em breve.</p>
                    {confettiCount > 0 && <Confetti numberOfPieces={confettiCount} />}
                </div>
            ) : (
                <>
                    <form onSubmit={(event) => handleSubmit(event)} autoComplete='off' className='px-2 bg-white'>                        <Fields data={formData} onChange={handleChange} handleBlur={getCepInformations} erroCep={erroCep} addRazaoSocial={addRazaoSocial} />
                        <button type='submit' onSubmit={handleSubmit} className="bg-gray-700 hover:bg-amber-600 text-white font-bold py-2 px-4 mb-4 ml-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default FormComponent;
