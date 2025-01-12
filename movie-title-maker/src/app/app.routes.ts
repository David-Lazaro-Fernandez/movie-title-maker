import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExportComponent } from './form/export/export.component';
import { TitleStyleComponent } from './form/title-style/title-style.component';
import { ImportComponent } from './form/import/import.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'movie/import',
        component: ImportComponent
    },
    {
        path:'movie/title-style',
        component: TitleStyleComponent
    },
    {
        path:'movie/export',
        component: ExportComponent
    }
];
