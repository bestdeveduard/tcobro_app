import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface AppConfig {
	availableLanguages: Array<{ code: string, name: string }>;
	showBuyPromt: boolean;
}

export const BaseAppConfig: AppConfig = {
	availableLanguages: [
		{
			code: 'es',
			name: 'Spanish'
		},
		{
			code: 'en',
			name: 'English'
		},
		{
			code: 'pt',
			name: 'Portuguese'
		}
	],
	showBuyPromt: false
};