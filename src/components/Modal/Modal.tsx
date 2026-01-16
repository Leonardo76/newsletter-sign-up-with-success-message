import './modal.css'
import image from '../../assets/images/icon-success.svg';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../ui/dialog.tsx";

/**
 * Popup/Modal/Dialog showing the success message
 * @param isOpen - state storing the information regarding the Modal is open or not
 * @param setIsOpen - state function for isOpen
 * @param email - email written by user (to be shown in the message)
 * @constructor
 */
export default function Modal({isOpen, setIsOpen, email}: {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    email: string
}) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
                className="[&>button:first-of-type]:hidden modalContainer"
                onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className={"sr-only"}>
                    <DialogTitle>Title</DialogTitle>
                    <DialogDescription>
                        Confirmation message specifying that an email has been sent.
                    </DialogDescription>
                </DialogHeader>

                <section className="modalContainer__content">
                    <img src={image} alt="Checked image"
                         className="modalContainer__content-image"
                         width="64px"
                         height="auto"
                    />
                    <h1 className="modalContainer__content-title">Thanks for subscribing!</h1>
                    <p className="modalContainer__content-message">
                        A confirmation email has been sent to <strong>{email}</strong>.
                        Please open it and click the button inside to
                        confirm your subscription.</p>
                </section>

                <DialogFooter className={"modalContainer__footer"}>
                        <button onClick={() => setIsOpen(false)}
                            className="modalContainer__footer-button"
                        >Dismiss message
                        </button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
