import { Component, OnChanges, Directive, Input, SimpleChanges } from '@angular/core';

const defaults: {
  color: 'primary' | 'danger';
  disabled: boolean;
  text: string;
} = {
  color: 'primary',
  disabled: false,
  text: '',
};

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges {

  @Input() color = defaults.color;
  @Input() disabled = defaults.disabled;
  @Input() text = defaults.text;

  ngOnChanges(changes: SimpleChanges): void {
      Object.keys(changes).map(propertyName => {
        if (changes[propertyName].currentValue === undefined) {
          this[propertyName] = defaults[propertyName];
        }
      });
  }
  get buttonClassNames(): string {
    let classes = '';
    if(this.disabled) {
      classes += ' button--disabled';
    }else if(this.color){
      classes += ' button--' + this.color;
    }
    return classes;
  }
}
