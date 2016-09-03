import { NgModule, ModuleWithProviders  }       from '@angular/core';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdCoreModule } from '@angular2-material/core';
import { MdInputModule } from '@angular2-material/input';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdListModule } from '@angular2-material/list';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';

@NgModule({     
    exports:      [
      MdButtonModule,
      MdCardModule,
      MdCheckboxModule,
      MdCoreModule,
      MdInputModule,
      MdProgressCircleModule,
      MdToolbarModule,
      MdSidenavModule,
      MdListModule,
      MdButtonToggleModule
    ]
})
export class MaterialModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: [
      ]
    };
  }

}
