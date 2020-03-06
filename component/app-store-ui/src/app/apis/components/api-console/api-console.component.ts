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
import { Actions, ofType } from '@ngrx/effects';
import { GetApiOverviewSuccessAction } from '../../apis.actions';

@Component({
  selector: 'store-api-console',
  templateUrl: './api-console.component.html',
  styleUrls: ['./api-console.component.scss']
})
export class ApiConsoleComponent implements OnInit {
  @ViewChild('swagger', { static: true }) container: ElementRef;
  private apiSubscription;

  constructor(
    private actions$: Actions
  ) { }

  ngOnInit() {
    this.apiSubscription = this.actions$.pipe(ofType(GetApiOverviewSuccessAction)).subscribe(resp => {
      if (resp) {
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
          docExpansion: 'list',
          jsonEditor: false,
          defaultModelRendering: 'schema',
          showRequestHeaders: true,
          layout: 'StandaloneLayout'
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
