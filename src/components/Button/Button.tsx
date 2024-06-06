import React, { ReactNode, MouseEvent } from 'react';
import styles from './Button.module.css'

type PropsButton = {
    children: ReactNode
    onClick?: ( e: MouseEvent ) => void
    type: string
}

const Button = ( { children, onClick, type }: PropsButton ) => {
    return (
        <button className={ `${ styles.btn } ${ styles[ type ] }` } onClick={ onClick }>
            { children }
        </button>
    );
};

export default Button;