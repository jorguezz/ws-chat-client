import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEditModalComponent } from '../../components/user-edit-modal/user-edit-modal.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './app-chat.component.html',
  styleUrls: ['./app-chat.component.scss']
})
export class AppChatComponent implements OnInit, OnDestroy {
  connectionSub: Subscription;
  users: Array<any> = [];
  messages: Array<any> = [];
  me: any;
  isTyping: boolean;
  modalInstance: UserEditModalComponent;

  isTypingSub: Subscription;
  stopTypingSub: Subscription;
  messageSub: Subscription;
  userNameChangedSub: Subscription;
  getUsersSub: Subscription;
  getMessagesSub: Subscription;

  constructor(private modal: NgbModal, private chatService: ChatService) {}

  ngOnInit() {

    this.connectionSub = this.chatService.connect().subscribe(() => {
      this.openEditModal();

      this.getUsersSub = this.chatService.getUsers()
      .subscribe((users: Array<any>) => {
        this.me = users.find((user) => user.id === this.chatService.getSocketId());
        this.users = users;
      });

      this.getMessagesSub = this.chatService.getMessages()
      .subscribe((messages: Array<any>) => {
        this.messages = messages;
      });

      this.userNameChangedSub = this.chatService.userNameChanged()
      .subscribe((changes: {messages: any, users: any}) => {
        this.messages = changes.messages;
        this.users = changes.users;
        this.me = this.users.find((user) => user.id === this.chatService.getSocketId());
      });

      this.messageSub = this.chatService.getMessage()
      .subscribe((message) => {
        this.messages.push(message);
      });

      this.isTypingSub = this.chatService.userIsTyping()
      .subscribe((user: {id: any, userName: any}) => {
        const userIndex = this.users.findIndex(_user => user.id === _user.id);
        this.users[userIndex].typing = true;
      });

      this.stopTypingSub = this.chatService.userStopTyping()
      .subscribe((user: {id: any, userName: any}) => {
        const userIndex = this.users.findIndex(_user => user.id === _user.id);
        this.users[userIndex].typing = false;
      });

    });

  }

  private sendMessage(message) {
    const user = this.users.find(_user => _user.id === this.chatService.getSocketId());

    this.messages.push({
      userId: user.id,
      userName: user.userName,
      userAvatar: user.avatar,
      message: message,
      createdAt: Date.now()
    });
    this.messages = this.messages.slice();
  }

  private editUsername() {
    this.openEditModal();
  }

  // Remove subscriptions
  private openEditModal() {
    // open modal
    const modalRef = this.modal.open(UserEditModalComponent);
    this.modalInstance = modalRef.componentInstance;
    this.modalInstance.currentUser = this.me;
    this.modalInstance.saveUsername.subscribe((username) => {
      this.chatService.setUserName(username);
      this.modal.dismissAll();
    });

    this.modalInstance.closeModal.subscribe(() => {
      console.log('close modal');
      this.modal.dismissAll();
    });
  }

  ngOnDestroy() {
    this.chatService.disconnect();
    this.connectionSub.unsubscribe();
    this.isTypingSub.unsubscribe();
    this.stopTypingSub.unsubscribe();
    this.messageSub.unsubscribe();
    this.getUsersSub.unsubscribe();
    this.userNameChangedSub.unsubscribe();
    this.getMessagesSub.unsubscribe();
  }

}
