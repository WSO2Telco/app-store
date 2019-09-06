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
  public api;

  constructor(private store: Store<AppState>, ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.store.select((s) => s.apis.selectedApi)
    .subscribe((overview) => {
      let api = overview;

      const ui = SwaggerUIBundle({
        spec : JSON.parse(api.apiDefinition),
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
        docExpansion: 'list',
        jsonEditor: false,
        defaultModelRendering: 'schema',
        showRequestHeaders: true,
        layout: 'StandaloneLayout'
      });
    });    
  }
}
