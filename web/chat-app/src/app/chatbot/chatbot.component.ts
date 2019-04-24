  import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
// import { ChatService } from '../chat.service';
import { SocketDataService } from '../websocket.service';
import { stringify } from '@angular/core/src/render3/util';
import { Observable, Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { ArrayType } from '@angular/compiler';



@Component({
  moduleId: module.id,
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent implements OnInit {
  
  username: "olivia";
  messages: Subject<any>;
  messages1: Subject<any>;
  str: string;
  str1: string;
  audio: any;
  msgcontainer : HTMLElement;
  
  date= new Date().toLocaleString(undefined, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  
  
  socket: SocketIOClient.Socket;
  
  chatArray: string[]=new Array()
  sub: Subscription;
  // chatbotResponseArray: string[] = new Array()
 
 
  
  constructor(private socketDataService: SocketDataService) {}

    ngOnInit() {
      this.getSocketData();
    }

    getSocketData(): void {
    this.sub = this.socketDataService.getSocketData()
      .subscribe(data => {
        console.log("*-*-*-*-*-", data);
        //this.chatbotResponseArray.push(data.chat_res.reply_text);
        
        this.chatArray.push(data.chat_res.reply_text);
        this.ngAfterViewInit(); 
        if (this.chatArray.includes("$")){
          
        }   
        console.log(this.chatArray)
    })
  }

  sendMessage() {
    var message_obj = {
      "name" : {
              "first_name": "",
              "middle_name": "",
              "last_name": "",
              "mob": ""
      },
      "identifier":{
              "user_id": "",
              "session_id": "",
              "location": "",
              "channel_id": "",
              "group_id": "",
              "team_id": "",
              "email_id":"",
              "user_specified_id":{
                  "userdata": "" }
      },
      "time":{
              "time_zone": ""
      },
      "chat_req": {
              "message_id": "",
              "chat_text": this.str,
              "chat_type": "message",
              "chat_timestamp": ""
      },
      "chat_res":{
              "reply_id": "",
              "reply_text": "",
              "reply_timestamp": "",
              "additional_param":{
              },
              "reply_action": ""
      },
      "channel": ""
    }

    
    this.socketDataService.sendMessage(message_obj)
    

    console.log("chat msg",this.str);
    this.chatArray.push(this.str);
    
    
    this.str="";
    
  }
  test() {
    document.getElementById("chatwindow").className = "chat-popup-testmodule";
    document.getElementById("chat-container").className = "container-testmodule clearfix";
    document.getElementById("chat-box").className = "chat-testmodule";
    
  }
  testfinish() {
    document.getElementById("chatwindow").className = "chat-popup";
    document.getElementById("chat-container").className = "container clearfix";
    document.getElementById("chat-box").className = "chat";
    
  }
  openchat() {
    document.getElementById("chatwindow").style.display = "block";
    this.ngAfterViewInit();
  }
  closechat() {
    document.getElementById("chatwindow").style.display = "none";
  }

  playAudio(){
  // this.audio = new Audio();
  // this.audio.src = "/opensound.mp3";
  // this.audio.load();
  // this.audio.play();
  // let audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
  // let audio=new Audio("./web/opensound.mp3");
  // audio.load();
  // audio.play();
  
  }
  //Auto scroll down function
  ngAfterViewInit(){

    this.msgcontainer = document.getElementById("msgbox");
    this.msgcontainer.scrollTop = this.msgcontainer.scrollHeight;
  }      
}