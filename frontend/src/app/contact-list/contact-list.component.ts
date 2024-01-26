import { Component, inject, OnInit } from '@angular/core';
import { ContactBoxComponent } from '../contact-box/contact-box.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [ContactBoxComponent, HttpClientModule],
    templateUrl: './contact-list.component.html',
    styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
    httpClient = inject(HttpClient);
    data: [] = [];
    ngOnInit(): void {
      this.fetchData()
    }
    fetchData() {
        this.httpClient.get(environment.api.url + '/contacts').subscribe((data: any) => {
            console.log(data);
            this.data = data;
        });
    }
}
