const initialState = {
    imageList: [],
    showToastMsg: false,
    msgSeverity: "success",
    message: ""
}

export default function ImageReducer(state = initialState, action){
    switch(action.type){
        case "SET_ALL_IMAGES":
            return {
                ...state,
                imageList : action.imageList
            }

        case "SET_TOASTMESSAGE_FLAG":
            return {
                ...state,
                showToastMsg : action.flag,
                msgSeverity: action.severity,
                message: action.message
            }

        default:
            return state;
    }
}