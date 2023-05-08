import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() subLabel: string = '';
  @Input() maxLength: number = 0;
  @Input() control!: FormControl;
  @Input() inputType: string = '';
  @Input() placeholder: string = '';
  @Input() controlType!: 'input' | 'textarea';

  charactersLeft: number = 250;

  showErrors() {
    const {touched, errors} = this.control;
    return touched && errors;
  }

  onInputChange(event: Event) {
    this.charactersLeft = this.maxLength - (event.target as HTMLInputElement).value.length;
  }
}
