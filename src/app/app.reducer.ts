import { GlobalState } from './app.models';
import * as globalActions from './app.actions';

const initState: GlobalState = {
    layout: {
        rightNavOpened: false
    }
};

export function globalReducer(state: GlobalState = initState, action: globalActions.Actions) {
    switch (action.type) {
        case globalActions.TOGGLE_RIGHT_NAV_PANEL: {
            return Object.assign({}, state,
                {
                    layout: {
                        rightNavOpened: action.payload
                    }
                });
        }
        default:
            return state;
    }
}



