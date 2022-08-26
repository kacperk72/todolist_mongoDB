import { Component } from '@angular/core';

export interface TaskElement {
  id: string;
  title: string;
  status: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

}
