import React from "react";
import {useState} from 'react';
import ValoresEconomicos from "../../interfaces/ValoresEconomicos";
import {CustomCommonInput, CustomCheckboxInput} from "../form-components/CustomInputs";

/**
 * Ajuste de interface para definir correctamente las props entrantes y su definición.
 */
interface SimuladorFormProps {
    valoresEconomicos: ValoresEconomicos,
}

type simuladorValuesForm = {
    monto: number,
    cuotas: number,
    seguroDesgravamen: boolean,
    seguroCesantia: boolean
}

const SimuladorForm = (props: SimuladorFormProps) => {

    // Object destructuring de los props entregados
    const {maxUF, maxUFToPesos} = props.valoresEconomicos;

    // Valoración inicial de los valores del formulario. Usa el type interno de esta clase.
    const [values, setValues] = useState<simuladorValuesForm>({
        monto: 0,
        cuotas: 0,
        seguroDesgravamen: true,
        seguroCesantia: false
    });

    // Controla los cambios de los inputs del formulario y los asigna según corresponda al objeto con los datos del formulario.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    // Controla los cambios de los checkbox-inputs del formulario y los asigna según corresponda al objeto con los datos del formulario.
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.checked});
    }

    // Controla el submit del formulario.
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('enviando datos');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <CustomCommonInput
                    id={"input-Monto"}
                    name={"monto"} //El campo "name" debe ser igual al nombre de campo que se usa en 'setValues'
                    type={"number"}
                    value={values.monto}
                    changeHandler={handleChange}
                    label={"Ingresa el monto que necesitas:"}
                    helpText={`Hasta ${maxUF} UF ($${maxUFToPesos})`}

                />
            </div>
            <div className="mb-3">
                <CustomCommonInput
                    id={"input-Cuotas"}
                    name={"cuotas"} //El campo "name" debe ser igual al nombre de campo que se usa en 'setValues'
                    type={"number"}
                    value={values.cuotas}
                    changeHandler={handleChange}
                    label={"Ingresa el número de cuotas:"}
                    helpText={"Entre 1 a 60 cuotas"}
                />
            </div>
            <div className="mb-3 form-check">
                <CustomCheckboxInput
                    id={"check-seguroDesgravamen"}
                    name={"seguroDesgravamen"}
                    label={"Seguro de desgravamen"}
                    checked={values.seguroDesgravamen}
                    changeHandler={handleCheckboxChange}
                />
            </div>
            <div className="mb-3 form-check">
                <CustomCheckboxInput
                    id={"check-seguroCesantia"}
                    name={"seguroCesantia"}
                    label={"Seguro de cesantía"}
                    checked={values.seguroCesantia}
                    changeHandler={handleCheckboxChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">Simular</button>
        </form>
    );
}

export default SimuladorForm;
