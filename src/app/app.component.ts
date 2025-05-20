import { Component, OnInit } from '@angular/core';
import { LayoutService, ThemeService } from './shared/layout/service';
import { StorageService } from './core/services/storage-service/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent implements OnInit {

    typeConfigList: string[] = ['menuMode', 'scale', 'ripple', 'inputStyle'];

    constructor(
        public layoutService: LayoutService,
        private storageService: StorageService,
        private themeService: ThemeService,
    ) {
        this.themeService.getThemeLocalStorage();
    }

    ngOnInit() {
        this.initConfig();
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }

    initConfig(): void {
        this.typeConfigList.forEach(item => {
            this.getConfigLocalStorage(item);
        });
    }

    getConfigLocalStorage(config: string) {
        let configOption = this.storageService.getLocalStorage(config);
        if (configOption) {
            this.layoutService.config[config] = configOption;
        }
        if (config === 'scale') {
            this.applyScale();
        }
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
}
