import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormComponent } from '../form/form.component';
import { StorageService } from '../../_services/storage-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showMessage: boolean = true;
  tasks: string[] = [];

  constructor(private storage: StorageService){
    const task = this.storage.getAll();
    if (task !== null) {
      this.tasks = task;
    }
  }

   hideMessage() {
    this.showMessage = false;
  }

  clear():void {
    this.storage.clear();
  }
}