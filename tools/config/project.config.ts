import { join } from 'path';
import { argv } from 'yargs';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  /** Personalización deploy as war*/
  WAR_DEST = `${this.DIST_DIR}/`;
  WAR_APP_CONTEXT = `rfid-consola`;

  /** Personalización font-awesome*/
  /** Personalización primeng*/
  PRIME_NG_THEME = 'omega';
  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    `node_modules/font-awesome/fonts/**`,
    `node_modules/primeng/resources/themes/${this.PRIME_NG_THEME}/fonts/**`,
  ];

  THEME_FONTS_DEST = `${this.APP_DEST}/css/fonts`;
  THEME_FONTS_SRC = [
    `node_modules/primeng/resources/themes/${this.PRIME_NG_THEME}/fonts/**`,
  ];

  CSS_IMAGE_DEST = `${this.CSS_DEST}/images`;
  CSS_IMAGE_SRC = [
    `node_modules/primeng/resources/themes/${this.PRIME_NG_THEME}/images/**`
  ];

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    this.GOOGLE_ANALYTICS_ID = '';
    /** Personalización aplicación*/
    this.APP_TITLE = 'RFID Consola';
    /** Personalización deploy as war*/
    this.APP_BASE = argv['base'] || `/${this.WAR_APP_CONTEXT}/`;

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    /** Personalización font-awesome*/
    /** Personalización primeng*/
    /** Personalización chart.js*/
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },
      { src: 'primeng/resources/primeng.min.css', inject: true },
      { src: `primeng/resources/themes/${this.PRIME_NG_THEME}/theme.css`, inject: true },
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
    const additionalPackages: ExtendPackages[] = [{
      name: 'primeng',
      path: 'node_modules/primeng',
      packageMeta: {
        defaultExtension: 'js'
      }
    }];

    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
