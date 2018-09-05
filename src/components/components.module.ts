import { NgModule } from '@angular/core';
import { GMapComponent } from './g-map/g-map';
import { FindDistanceComponent } from './find-distance/find-distance';
@NgModule({
	declarations: [GMapComponent,
    FindDistanceComponent],
	imports: [],
	exports: [GMapComponent,
    FindDistanceComponent]
})
export class ComponentsModule {}
