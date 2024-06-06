import styles from "./Message.module.css";

type PropsMessage = {
    message: string
}

function Message ( { message }: PropsMessage ) {
    return (
        <p className={ styles.message }>
            <span role="img">👋</span> { message }
        </p>
    );
}

export default Message;
