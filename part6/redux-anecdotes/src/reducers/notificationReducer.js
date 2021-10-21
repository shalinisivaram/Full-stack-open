let clearTime = 0
const notificationReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const setNotification = (notification,time) => {
        return async dispatch => {
            clearTimeout(clearTime)
            dispatch({
                type:'SET_NOTIFICATION',
                notification
            }) 
            
        clearTime = setTimeout(() => {
            dispatch({
                type:'CLEAR_NOTIFICATION',
                notification:null
            })
        },time*1000)
        
        }
}



export default notificationReducer
    