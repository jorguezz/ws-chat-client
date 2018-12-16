import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// Container
import { AppChatComponent } from './containers/app-chat/app-chat.component';

// Components
import { AppInputMessageComponent } from './components/input-message/app-input-message.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserMeComponent } from './components/user-me/user-me.component';
import { UserEditModalComponent } from './components/user-edit-modal/user-edit-modal.component';

@NgModule({
  declarations: [
    AppChatComponent,
    AppInputMessageComponent,
    MessageListComponent,
    UserListComponent,
    UserMeComponent,
    UserEditModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModalModule,
    FormsModule
  ],
  exports: [AppChatComponent],
  entryComponents: [UserEditModalComponent]

})
export class ChatModule { }
