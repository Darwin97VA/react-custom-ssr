import { type as changeFake } from '../actions/fake'
const defaultState = [
    {
        id: 0,
        nombre: 'Darwin'
    },
    {
        id: 1,
        nombre: 'VA'
    }
]

const reducer = (state = defaultState, { type, payload }) => {
    switch(type) {
        case changeFake:
            const { id } = payload
            const indice = state.findIndex(obj=>obj.id===id)
            const tempState = [...state]
            tempState[indice] = payload
            return tempState
        default:
            return state
    }
}

export default reducer