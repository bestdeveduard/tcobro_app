import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'myprofile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../myprofile/myprofile.module').then(m => m.MyprofilePageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../account/account.module').then(m => m.AccountPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'route-view',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/route-view/route-view.module').then(m => m.RouteViewPageModule)
          }
        ]
      },
      {
        path: 'general-loanview',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/general-loanview/general-loanview.module').then(m => m.GeneralLoanviewPageModule)
          }
        ]
      },
      {
        path: 'payment-receipt',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/payment-receipt/payment-receipt.module').then(m => m.PaymentReceiptPageModule)
          }
        ]
      },
      {
        path: 'payment-form',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/payment-form/payment-form.module').then(m => m.PaymentFormPageModule)
          }
        ]
      },
      {
        path: 'customer-report',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/customer-report/customer-report.module').then(m => m.CustomerReportPageModule)
          }
        ]
      },
      {
        path: 'general-customer',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/general-customer/general-customer.module').then(m => m.GeneralCustomerPageModule)
          }
        ]
      },
      {
        path: 'customer-form',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/customer-form/customer-form.module').then(m => m.CustomerFormPageModule)
          }
        ]
      },
      {
        path: 'loan-form',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/loan-form/loan-form.module').then(m => m.LoanFormPageModule)
          }
        ]
      },
      {
        path: 'menu-view',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/menu-view/menu-view.module').then(m => m.MenuViewPageModule)
          }
        ]
      },
      {
        path: 'change-route',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/change-route/change-route.module').then(m => m.ChangeRoutePageModule)
          }
        ]
      },
      {
        path: 'change-lang',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/change-lang/change-lang.module').then(m => m.ChangeLangPageModule)
          }
        ]
      },
      {
        path: 'list-report',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-report/list-report.module').then(m => m.ListReportPageModule)
          }
        ]
      },
      {
        path: 'general-report',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/general-report/general-report.module').then(m => m.GeneralReportPageModule)
          }
        ]
      },
      {
        path: 'calculator-form',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/calculator-form/calculator-form.module').then(m => m.CalculatorFormPageModule)
          }
        ]
      },
      {
        path: 'show-map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/show-map/show-map.module').then(m => m.ShowMapPageModule)
          }
        ]
      },
      {
        path: 'loan-report',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/loan-report/loan-report.module').then(m => m.LoanReportPageModule)
          }
        ]
      },
      {
        path: 'print-setting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/print-setting/print-setting.module').then(m => m.PrintSettingPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
