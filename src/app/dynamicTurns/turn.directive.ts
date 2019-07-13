import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[turn-host]',
})
export class TurnDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
