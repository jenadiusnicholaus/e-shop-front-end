import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], ...terms: string[]): any[] {
    if (!items) return [];
    if (!terms.length) return items;

    return items.filter((item) => {
      console.log(" from custom filter");
      console.log(item);
      // Modify this condition to match your data structure
      return terms.every((term) => item.property.includes(term));
    });
  }
}
