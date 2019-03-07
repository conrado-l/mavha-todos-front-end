import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.scss']
})
export class RoundButtonComponent implements OnInit {

  classes: string;
  @Output() buttonClicked = new EventEmitter();
  @Input() icon: string;
  @Input() title: string;
  @Input() size: string;
  @Input() backgroundColor: string;

  constructor() {
  }

  ngOnInit() {
    this.classes = `${this.size} ${this.backgroundColor}`; // TODO: investigate more about ngClass and className array
  }

  // Tell the parent the button was clicked
  public clicked(): void {
    this.buttonClicked.emit();
  }

}
