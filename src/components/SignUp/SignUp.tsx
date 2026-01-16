//region Imports
import './SignUp.css'
import {FormProvider, useForm} from "react-hook-form";
import {useState} from "react";

//images to be used depending on device size
import imageMobile from '../../assets/images/illustration-sign-up-mobile.svg'
import imageTablet from '../../assets/images/illustration-sign-up-tablet.svg'
import imageDesktop from '../../assets/images/illustration-sign-up-desktop.svg'

import {DeviceType} from "../utils/Breakpoint/Breakpoint.tsx";

//props for Input custom component - see the file for different types of inputs
import {email_validation} from './inputValidations.ts'

//input custom component - provide validation
import {Input} from "../Input/Input.tsx";

//custom popup/modal/dialog shown on success
import Modal from "../Modal/Modal.tsx";
//endregion

/**
 * Registration form
 * @constructor
 */
function SignUp() {
    //used for validation (see react-hook-form documentation for details)
    const methods = useForm()

    //store if the inputted email is valid (we have successful validation)
    const [success, setSuccess] = useState(false)
    //store the email in order to be transmitted to the modal
    const [email, setEmail] = useState("");


    // handle the form submit,
    // reset the errors (if any) and
    // set the flag for knowing that the form was successfully submitted
    const onSubmit = methods.handleSubmit(data => {
        // console.log(data)

        // console.log(data["email"]) - you can see the email (shown just on validation)
        setEmail(data["email"]);

        //reset the form state, fields reference and subscriptions (reset the validation)
        methods.reset()

        setSuccess(true)
    })

    // setting the image depending on device (instead of <picture>)
    // <picture> loads the images when necessary.
    // Some big SVG loads slowly so you can see a delay in rendering on first load.
    const deviceType = DeviceType();
    const image = deviceType == "isMobile"
        ? imageMobile
        : deviceType == "isTablet"
            ? imageTablet
            : imageDesktop;

    // For time being, there is an error on shadcn UI
    // (translate all page on Y with -50vh when it shows the success message)
    // We need to translate it back
    const translateOnSuccess = {transform: success ? "translateY( 50vh)" : ""};

    return (
        <main className="signup" style={translateOnSuccess} aria-label={"Dialog for registering with an email"}>
            {/*<picture>*/}
            {/*    <source media="(min-width:1440px)" srcSet={imageDesktop}/>*/}
            {/*    <source media="(min-width:768px)" srcSet={imageTablet}/>*/}
            {/*    <img src={imageMobile} alt="Image with an application window"*/}
            {/*         aria-label={"Image with an application window"}*/}
            {/*         className="signup__image"*/}
            {/*    />*/}
            {/*</picture>*/}
            {/*for using picture, uncomment the above lines*/}
            <img src={image} alt="Image with an application window" className="signup__image"/>
            <article className="signup__content" aria-label={"Text of the dialog and button for submit"}>
                <section className="signup__content-text" aria-label={"Text explaining why you must subscribe"}>
                    <h1 className="signup__content-text-title"
                        aria-label={"Title of the page saying that you have to stay updated"}>
                        Stay updated!</h1>
                    <p className="signup__content-text-message"
                       aria-label={"Specify that you will have benefits if you subscribe"}>
                        Join 60,000+ product managers receiving monthly updates on:</p>
                    <ul className="signup__content-text-options"
                        aria-label={"List of benefits"}>
                        <li className="signup__content-text-options-option">Product discovery and building what
                            matters
                        </li>
                        <li className="signup__content-text-options-option">Measuring to ensure updates are a success
                        </li>
                        <li className="signup__content-text-options-option">And much more!</li>
                    </ul>
                </section>
                <FormProvider {...methods}>
                    <form
                        onSubmit={e => e.preventDefault()}
                        noValidate
                        // autoComplete="off"
                        className="signup__content-subscribe"
                        aria-label={"Form for imputing an email"}
                    >
                        <div className="signup__content-subscribe-input">
                            <Input {...email_validation} />
                        </div>
                        <div className="mt-5">
                            {
                                success && (
                                    <Modal isOpen={success} setIsOpen={setSuccess} email={email}/>
                                )
                            }
                            <button onClick={onSubmit} className="signup__content-subscribe-button">
                                Subscribe to monthly newsletter
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </article>
        </main>
    );
}

export default SignUp;