import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResultsComponent } from './results/results.component';
import { PageTestComponent } from './page-test/page-test.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { GuardTestComponent } from './guard-test/guard-test.component';
import { Auth2Guard } from './auth/auth2.guard';

const routes: Routes = [
    { path: '', redirectTo:'/passagens', pathMatch: 'full'},
    {path: 'cadastro', canActivate: [Auth2Guard], component: CadastroComponent},
    { path: 'passagens', component: ResultsComponent },
    { path: 'pesquisa', component: PesquisaComponent },
    { path: 'teste', component: PageTestComponent },
    { path: 'teste2', canActivate: [AuthGuard], component: GuardTestComponent },
    { path: 'auth', canActivate: [Auth2Guard], component: LoginComponent },

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
