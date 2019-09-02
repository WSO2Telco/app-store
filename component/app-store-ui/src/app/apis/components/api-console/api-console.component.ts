import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from '@angular/core';

import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { ApiEndpoints } from '../../../config/api.endpoints';

@Component({
  selector: 'store-api-console',
  templateUrl: './api-console.component.html',
  styleUrls: ['./api-console.component.scss']
})
export class ApiConsoleComponent implements OnInit, AfterViewInit {
  @ViewChild('swagger', { static: true }) container: ElementRef;
  @Input() public apiId: string;
  public api;
  apiPrefix = ApiEndpoints.apiContext;
  constructor(private store: Store<AppState>, ) { }

  ngOnInit() {
    this.store.select((s) => s.apis.selectedApiOverview)
      .subscribe((overview) => {
        this.api = overview;
      });
  }

  ngAfterViewInit() {
    console.log(this.api.apiDefinition);
    const ui = SwaggerUIBundle({
      // url: this.apiPrefix + '/apis/' + this.apiId + '/swagger',
      spec : JSON.parse(this.api.apiDefinition),
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
      docExpansion: 'none',
      jsonEditor: false,
      defaultModelRendering: 'schema',
      showRequestHeaders: true,
      layout: 'StandaloneLayout'
    });
  }
}
