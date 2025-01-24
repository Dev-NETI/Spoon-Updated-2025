import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Button from './Button';

const Modal = forwardRef(({ title, children }, ref) => {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current.showModal(),
        close: () => dialogRef.current.close(),
    }));

    return (
        <dialog ref={dialogRef} className='modal rounded-xl'>
            <div className='flex flex-col '>
                <div className='bg-blue-900 flex justify-center items-end p-2'>
                    <p className='font-bold text-slate-100 text-lg'>{title}</p>
                </div>
                <div className='modal-content p-2'>{children}</div>
                <div className='border-t-2 flex  p-2 justify-end'>
                    <Button
                        type='button'
                        onClick={() => dialogRef.current.close()}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </dialog>
    );
});

Modal.displayName = 'Modal';
export default Modal;
