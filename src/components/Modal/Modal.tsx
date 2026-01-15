// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
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
// import {Button} from "../ui/button.tsx";

export default function Modal({isOpen, setIsOpen, email}: {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    email: string
}) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/*<DialogTrigger asChild>*/}
            {/*    <Button variant="outline">Open Modal</Button>*/}
            {/*</DialogTrigger>*/}

            <DialogContent
                className="[&>button:first-of-type]:hidden modalContainer"
                onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader className={"sr-only"}>
                    <DialogTitle>Title</DialogTitle>
                    <DialogDescription>
                        Confirmation message specifying that an email has been sent.
                    </DialogDescription>
                </DialogHeader>

                <div className="modalContainer__content">
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
                </div>

                {/*no need*/}
                <DialogFooter className={"modalContainer__footer"}>
                    {/*<DialogClose >*/}
                        <button onClick={() => setIsOpen(false)}
                            className="modalContainer__footer-button"
                        >Dismiss message
                        </button>
                    {/*</DialogClose>*/}
                    {/*<Button variant={"outline"}>Save changes</Button>*/}
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
