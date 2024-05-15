import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { ArticleComponent } from "./components/article/article.component";
import { FooterComponent } from "./components/footer/footer.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, ArticleComponent, FooterComponent]
})
export class AppComponent {
  title = 'rentA';
}
