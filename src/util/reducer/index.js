import { combineReducers } from 'redux'

export const getVideoValue=(state=[],action)=>{
    switch(action.type){
        case 'ADD_VIDEO':
            return action.value
        default:
        return state
    }
}

export const getFavorVideoValue=(state=[],action)=>{
    switch(action.type){
        case 'ADD_FAVORVIDEO':
            return action.value
            default:
                return state
    }
}

export const rootReducer = combineReducers({
    getVideoValue,getFavorVideoValue
})

