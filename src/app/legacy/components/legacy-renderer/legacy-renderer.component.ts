import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'store-legacy-renderer',
  templateUrl: './legacy-renderer.component.html',
  styleUrls: ['./legacy-renderer.component.scss']
})
export class LegacyRendererComponent implements OnInit {

  private url: SafeResourceUrl;
  private path: string;
  private legacyPath: string;


  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.path = params['legacyPath'];

      switch (this.path) {
        case 'apis': {
          this.legacyPath = '../store/site/pages/list-apis.jag';
          break;
        }

        case 'applications': {
          this.legacyPath = '../store/site/pages/applications.jag';
          break;
        }

        case 'forum': {
          this.legacyPath = '../store/forum';
          break;
        }

        case 'api-usage': {
          this.legacyPath = '../store/site/pages/statistics.jag?stat=perAppAPICount';
          break;
        }

        case 'top-users': {
          this.legacyPath = '../store/site/pages/statistics.jag?stat=topUsers';
          break;
        }

        case 'resource-usage': {
          this.legacyPath = '../store/site/pages/statistics.jag?stat=apiCallType';
          break;
        }

        case 'faults': {
          this.legacyPath = '../store/site/pages/statistics.jag?stat=faultCount';
          break;
        }

        case 'alerts': {
          this.legacyPath = '../store/site/pages/manage-alert-type.jag';
          break;
        }
      }

      if (!!this.legacyPath) {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.legacyPath);
      }

    });
  }

}
