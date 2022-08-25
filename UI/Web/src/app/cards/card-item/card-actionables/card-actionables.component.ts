import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action, ActionItem } from 'src/app/_services/action-factory.service';

@Component({
  selector: 'app-card-actionables',
  templateUrl: './card-actionables.component.html',
  styleUrls: ['./card-actionables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardActionablesComponent implements OnInit {

  @Input() iconClass = 'fa-ellipsis-v';
  @Input() btnClass = '';
  @Input() actions: ActionItem<any>[] = [];
  @Input() labelBy = 'card';
  @Input() disabled: boolean = false;
  @Output() actionHandler = new EventEmitter<ActionItem<any>>();

  adminActions: ActionItem<any>[] = [];
  nonAdminActions: ActionItem<any>[] = [];

  get Action() {
    return Action;
  }

  constructor(private readonly cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.nonAdminActions = this.actions.filter(item => !item.requiresAdmin);
    this.adminActions = this.actions.filter(item => item.requiresAdmin);
    this.cdRef.markForCheck();
  }

  preventClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  performAction(event: any, action: ActionItem<any>) {
    if (typeof action.callback === 'function') {
      this.actionHandler.emit(action);
    }
  }

}
