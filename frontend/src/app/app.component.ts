import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NavbarService} from "./services/navbar.service";
import {ErrorService} from "./errorHandler/error.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ErrorDialogComponent} from "./errorHandler/error-dialog/error-dialog.component";
import {ErrorDialogFormData} from "./errorHandler/error-dialog-form-data";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AngularApp1';

  public isAppNavVisible = true;       // The left nav starts out as visible
  public isUserNavVisible = false;    // The right nav starts out as not visible
  private showNavSubscription: Subscription;

  private errorSubscription: Subscription;
  private errorDialogIsOpen = false;
  private errorDialogRef: MatDialogRef<ErrorDialogComponent, any>;


  constructor(private navbarService: NavbarService,
              private errorService: ErrorService,
              private matDialog: MatDialog)
  { }


  public ngOnInit(): void {

    // This app-component will listen for messages from the navbarService
    this.showNavSubscription =
      this.navbarService.getNavbarStateAsObservable().subscribe((navbarState) => {
        // We received a message from the navbarService
        // -- Someone has toggled the one of the navbars

        // Set the public properties based on the navbarState properties returned
        this.isAppNavVisible = navbarState.isAppNavbarDisplayed;
        this.isUserNavVisible = navbarState.isUserNavbarDisplayed;
      });


    this.errorSubscription =
      this.errorService.getErrors().subscribe( (aError: HttpErrorResponse) => {
        // An error came in.  So, display the error in a popup

        // Create the form data object (to pass-in to the dialog box)
        let errorFormData: ErrorDialogFormData = new ErrorDialogFormData();
        errorFormData.error_text = aError.statusText;
        errorFormData.status_code = aError.status
        errorFormData.message = aError.error;      // NOTE:  Use aError.error here
        errorFormData.url = aError.url;

        if (this.errorDialogIsOpen) {
          // The error dialog is already open -- so close it
          this.errorDialogRef.close(false);
        }

        this.errorDialogIsOpen = true;

        // Open the Error Dialog
        // Do not set the height of dialog boxes.  Let them grow
        this.errorDialogRef = this.matDialog.open(ErrorDialogComponent, {
          minWidth: '400px',
          maxWidth: '800px',
          data: errorFormData
        });

        this.errorDialogRef.afterClosed().subscribe((formData: ErrorDialogFormData) => {
          // The error dialog box has closed
          this.errorDialogIsOpen = false;
        });

      });

  }


  public ngOnDestroy() {
    this.showNavSubscription.unsubscribe();

    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }

  }

}
