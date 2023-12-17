import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { catchError } from 'rxjs';
import { CatchErrorService } from 'src/app/services/catch-error.service';
import { environment } from 'src/enviroment/enviroment';

import { IBotResponse } from 'src/app/models/ServiceModels';

@Component({
    selector: 'app-bot',
    templateUrl: './bot.component.html',
    styleUrls: ['./bot.component.scss'],
})
export class BotComponent {
    constructor(
        private render: Renderer2,
        private http: HttpClient,
        private catchErrorService: CatchErrorService,
        private captchaService: ReCaptchaV3Service,
    ) {}
    @ViewChild('InputForFocus') InputForFocus!: ElementRef<HTMLInputElement>;
    @HostListener('window:keydown', ['$event'])
    handleHotkey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.InputForFocus.nativeElement.blur();
            event.preventDefault();
        }
        if (event.key === 'k' && event.ctrlKey == true) {
            console.log(this.InputForFocus.nativeElement.focus());
            event.preventDefault();
        }
    }
    input?: string;
    public addBotMessage(message: string) {
        const scrollBlock = document.getElementById('scrollBlock');
        const fieldWithMessages = document.getElementById('messagesField');
        const botMessageWrapper = this.render.createElement('div');
        this.render.addClass(botMessageWrapper, 'botMessageWrapper');
        const text = this.render.createText(message);
        const botMessage = this.render.createElement('div');
        this.render.addClass(botMessage, 'botMessage');
        this.render.appendChild(botMessage, text);
        this.render.appendChild(botMessageWrapper, botMessage);
        this.render.appendChild(fieldWithMessages, botMessageWrapper);
        scrollBlock?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    public addUserMessage(defaultQuestion?: string) {
        let message: string = '';
        if (defaultQuestion) message = defaultQuestion;
        else if (this.input) message = this.input;
        else if (!message) return;
        this.captchaService.execute('bot').subscribe((captchaToken: string) => {
            this.http
                .post<IBotResponse>(environment.serverPath + 'sendMessageToBot', {
                    userMessage: message,
                    captchaToken,
                })
                .pipe(catchError(this.catchErrorService.catchErrorHandler))
                .subscribe(resp => {
                    console.log(resp);
                    this.addBotMessage(resp.answerText);
                });
        });
        const scrollBlock = document.getElementById('scrollBlock');
        const fieldWithMessages = document.getElementById('messagesField');
        const userMessageWrapper = this.render.createElement('div');
        this.render.addClass(userMessageWrapper, 'userMessageWrapper');
        const text = this.render.createText(message);
        const userMessage = this.render.createElement('span');
        this.render.addClass(userMessage, 'userMessage');
        this.render.appendChild(userMessage, text);
        this.render.appendChild(userMessageWrapper, userMessage);
        this.render.appendChild(fieldWithMessages, userMessageWrapper);
        this.input = '';
        scrollBlock?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}
