import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakline',
  standalone: true,
})
export class BreaklinePipe implements PipeTransform {

  transform(value: string): string{
      return value.replace(/\n/g, '<br/>');
  }

}
