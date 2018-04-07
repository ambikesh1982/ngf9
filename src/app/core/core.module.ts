import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { DialogService } from './dialog.service';
import { ScriptLoadService } from './script-load.service';
import { GeolocationService } from './geolocation.service';
import { RouterService } from './router.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    DialogService,
    ScriptLoadService,
    GeolocationService,
    RouterService]
})
export class CoreModule { }
