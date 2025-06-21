import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'noBreak',
  standalone: true
})
export class NoBreakPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    
    // Replace text wrapped in square brackets with non-breaking spans
    // Example: "This is [a phrase] that won't break" 
    // Becomes: "This is <span class="no-break">a phrase</span> that won't break"
    const processedText = value.replace(
      /\[([^\]]+)\]/g, 
      '<span class="no-break">$1</span>'
    );
    
    return this.sanitizer.bypassSecurityTrustHtml(processedText);
  }
} 