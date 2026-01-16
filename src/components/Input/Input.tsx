import {type FieldErrors, type GlobalError, type RegisterOptions, useFormContext} from 'react-hook-form'
import {AnimatePresence, motion} from 'framer-motion'
import './Input.css'
import classnames from "classnames";

type InputProps = {
    name: string,
    label: string,
    type?: string,
    id: string,
    placeholder: string,
    validation: RegisterOptions,
    multiline?: boolean
}

/**
 * Input component with automatic validation
 * @param name - name of the input
 * @param label - label text associated with the input
 * @param type - type of the input (default text)
 * @param id - id of the input
 * @param placeholder - placeholder text for the input
 * @param validation - validation object (see inputValidations.ts for examples)
 * @param multiline - if the input is a multiline textarea or not (default false)
 * @constructor
 */
export const Input =
    ({
         name,
         label,
         type = 'text',
         id,
         placeholder,
         validation,
         multiline = false
     }: InputProps) => {

        const {register, formState: {errors}} = useFormContext();

        const inputErrors = findInputError(errors, name)
        const isInvalid = isFormInvalid(inputErrors)

        return (
            <div className={classnames("inputWithValidation",
                isInvalid ? "errorPlaceholderFocus" : "normalPlaceholderFocus",)}>
                <div className="inputWithValidation--labelcontainer">
                    <label htmlFor={id}
                           className="inputWithValidation--labelcontainer-message">
                        {label}
                    </label>
                    <AnimatePresence mode="wait" initial={false}>
                        {isInvalid && (
                            <InputError
                                message={inputErrors.error.message}
                                key={inputErrors.error.message}
                            />
                        )}
                    </AnimatePresence>
                </div>
                {multiline ? (
                    <textarea
                        id={id}
                        className="inputWithValidation--multiline"
                        placeholder={placeholder}
                        {...register(`${name}`, validation)}
                    ></textarea>
                ) : (
                    <input
                        id={id}
                        type={type}
                        className=
                            {classnames(
                                {"inputWithValidation--input-normal": !isInvalid},
                                {"inputWithValidation--input-error": isInvalid}
                            )}
                        placeholder={placeholder}
                        {...register(name, validation)}
                    />
                )}
            </div>
        )
    }

//region Utils
//animated error message
const InputError = ({message}: { message: string | undefined }) => {
    return (
        <motion.p className="inputWithValidation--labelcontainer-error" {...framer_error}>
            {message}
        </motion.p>
    )
}

//object settings for error animation
const framer_error = {
    initial: {opacity: 0, y: 10},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 10},
    transition: {duration: 0.2},
}

// Given an errors object and an input type name,
// this function filters the errors object and return the error of the given input
function findInputError(errors: FieldErrors, name: string): Record<string, GlobalError> & GlobalError {
    return Object.keys(errors)
        .filter(key => key.includes(name))
        .reduce((cur, key) => {
            return Object.assign(cur, {error: errors[key]})
        }, {});
}

//Checks if the form is valid or not
function isFormInvalid(err: Record<string, GlobalError> & GlobalError) {
    return Object.keys(err).length > 0;
}

//endregion