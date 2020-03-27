import { createAction, props } from '@ngrx/store';
import { Country, Operator, Tier, BreadcrumbItem, ThemeData } from './app.data.models';

export const ToggleRightPanelAction = createAction('[Global] Toggle Right Panel', props<{payload: boolean}>());
export const ToggleLeftPanelAction = createAction('[Global] Toggle Left Panel', props<{payload: boolean}>());
export const SetBreadcrumbAction = createAction('[Global] Set Breadcrumb', props<{payload : BreadcrumbItem[]}>());

export const LoadCountriesAction = createAction('[Global] Load Countries');
export const LoadCountriesSuccessAction = createAction('[Global] Load Countries Success ✓', props<{payload: Country[]}>());

export const LoadOperatorsAction = createAction('[Global] Load Operators', props<{payload: Country}>());
export const LoadOperatorsSuccessAction = createAction('[Global] Load Operators Success ✓', props<{payload: Operator[]}>());

export const AppThemeChangeAction = createAction('[Global] Theme Change', props<{payload: ThemeData}>());
export const AppThemeChangeSuccessAction = createAction('[Global] Theme Change Success ✓', props<{payload: any}>());