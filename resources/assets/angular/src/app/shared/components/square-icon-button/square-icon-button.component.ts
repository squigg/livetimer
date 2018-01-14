import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-square-icon-button',
    templateUrl: './square-icon-button.component.html',
    styleUrls: ['./square-icon-button.component.scss']
})
export class SquareIconButtonComponent {

    @Input() icon: string;

}
