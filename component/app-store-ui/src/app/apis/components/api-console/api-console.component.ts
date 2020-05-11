import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { GetUserSubscriptionsSuccessAction } from '../../apis.actions';
import { ApiOverview } from '../../apis.models';
import * as jQuery from "jquery";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../commons/components/confirm-dialog/confirm-dialog.component';
import { ApiResponseFilterComponent } from '../api-response-filter/api-response-filter.component';
import { ApplicationDetailsKeys } from '../../../applications/applications.data.models';
import { AppState } from '../../apis.reducers';
import { ApisService } from '../../apis.service';

const baseUrl = new URL(window.location.href);
const swaggerApiContext = baseUrl.protocol + '//' + baseUrl.host + '/app-store/public/api/swagger';

@Component({
  selector: 'store-api-console',
  templateUrl: './api-console.component.html',
  styleUrls: ['./api-console.component.scss']
})
export class ApiConsoleComponent implements OnInit {
  @Input() public apiOverview: ApiOverview;
  @Input() public subscriptionList;
  @Input() public loadingSubscriptions;

  @ViewChild('swagger', { static: true }) container: ElementRef;
  private apiSubscription;
  response: string;
  appResult;
  listOfEnv = [{ name: 'Production', val: 'PRODUCTION' }, { name: 'Sandbox', val: 'SANDBOX' }]
  selectedEnv: string;
  selectedApp: string = null;
  public loggedUser: string;
  fullSwaggerURL: string;
  partialSwaggerURL: string;

  private storeSelect;
  private storeSelectApp;
  private keyArray: ApplicationDetailsKeys[];
  public keyObject: ApplicationDetailsKeys;
  public accessToken;

  constructor(
    private actions$: Actions,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef,
    private apiSvc: ApisService
  ) { }

  ngOnInit() {
    let logUser = this.store.select((s) => s.authentication.loggedUser)
      .subscribe((user) => {
        this.loggedUser = user;
      });

    this.store
      .select(s => s.apis.availableApp)
      .subscribe(apps => {
        this.appResult = apps.list;
        this.appResult = (this.appResult != null) ? this.appResult.filter(appArr => appArr.status == "APPROVED") : [];
      });

    // this.store
    //   .select(s => s.apis.subscriptionDetails)
    //   .subscribe(subscriptions => {
    //     this.subscriptionList = (subscriptions != null) ? subscriptions.list : [];
    //     this.cd.detectChanges();
    //   });

    this.partialSwaggerURL = swaggerApiContext + '/' + this.apiOverview.name + '/' + this.apiOverview.version + '/' + this.apiOverview.provider;
    const ui = SwaggerUIBundle({
      spec: JSON.parse(this.apiOverview.apiDefinition),
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
      deepLinking: false,
      showExtensions: true,
      showCommonExtensions: true,
      sorter: "alpha",
    });
    this.swaggerUiOperation();
  }

  ngOnDestroy(): void {
    // this.apiSubscription.unsubscribe();
  }

  onAppChange() {
    this.accessToken = null;
    this.selectedEnv = null;
    this.keyArray = null;
    this.apiSvc.getSelectedAppDetails(this.selectedApp).subscribe(resp => {
      this.fullSwaggerURL = this.partialSwaggerURL + '/' + resp.subscriber;
      this.keyArray = resp.keys;
    });
    this.reInitiateSwagger(this.accessToken)
  }


  retrieveEnvKeyObject() {
    this.keyObject = this.keyArray.find(i => i.keyType == this.selectedEnv);
    if (this.keyObject) {
      this.accessToken = this.keyObject.token.accessToken;

    } else {
      this.accessToken = null;
    }
    this.reInitiateSwagger(this.accessToken)
  }

  reInitiateSwagger(event) {
    const component = this;
    this.swaggerUiOperation();
    const ui = SwaggerUIBundle({
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
        if (((resp.status == '200') || (resp.status == '201') || (resp.status == '202') || (resp.status == '204')) && !(resp.body.swagger)) {
          component.openPOPUP(resp.body);
        }
        return resp;
      },
      docExpansion: 'list',
      jsonEditor: true,
      defaultModelRendering: 'schema',
      showRequestHeaders: true,
      layout: 'StandaloneLayout',
      deepLinking: false,
      showExtensions: true,
      showCommonExtensions: true,
      sorter: "alpha",
    });
  }

  swaggerUiOperation() {
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
