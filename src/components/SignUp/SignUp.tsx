import './SignUp.css'
import {FormProvider, useForm} from "react-hook-form";
import {useState} from "react";

import imageMobile from '../../assets/images/illustration-sign-up-mobile.svg'
import imageTablet from '../../assets/images/illustration-sign-up-tablet.svg'
import imageDesktop from '../../assets/images/illustration-sign-up-desktop.svg'

import {DeviceType} from "../utils/Breakpoint/Breakpoint.tsx";

import {email_validation} from '../utils/inputValidations.ts'
import {Input} from "../Input/Input.tsx";
import Modal from "../Modal/Modal.tsx";

// import {BsFillCheckSquareFill} from "react-icons/bs";


function SignUp() {
    const methods = useForm()
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("");


    //handle the form submit, reset the errors (if any) and set the flag for knowing that the form was successfully submitted
    const onSubmit = methods.handleSubmit(data => {
        // console.log(data)
        // console.log(data["email"])
        setEmail(data["email"]);
        methods.reset()
        setSuccess(true)
    })


    // For the next 2 lines I know I can use <picture>, but I find the syntax of <picture> element to be a little messy
    // with multiple elements for a single image.
    // <picture>
    //     <source media="(min-width:768px)" srcset={imageTablet}>
    //     <source media="(min-width:1440px)" srcset={imageDesktop}>
    //     <img src={imageMobile} alt="Image with an application window">
    //</picture>
    //
    // More than that, you can change the breakpoints on the fly using the DeviceType function like DeviceType(768, 1440).
    // Those breakpoints, as well as the images can be received on the Props for a more complicated project,
    // or you can receive just an image (you have flexibility).
    // But you can use any solution you like.
    const deviceType = DeviceType();
    const image = deviceType == "isMobile"
        ? imageMobile
        : deviceType == "isTablet"
            ? imageTablet
            : imageDesktop;

    //shadcn UI translate all page on Y with -50vh when it shows the success message
    const translateOnSuccess= success
        ? {transform: "translateY(50vh)"}
        : {transform: ""};

    return (
        <main className="signup" style={translateOnSuccess}>
            <img src={image} alt="Image with an application window" className="signup__image"/>
            <article className="signup__content">
                <section className="signup__content-text">
                    <h1 className="signup__content-text-title">Stay updated!</h1>
                    <p className="signup__content-text-message">Join 60,000+ product managers receiving monthly updates
                        on:</p>
                    <ul className="signup__content-text-options">
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
                        autoComplete="off"
                        className="signup__content-subscribe"
                    >
                        <div className="signup__content-subscribe-input">
                            <Input {...email_validation} />
                        </div>
                        <div className="mt-5">
                            {
                                success && (
                                    // a@a.com
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