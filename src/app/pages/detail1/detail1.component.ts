import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail1',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './detail1.component.html',
  styleUrl: './detail1.component.css'
})
export class Detail1Component {

}
