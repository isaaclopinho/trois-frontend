



import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResultsComponent } from './results/results.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth/auth.guard';
import { Auth2Guard } from './auth/auth2.guard';


import {PerfilComponent} from './pages/perfil/perfil.component';
import {PagamentoComponent} from './pages/pagamento/pagamento.component';
import { from } from 'rxjs';
const routes: Routes = [
    { path: '', redirectTo:'/auth', pathMatch: 'full'},
    { path: 'auth', canActivate: [Auth2Guard], component: LoginComponent },
    { path: 'cadastro', canActivate: [Auth2Guard], component: CadastroComponent},
    { path: 'passagens',canActivate: [AuthGuard], component: ResultsComponent}, 
    { path: 'pesquisa', canActivate: [AuthGuard], component: PesquisaComponent },
    { path: 'perfil', canActivate: [AuthGuard], component: PerfilComponent },
    { path: '**', redirectTo: '/auth'},
    

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
