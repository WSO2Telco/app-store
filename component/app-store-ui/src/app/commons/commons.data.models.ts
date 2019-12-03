export interface ConfirmDialogParam {
  title: string;
  message: string;
}

export interface ActionDialogParam {
  appList: appArrayParam[];
}

export interface appArrayParam {
  view: string;
  viewValue: string;
}
