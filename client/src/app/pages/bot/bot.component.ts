import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
    selector: 'app-bot',
    templateUrl: './bot.component.html',
    styleUrls: ['./bot.component.scss'],
})
export class BotComponent {
    constructor(private render: Renderer2) {}
    input?: HTMLInputElement;
    public addBotMessage(message: string) {
        const field = document.getElementById('messagesField');

        const botMessageWrapper = this.render.createElement('div');
        this.render.addClass(botMessageWrapper, 'botMessageWrapper');
        const text = this.render.createText(message);
        const botMessage = this.render.createElement('span');
        this.render.addClass(botMessage, 'botMessage');
        this.render.appendChild(botMessage, text);
        this.render.appendChild(botMessageWrapper, botMessage);
        this.render.appendChild(field, botMessageWrapper);
        field?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    public addUserMessage(input: HTMLInputElement) {
        if (!input.value) return;
        const field = document.getElementById('messagesField');
        const userMessageWrapper = this.render.createElement('div');
        this.render.addClass(userMessageWrapper, 'userMessageWrapper');
        const text = this.render.createText(input.value);
        const userMessage = this.render.createElement('span');
        this.render.addClass(userMessage, 'userMessage');
        this.render.appendChild(userMessage, text);
        this.render.appendChild(userMessageWrapper, userMessage);
        this.render.appendChild(field, userMessageWrapper);
        field?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        input.value = '';
    }
}
