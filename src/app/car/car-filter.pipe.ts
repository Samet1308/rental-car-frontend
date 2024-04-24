import { Pipe, PipeTransform } from '@angular/core';
import {Car} from "./car";

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: Car[], filterText: any): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;


    return filterText ? value.filter((c: Car) =>
      // @ts-ignore
      c.modelName.toLocaleLowerCase().includes(filterText) ||
      // @ts-ignore
      c.brandName.toLocaleLowerCase().includes(filterText)
    ) : value;
  }

}
