import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { Actions, ofType } from '@ngrx/effects';
import * as applicationsActions from '../../../applications/applications.actions';
import { GetApiOverviewSuccessAction, GetUserSubscriptionsSuccessAction, GetSelectedAppAction } from '../../apis.actions';
import { ApiOverview } from '../../apis.models';
import * as jQuery from "jquery";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../commons/components/confirm-dialog/confirm-dialog.component';
import { ApiResponseFilterComponent } from '../api-response-filter/api-response-filter.component';
import { ApplicationDetailsKeys } from '../../../applications/applications.data.models';

const baseUrl = new URL(window.location.href);
const swaggerApiContext = baseUrl.protocol + '//' + baseUrl.host + '/app-store/public/api/swagger';

@Component({
  selector: 'store-api-console',
  templateUrl: './api-console.component.html',
  styleUrls: ['./api-console.component.scss']
})
export class ApiConsoleComponent implements OnInit {
  @Input() public apiOverview: ApiOverview;
  @ViewChild('swagger', { static: true }) container: ElementRef;
  private apiSubscription;
  response: string;
  appResult;
  listOfEnv = [{ name: 'Production', val: 'PRODUCTION' }, { name: 'Sandbox', val: 'SANDBOX' }]
  selectedEnv: string;
  selectedApp: string = null;
  public loggedUser: string;
  subscriptionList = [];
  fullSwaggerURL: string;
  partialSwaggerURL: string;

  private storeSelect;
  private storeSelectApp;
  public keyObject: ApplicationDetailsKeys;
  public accessToken;

  constructor(
    private actions$: Actions,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    let logUser = this.store.select((s) => s.authentication.loggedUser)
      .subscribe((overview) => {
        this.loggedUser = overview;
      });

    this.store
      .select(s => s.apis.availableApp)
      .subscribe(apps => {
        this.appResult = apps.list;
        this.appResult = this.appResult.filter(
          appArr => appArr.status == "APPROVED");
      });

    this.actions$.pipe(ofType(GetUserSubscriptionsSuccessAction)).subscribe(res => {
      this.subscriptionList = (res.payload && res.payload.list) ? res.payload.list : [];
    })

    this.apiSubscription = this.actions$.pipe(ofType(GetApiOverviewSuccessAction)).subscribe(resp => {
      if (resp) {
        this.partialSwaggerURL = swaggerApiContext + resp.payload.context + '/' + resp.payload.provider
        const ui = SwaggerUIBundle({
          spec: JSON.parse(resp.payload.apiDefinition),
          domNode: this.container.nativeElement.querySelector('.swagger-container'),
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl,
            () => {
              return {
                components: {
                  Topbar: () => null,
                  Info: () => null
                }
              };
            }
          ],
          requestInterceptor: function (request) {
            //Intercept the request and inject Bearer token
            var url = resp.payload.endpointURLs[0].environmentURLs.https;
            var authorizationHeader = 'Authorization';
            var key = this.accessToken;
            if (key && key.trim() != "") {
              request.headers[authorizationHeader] = "Bearer " + key;
            } else {
              request.headers[authorizationHeader] = "Bearer ";
            }
            return request;
          },
          docExpansion: 'list',
          jsonEditor: true,
          defaultModelRendering: 'schema',
          showRequestHeaders: true,
          layout: 'StandaloneLayout',
          deepLinking: true,
          showExtensions: true,
          showCommonExtensions: true,
          sorter: "alpha",
        });
      }
    })
    this.swaggerUiOperation();
  }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }

  onAppChange(event) {
    this.accessToken = null;
    this.selectedEnv = null;
    this.store.dispatch(
      GetSelectedAppAction({ "payload": event.value })
    );

    this.storeSelectApp = this.store.select((s) => s.apis.selectedApplication).subscribe((appDetails) => {
      this.fullSwaggerURL = this.partialSwaggerURL + '/' + appDetails.subscriber;
    });

  }


  retrieveEnvKeyObject() {

    this.storeSelect = this.store.select((s) => s.apis.selectedApplication.keys).subscribe((appDetails) => {

      this.keyObject = appDetails.find(i => i.keyType == this.selectedEnv);
      if (this.keyObject) {
        this.accessToken = this.keyObject.token.accessToken;
        this.reInitiateSwagger(this.accessToken)
      } else {
        this.accessToken = null;
      }
      this.cd.detectChanges();
    });
  }

  checkOnKeyPress(e) {
    if (e.which == 13 || e.keyCode == 13) {
      return false;
    } else {
      // this.reInitiateSwagger(e.target.value)
    }
  }

  reInitiateSwagger(event) {
    const component = this;
    this.swaggerUiOperation();
    const ui = SwaggerUIBundle({
      // url: 'https://localhost:9443/app-store/public/api/swagger/payment/v1.0.0/adminPublisher/admin',
      url: this.fullSwaggerURL,
      spec: '',
      domNode: this.container.nativeElement.querySelector('.swagger-container'),
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl,
        () => {
          return {
            components: {
              Topbar: () => null,
              Info: () => null
            }
          };
        }
      ],
      requestInterceptor: function (request) {
        //Intercept the request and inject Bearer token
        var authorizationHeader = 'Authorization';
        var key = event;
        if (key && key.trim() != "") {
          request.headers[authorizationHeader] = "Bearer " + key;
        } else {
          request.headers[authorizationHeader] = "Bearer ";
        }
        return request;
      },
      responseInterceptor: function (resp) {
        if ((resp.status == '200') && !(resp.body.swagger)) {
          component.openPOPUP(resp.body);
        }
        return resp;
      },
      docExpansion: 'list',
      jsonEditor: true,
      defaultModelRendering: 'schema',
      showRequestHeaders: true,
      layout: 'StandaloneLayout',
      deepLinking: true,
      showExtensions: true,
      showCommonExtensions: true,
      sorter: "alpha",
    });
  }

  swaggerUiOperation() {
    const component = this;
    jQuery.noConflict();
    jQuery(document).ready(function () {
      setTimeout(function () {
        jQuery('.opblock-summary').click(function () {
          var $opBlockSummary = jQuery(this);
          setTimeout(function () {
            var $tryIt = $opBlockSummary.closest('.opblock').find('.try-out__btn');
            if (!$tryIt.hasClass('cancel')) {
              $tryIt.click();
            }
          },
            100);

        });

      },
        1500);
    });
  }


  openPOPUP(param) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Response Filtering",
        message:
          'Do you want to filter the Response?'
      }
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const dialogRef = this.dialog.open(ApiResponseFilterComponent, {
          width: '700px',
          data: param
        });
        dialogRef.afterClosed().subscribe(result => {
          this.response = result;
        });
      }
    });
  }

  mapAppName(id) {
    if (this.appResult.length > 0) {
      let app = this.appResult.find(itm => itm.applicationId == id);
      return app.name
    }
    else return "";
  }



}
