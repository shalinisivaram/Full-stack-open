const Notification = ({message,error}) => {
    const notificationStyle = {
        color:'green',
        backgroundColor:'lightgrey',
        fontSize:20,
        borderStyle:'solid',
        borderRadius:5
    }

    if(message === null){
        return  null
    }
    return (
        <div style= {notificationStyle}>
            {message}
        </div>
        
    )
} 

export default Notification;