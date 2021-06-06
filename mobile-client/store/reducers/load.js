import { SET_LOAD } from '../actions/load';

const initialState = {
    selectedLoad: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOAD:
            return {
                selectedLoad: action.selectedLoad
            };
    }
    return state;
};
