import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
    selector: 'app-contact-box',
    standalone: true,
    imports: [],
    templateUrl: './contact-box.component.html',
    styleUrl: './contact-box.component.css',
})
export class ContactBoxComponent {
    @Input() contact: Contact = {
        id: 'e2527518-033c-49e2-a630-5f4a9af16ebc',
        name: 'Tim Cook',
        address: 'Los Angeles, CA',
        phone: '385957507783',
        email: 'tcook@apple.com',
        mobilePhone: '14089740100',
    };
    @Output() delete: EventEmitter<string> = new EventEmitter();
    @Output() update: EventEmitter<Contact> = new EventEmitter();
    deleteContact(id: string) {
        console.log(id);
        this.delete.emit(id);
    }
    updateContact(contact: Contact) {
        console.log('Update contact');
    }
    constructor() {}
}
