import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContactQuery } from '../models/contact.query';
import { ContactService } from '../services/contact.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-contact',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './new-contact.component.html',
    styleUrl: './new-contact.component.css',
})
export class NewContactComponent {
    contact: ContactQuery = {};
    contactForm: any = {};
    contactService = inject(ContactService);
    constructor(private router: Router) {
        this.contactForm.name = new FormControl();
        this.contactForm.phone = new FormControl();
        this.contactForm.address = new FormControl();
        this.contactForm.email = new FormControl();
        this.contactForm.mobilePhone = new FormControl();
    }
    newContact() {
        if (this.contactForm.name.value) {
            this.contact.name = this.contactForm.name.value;
        }
        if (this.contactForm.mobilePhone.value) {
            this.contact.mobilePhone = this.contactForm.mobilePhone.value;
        }
        if (this.contactForm.address.value) {
            this.contact.address = this.contactForm.address.value;
        }
        if (this.contactForm.email.value) {
            this.contact.email = this.contactForm.email.value;
        }
        if (this.contactForm.phone.value) {
            this.contact.phone = this.contactForm.phone.value;
        }

        this.contactService.createContact(this.contact).subscribe(
            (data) => {
                this.router.navigate(['/']);
            },
            (err) => {
                alert(err.error.message);
            }
        );
    }
}
