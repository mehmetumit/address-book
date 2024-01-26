import { Component, inject, OnInit } from '@angular/core';
import { ContactBoxComponent } from '../contact-box/contact-box.component';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [ContactBoxComponent, RouterOutlet, RouterLink, RouterLinkActive, ],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
    contacts: Contact[] = [];
    contactService = inject(ContactService);
    ngOnInit(): void {
        this.contactService.findContacts({}).subscribe((data: any) => {
            this.loadContacts(data);
        });
    }
    loadContacts(contacts: Contact[]) {
        this.contacts = contacts;
    }

    deleteContact(id: string) {
        this.contactService.deleteContactById(id).subscribe(() => {
            this.loadContacts(this.contacts.filter((el) => el.id !== id));
            console.log('Delete');
        });
    }
}
