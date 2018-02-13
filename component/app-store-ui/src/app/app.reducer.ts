import { GlobalState } from './app.models';
import * as globalActions from './app.actions';
import { ToggleRightPanelAction } from './app.actions';

const initState: GlobalState = {
    layout: {
        rightNavOpened: false,
        leftNavOpened: false,
        appTheme: 'theme-one-light'
    },
    mccAndmnc: {
        countries: null,
        operators: []
    }
};

export function globalReducer(state: GlobalState = initState, action: globalActions.Actions) {
    switch (action.type) {
        case globalActions.TOGGLE_RIGHT_NAV_PANEL: {
            return Object.assign({}, state,
                {
                    layout: Object.assign({}, state.layout, {
                        rightNavOpened: <any>action.payload
                    })
                });
        }

        case globalActions.TOGGLE_LEFT_NAV_PANEL: {
            return Object.assign({}, state,
                {
                    layout: Object.assign({}, state.layout, {
                        leftNavOpened: action.payload
                    })
                });
        }
        case globalActions.LOAD_COUNTRIES_SUCCESS: {
            return Object.assign({}, state, {
                mccAndmnc: Object.assign({}, state.mccAndmnc, { countries: action.payload })
            });
        }

        case globalActions.LOAD_OPERATORS_SUCCESS: {
            return Object.assign({}, state, {
                mccAndmnc: Object.assign({}, state.mccAndmnc, { operators: action.payload })
            });
        }

        case globalActions.APP_THEME_CHANGE: {
            return Object.assign({}, state, {
                layout: Object.assign({}, state.layout, {
                    appTheme: action.payload
                })
            });
        }

        default:
            return state;
    }
}



