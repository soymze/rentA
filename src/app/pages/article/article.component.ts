import { Component} from '@angular/core';
import { RouterModule} from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterModule,NgbCarouselModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {



}
