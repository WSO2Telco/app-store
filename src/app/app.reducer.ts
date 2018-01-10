import { GlobalState } from './app.models';
import * as globalActions from './app.actions';

const initState: GlobalState = {
    layout: {
        rightNavOpened: false,
        leftNavOpened: false
    }
};

export function globalReducer(state: GlobalState = initState, action: globalActions.Actions) {
    switch (action.type) {
        case globalActions.TOGGLE_RIGHT_NAV_PANEL: {
            return Object.assign({}, state,
                {
                    layout: Object.assign({}, state.layout, {
                        rightNavOpened: action.payload
                    })
                });
        }

        case globalActions.TOGGLE_LEFT_NAV_PANEL: {
            return Object.assign({}, state,
                {
                    layout: Object.assign({}, state.layout, {
                        leftNavOpened: !state.layout.leftNavOpened
                    })
                });
        }
        default:
            return state;
    }
}



