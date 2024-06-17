import InputMask from 'react-input-mask';

// Componente responsável por renderizar todo o formulário
const Fields = (props) => {
    const renderInput = (key, label, type, holder, value, section) => {        
        const isTelefoneField = key === 'telefoneEmpresa' || key.includes('telefone');

        return isTelefoneField ? (
            <InputMask
                className="no-arrows block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                mask="(99) 9999-99999"
                value={value || ''}
                placeholder={holder || label}
                onChange={event => props.onChange(section, key, event.target.value)}
            >
                {(inputProps) => <input {...inputProps} type="tel" />}
            </InputMask>
        ) : (
    
        <input
            className="no-arrows block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type={type}
            onKeyDown={(e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
            placeholder={holder || label}
            name={key}
            value={value || undefined}
            required={key !== 'nomeFantasia' && !key.startsWith('complementoEmpresa')}
            onChange={event => props.onChange(section, key, event.target.value)}
            onBlur={event => { if (!event.defaultPrevented && key.startsWith('cepEmpresa')) props.handleBlur(event.target.value, section, key); }}
        />
    );
};

    const renderRadio = (key, options, value, section) => (
        (options || [{ label: 'Sim', value: 'Sim' }, { label: 'Não', value: 'Não' }]).map((option, index) => (
            <label key={index} className="inline-flex items-center mr-2">
                <span className="mr-1 text-gray-700">{option.label}</span>
                <input
                    className="form-radio h-5 w-5 text-blue-600 no-arrows"
                    type="radio"
                    name={key}
                    value={option.value}
                    checked={value === option.value}
                    onChange={event => props.onChange(section, key, event.target.value)}
                />
            </label>
        ))
    );

    const renderField = (key, { type = "text", label, gridSpan, value, options, isVisible = true, holder = label }, section) => (
        isVisible && (
            <div key={key} className={`mb-4 ${gridSpan === 2 ? 'col-span-2' : gridSpan === 3 ? 'col-span-3' : ''}`}>
                <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
                {type !== 'radio' ? (key === 'atividadeEmpresa' ? (
                    <textarea
                        className="no-arrows block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                ) : (
                    renderInput(key, label, type, holder, value, section)
                )) : (
                    renderRadio(key, options, value, label, section)
                )}
                {key === 'cepEmpresa' && props.erroCep && <p className="text-red-500 text-xs mt-2 ml-2">{props.erroCep}</p>}
            </div>
        )
    );

    return (
        <div className="bg-white rounded-lg px-4 mx-auto my-4">
            {Object.keys(props.data).map((section) => (
                <div key={section} className="mb-4 border p-2 border-gray-700 border-opacity-35">
                    <h2 className="text-lg font-bold text-gray-800 pb-2 mt-3 mb-8 text-center">{section}</h2>
                    <div className={`grid ${section === 'Perguntas do CORPO DE BOMBEIROS MILITAR' ? 'sm:grid-cols-1 md:grid-cols-2' : 'sm:grid-cols-1 md:grid-cols-3'} gap-4`}>
                        {Object.entries(props.data[section]).map(([key, value]) => renderField(key, value, section))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Fields
