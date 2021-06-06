import { SET_LOADS } from '../actions/loads';

const initialState = {
    loads: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADS:
            return {
                loads: action.loads
            };
    }
    return state;
};
