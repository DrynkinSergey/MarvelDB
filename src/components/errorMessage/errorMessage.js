import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img style={{
            width:250,
            height:250,
            margin: "0 auto",
            objectFit: "contain"
        }} src={img} alt=""/>
    )
    };

export default ErrorMessage;