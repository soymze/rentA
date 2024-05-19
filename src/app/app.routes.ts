import { Routes} from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CarsComponent } from './pages/cars/cars.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { Detail1Component } from './pages/detail1/detail1.component';
import { Detail2Component } from './pages/detail2/detail2.component';
import { Detail3Component } from './pages/detail3/detail3.component';
import { PersonaldataComponent } from './pages/personaldata/personaldata.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ArticleComponent } from './pages/article/article.component';


export const routes: Routes = [
    {path: '', component: ArticleComponent},
    {path: '', children:[
        {path: 'detail1', component: Detail1Component},
        {path: 'detail2', component: Detail2Component},
        {path: 'detail3', component: Detail3Component},
    ]
},
    {path: 'about', component: AboutComponent},
    {path: 'cars', component: CarsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'cookies', component: CookiesComponent},
    {path: 'customers', component: CustomersComponent},
    {path: 'detail1', component: Detail1Component},
    {path: 'detail2', component: Detail2Component},
    {path: 'detail3', component: Detail3Component},
    {path: 'personaldata', component: PersonaldataComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'detail1', component: Detail1Component},
    {path: 'detail2', component: Detail2Component},
    {path: 'detail3', component: Detail3Component}
];


