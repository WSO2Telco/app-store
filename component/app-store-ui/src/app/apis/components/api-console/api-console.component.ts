import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from '@angular/core';

import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { ApiOverview, ApiSummery } from '../../apis.models';
import { ApiEndpoints } from '../../../config/api.endpoints';

@Component({
  selector: 'store-api-console',
  templateUrl: './api-console.component.html',
  styleUrls: ['./api-console.component.scss']
})
export class ApiConsoleComponent implements OnInit, AfterViewInit {
  @ViewChild('swagger', { static: true }) container: ElementRef;
  @Input() public apiId: string;
  apiPrefix = ApiEndpoints.apiContext;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ui = SwaggerUIBundle({
      url: this.apiPrefix + '/apis/' + this.apiId + '/swagger',
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
