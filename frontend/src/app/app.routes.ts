import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WizardLayoutComponent } from './layouts/wizard-layout.component';
import { ImportComponent } from './form/import/import.component';
import { EditComponent } from './form/edit/edit.component';
import { TitleStyleComponent } from './form/title-style/title-style.component';
import { ExportComponent } from './form/export/export.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'form',
        component: WizardLayoutComponent,
        children: [
            { path: 'import', component: ImportComponent },
            { path: 'edit', component: EditComponent },
            { path: 'style', component: TitleStyleComponent },
            { path: 'export', component: ExportComponent },
        ]
    }
];
