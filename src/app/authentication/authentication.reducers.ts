import * as loginActions from './authentication.actions';

export function reducer(state, action: loginActions.Actions) {
    switch (action.type) {
        case loginActions.DO_LOGIN: {
            break;
        }

        default: {
            return state;
        }
    }

}
