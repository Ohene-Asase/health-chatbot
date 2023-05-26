import {Component, ElementRef, ViewChild} from '@angular/core';
import { ChatService } from './chat.service';
// import {ChatService} from "./chat-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
answer: any;
  constructor(private chatService: ChatService) {
  }

  @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;
  chatInputMessage: string = "";
  human = {
    id: 1,
    profileImageUrl: 'https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png'
  }

  ngOnInit() {

  }

  bot = {
    id: 2,
    profileImageUrl: 'https://media.istockphoto.com/photos/3d-illustration-of-virtual-human-on-technology-background-picture-id1181533674?s=612x612'
  }

  chatMessages: {
    user: any,
    message: string
  }[] = [
    
    {
      user: this.bot,
      message: "hi, I'm an AI. You can start any conversation..."
    },
  ];

  title = 'frontend';

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  send() {
    this.chatMessages.push({
      message: this.chatInputMessage,
      user: this.human
    });
    this.chatService.getResponse(this.chatInputMessage).subscribe(data => {
      console.log(data);
      this.receive(data);
    });
    this.chatInputMessage = ""
    this.scrollToBottom()
  }

  receive(response: any) {
    // console.log(response)
    this.chatMessages.push({
      message: response.answer,
      user: this.bot
    });
    this.scrollToBottom()
  }

  setConversation(conversation: any) {
    for (let i = 0; i < conversation.length; i++) {
      if (i % 2 === 0) {
        this.chatMessages.push({
          message: conversation[i],
          user: this.human
        });
      } else {
        this.chatMessages.push({
          message: conversation[i],
          user: this.bot
        });
      }
    }
  }

  scrollToBottom() {
    const maxScroll = this.list?.nativeElement.scrollHeight;
    this.list?.nativeElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }

  generateFakeId(): string {
    const current = new Date();
    const timestamp = current.getTime();
    return timestamp.toString()
  }

  clearConversation() {
    localStorage.removeItem('fakeUserId')
    localStorage.setItem('fakeUserId', this.generateFakeId())
    // this.chatService.deleteConversation()
    this.chatMessages = [
      {
        user: this.bot,
        message: "hi, I'm an AI. You can start any conversation..."
      },
    ];
  }
}
