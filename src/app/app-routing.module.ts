import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	//  {
  //   path: '',
  //   redirectTo: 'notification',
  //   pathMatch: 'full'
  // },	
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'route-view',
    loadChildren: () => import('./pages/route-view/route-view.module').then( m => m.RouteViewPageModule)
  },
  {
    path: 'general-loanview',
    loadChildren: () => import('./pages/general-loanview/general-loanview.module').then( m => m.GeneralLoanviewPageModule)
  },
  {
    path: 'payment-receipt',
    loadChildren: () => import('./pages/payment-receipt/payment-receipt.module').then( m => m.PaymentReceiptPageModule)
  },
  {
    path: 'payment-form',
    loadChildren: () => import('./pages/payment-form/payment-form.module').then( m => m.PaymentFormPageModule)
  },
  {
    path: 'customer-report',
    loadChildren: () => import('./pages/customer-report/customer-report.module').then( m => m.CustomerReportPageModule)
  },
  {
    path: 'general-customer',
    loadChildren: () => import('./pages/general-customer/general-customer.module').then( m => m.GeneralCustomerPageModule)
  },
  {
    path: 'customer-form',
    loadChildren: () => import('./pages/customer-form/customer-form.module').then( m => m.CustomerFormPageModule)
  },
  {
    path: 'loan-form',
    loadChildren: () => import('./pages/loan-form/loan-form.module').then( m => m.LoanFormPageModule)
  },
  {
    path: 'menu-view',
    loadChildren: () => import('./pages/menu-view/menu-view.module').then( m => m.MenuViewPageModule)
  },
  {
    path: 'change-route',
    loadChildren: () => import('./pages/change-route/change-route.module').then( m => m.ChangeRoutePageModule)
  },
  {
    path: 'change-lang',
    loadChildren: () => import('./pages/change-lang/change-lang.module').then( m => m.ChangeLangPageModule)
  },
  {
    path: 'list-report',
    loadChildren: () => import('./pages/list-report/list-report.module').then( m => m.ListReportPageModule)
  },
  {
    path: 'general-report',
    loadChildren: () => import('./pages/general-report/general-report.module').then( m => m.GeneralReportPageModule)
  },
  {
    path: 'calculator-form',
    loadChildren: () => import('./pages/calculator-form/calculator-form.module').then( m => m.CalculatorFormPageModule)
  },
  {
    path: 'show-map',
    loadChildren: () => import('./pages/show-map/show-map.module').then( m => m.ShowMapPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'loan-report',
    loadChildren: () => import('./pages/loan-report/loan-report.module').then( m => m.LoanReportPageModule)
  },  {
    path: 'print-setting',
    loadChildren: () => import('./pages/print-setting/print-setting.module').then( m => m.PrintSettingPageModule)
  },
  {
    path: 'printer-list',
    loadChildren: () => import('./modals/printer-list/printer-list.module').then( m => m.PrinterListPageModule)
  },
  {
    path: 'add-comment',
    loadChildren: () => import('./modals/add-comment/add-comment.module').then( m => m.AddCommentPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
