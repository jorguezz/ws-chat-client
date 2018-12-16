import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {
  @Output() saveUsername = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();
  @Input() currentUser;

  userNameInput: FormControl;

  constructor() { }

  ngOnInit() {
    this.userNameInput = new FormControl('');
  }

  private save() {
    if (this.userNameInput.value !== '') {
      console.log(this.userNameInput.value);
      this.saveUsername.emit(this.userNameInput.value);
      this.userNameInput.setValue('');
    }
  }

  private close() {
    this.closeModal.emit();
  }

}
