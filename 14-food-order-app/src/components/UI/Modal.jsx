import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open }) {
    const modalRef = useRef()
    
    useEffect(() => {
        const modal = modalRef.current

        if (open){
            modal.showModal()
        }
    }, [open])
    return createPortal(
        <dialog ref={modalRef}>
            {children}
        </dialog>, document.getElementById("modal"))
}
