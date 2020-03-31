import { GlobalState, BreadcrumbItem } from './app.data.models';
import { ToggleRightPanelAction, ToggleLeftPanelAction, LoadCountriesSuccessAction, LoadOperatorsSuccessAction, AppThemeChangeAction, SetBreadcrumbAction, AppThemeChangeSuccessAction } from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { GetThemeSuccessAction } from '../app/authentication/authentication.actions';

const initState: GlobalState = {
    layout: {
        rightNavOpened: false,
        leftNavOpened: false,
        appTheme: 'theme-apigate-blue',
        particleAnimation: true,
        menuBackImage: false
    },
    mccAndmnc: {
        countries: null,
        operators: []
    },
    breadcrumb: []
};

const _globalReducer = createReducer(initState,

    on(ToggleRightPanelAction, (state, { payload }) => ({
        ...state, layout: { ...state.layout, rightNavOpened: <boolean>payload }
    })),

    on(ToggleLeftPanelAction, (state, { payload }) => ({
        ...state, layout: { ...state.layout, leftNavOpened: <boolean>payload }
    })),

    on(AppThemeChangeAction, (state, { payload }) => ({
        ...state, layout: { ...state.layout, appTheme: payload.theme.split('_')[0], menuBackImage: eval(payload.theme.split('_')[1]) }
    })),

    on(GetThemeSuccessAction, (state, { payload }) => ({
        ...state, layout: { ...state.layout, appTheme: payload.split('_')[0], menuBackImage: eval(payload.split('_')[1]) }
    })),

    on(LoadCountriesSuccessAction, (state, { payload }) => ({
        ...state, mccAndmnc: { ...state.mccAndmnc, countries: payload }
    })),

    on(LoadOperatorsSuccessAction, (state, { payload }) => ({
        ...state, mccAndmnc: { ...state.mccAndmnc, operators: payload }
    })),

    on(SetBreadcrumbAction, (state, { payload }) => ({
        ...state, breadcrumb: payload
    }))

);

export function globalReducer(state, action) {
    return _globalReducer(state, action);
}