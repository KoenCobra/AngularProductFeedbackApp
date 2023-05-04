import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() btnText: string = '';
  @Input() btnIcon: string = '';
  @Input() btnClass: string = '';
  @Input() targetRoute: string = '';
  @Output() btnClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  onButtonClick() {
    if (this.targetRoute) {
      this.router.navigateByUrl(this.targetRoute);
    } else {
      this.btnClick.emit();
    }
  }
}
