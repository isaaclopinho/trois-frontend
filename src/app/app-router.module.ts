import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResultsComponent } from './results/results.component';
import { PageTestComponent } from './page-test/page-test.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    { path: '', redirectTo:'/passagens', pathMatch: 'full'},

    { path: 'passagens', component: ResultsComponent },
    { path: 'teste', component: PageTestComponent },
    { path: 'auth', component: LoginComponent },
    { path: 'pesquisa', component: PesquisaComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
