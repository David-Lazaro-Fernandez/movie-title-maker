import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExportComponent } from './form/export/export.component';
import { EditComponent } from './form/edit/edit.component';
import { ImportComponent } from './form/import/import.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'import',
        component: ImportComponent
    },
    {
        path:'edit',
        component: EditComponent
    },
    {
        path:'export',
        component: ExportComponent
    },
];
