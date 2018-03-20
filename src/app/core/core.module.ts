import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { DialogService } from './dialog.service';
import { ScriptLoadService } from './script-load.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AuthGuard, CanDeactivateGuard, DialogService, ScriptLoadService]
})
export class CoreModule { }
