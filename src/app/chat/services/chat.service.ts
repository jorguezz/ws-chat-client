import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = environment.socketUrl;
  private socket;

  connect() {
    const observable = new Observable(observer => {
      this.socket = window['io'](this.url);
      this.socket.on('connect', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getUsers() {
    const observable = new Observable(observer => {
      this.socket.emit('get:users');

      this.socket.on('users', (users: Array<any>) => {
        console.log('users', users);
        observer.next(users);
      });

    });
    return observable;
  }

  sendMessage(message) {
    this.socket.emit('user:message', message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.emit('get:messages');

      this.socket.on('messages', (messages: Array<any>) => {
        console.log('users', messages);
        observer.next(messages);
      });

    });
    return observable;
  }

  userNameChanged() {
    const observable = new Observable(observer => {
      this.socket.on('username:changed', (changes: {messages: any, users: any}) => {
        console.log('changes', changes);
        observer.next(changes);
      });
    });
    return observable;
  }


  setUserName(username) {
    this.socket.emit('set:username', username);
  }

  getMessage() {
    const observable = new Observable(observer => {
      this.socket.on('user:message', (message) => {
        console.log('message', message);
        observer.next(message);
      });
    });
    return observable;
  }

  userIsTyping() {
    const observable = new Observable(observer => {
      this.socket.on('user:is:typing', (user) => {
        console.log('is typing', user);
        observer.next(user);
      });
    });
    return observable;
  }

  userStopTyping() {
    const observable = new Observable(observer => {
      this.socket.on('user:stop:typing', (user) => {
        console.log('stop typing', user);
        observer.next(user);
      });
    });
    return observable;
  }

  sendTyping() {
    this.socket.emit('is:typing');
  }

  sendStopTyping() {
    this.socket.emit('stop:typing');
  }

  getSocketId() {
    return this.socket.id;
  }

  disconnect() {
    this.socket.disconnect();
  }


  constructor() { }
}
