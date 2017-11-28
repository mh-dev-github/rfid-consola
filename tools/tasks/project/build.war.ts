import * as gulp from 'gulp';

const war = require('gulp-war');
const zip = require('gulp-zip');

import Config from '../../config';

export = () => {

    return gulp.src(Config.APP_DEST + '/**')
        .pipe(war({
            welcome: 'index.html',
            displayName: Config.APP_TITLE,
        }))
        .pipe(zip(`${Config.WAR_APP_CONTEXT}.war`))
        .pipe(gulp.dest(Config.WAR_DEST));
};
