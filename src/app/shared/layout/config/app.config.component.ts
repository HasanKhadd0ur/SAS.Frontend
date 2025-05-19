import {Component, Input, OnInit} from '@angular/core';
import { LayoutService, ThemeService } from '../service';
import { StorageService } from '../../../core/services/storage-service/storage.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
    standalone:false

})
export class AppConfigComponent implements OnInit {

    @Input() minimal: boolean = false;

    scales: number[] = [12, 13, 14, 15, 16];

    typeConfigList: string[] = ['menuMode', 'scale', 'ripple', 'inputStyle'];

    constructor(
        public layoutService: LayoutService,
        private storageService: StorageService,
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
        this.initConfig();
    }

    initConfig(): void {
        this.typeConfigList.forEach(item => {
            this.getConfigLocalStorage(item);
        })
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get inputStyle(): string {
        return this.layoutService.config().inputStyle;
    }

    set inputStyle(_val: string) {
        this.setConfigLocalStorage('inputStyle', _val);
    }

    get ripple(): boolean {
        return this.layoutService.config().ripple;
    }

    set ripple(_val: boolean) {
        this.setConfigLocalStorage('ripple', _val);
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }

    set scale(_val: number) {
        this.setConfigLocalStorage('scale', _val);
    }

    get menuMode(): string {
        return this.layoutService.config().menuMode;
    }

    set menuMode(_val: string) {
        this.setConfigLocalStorage('menuMode', _val);
    }

    setConfigLocalStorage(key: string, value: any) {
        this.storageService.clearAndSetItemInLocalStorage(key, value);
        this.getConfigLocalStorage(key);
    }

    getConfigLocalStorage(config: string) {
        let configOption = this.storageService.getLocalStorage(config);
        if (configOption) {
            this.layoutService.config()[config] = configOption;
        }
        if (config === 'scale') {
            this.applyScale();
        }
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {
        let storedTheme = this.storageService.getLocalStorage('theme');
        let storedColorScheme = this.storageService.getLocalStorage('colorScheme');

        if (storedTheme && storedColorScheme) {
            this.storageService.removeLocalStorageItem('theme');
            this.storageService.removeLocalStorageItem('colorScheme');
        }

        this.storageService.setLocalStorage('theme', theme);
        this.storageService.setLocalStorage('colorScheme', colorScheme);

        if (storedTheme !== theme) {
            this.themeService.getThemeLocalStorage();
        }
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
}
