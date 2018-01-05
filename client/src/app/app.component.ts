import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { fadeInAnimation } from 'app/shared/animations/fade-in.animation';
import { ConfigService } from 'app/shared/config.service';
import { ToastsManager } from 'ng2-toastr';
import { UserService } from 'app/auth/user/user.service';
import { LoadingService } from 'app/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInAnimation]
})
export class AppComponent implements OnInit {
  config = {
    showHeader: true,
    showNavbar: true,
    showFooter: true
  }
  constructor(private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef, public userService: UserService, public loadingService: LoadingService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
      // this.toastr.success("App initiated", "Yay!");

      this.configService.isCustomerView()
        .subscribe((status) => {
          this.config = {
            showFooter: !status,
            showHeader: !status,
            showNavbar: !status
          }
        }); 
  }

}
