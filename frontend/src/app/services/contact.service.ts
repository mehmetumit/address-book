import { Injectable } from '@angular/core';
import { ContactQuery } from '../models/contact.query';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    constructor(private http: HttpClient) {}
    findContacts(contactQuery: ContactQuery) {
        return this.http.get(environment.api.url + '/contacts');
    }
    deleteContactById(id: string) {
        return this.http.delete(environment.api.url + '/contacts/' + id);
    }
    updateContactById(id: string) {}
    createContact(contactData: ContactQuery) {}
}
