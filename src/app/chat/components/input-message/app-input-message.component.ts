import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { throttleTime } from 'rxjs/operators';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-input-message',
  templateUrl: './app-input-message.component.html',
  styleUrls: ['./app-input-message.component.scss']
})
export class AppInputMessageComponent implements OnInit, OnDestroy {
  @Output() sendMessage = new EventEmitter<any>();

  messageInput;
  messageInputSub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.messageInput = new FormControl('');

    this.messageInputSub = this.messageInput.valueChanges
    .pipe(throttleTime(500))
    .subscribe(() => {
      this.chatService.sendTyping();
      setTimeout(() => {
        this.chatService.sendStopTyping();
      }, 3000);
    });
  }

  submitMessage() {
    if (this.messageInput.value) {
      this.sendMessage.emit(this.messageInput.value);
      this.chatService.sendMessage(this.messageInput.value);
      this.chatService.sendStopTyping();
      this.messageInput.setValue('');
    }
  }

  ngOnDestroy() {
    this.messageInputSub.unsubscribe();
  }

}
