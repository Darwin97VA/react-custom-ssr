export const type = 'changeFake'

const changeFake = ({ id, nombre }) => {
    return {
        type, 
        payload: {
            id, 
            nombre
        }
    }
}

export default changeFake