'use strict';
/*
 * Defining the Package
 */

var Module = require("meanio").Module;

var Bootstrapmagic = new Module("Bootstrapmagic");

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Bootstrapmagic.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Bootstrapmagic.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Bootstrapmagic.menus.add({
      title: 'Bootstrapmagic Editor',
      link: 'bootstrapmagic example page',
      roles: ['authenticated'],
      menu: 'main'
    })
    
    //Adding jquery to the mean project
Bootstrapmagic.aggregateAsset('js','less.js');
//Bootstrapmagic.aggregateAsset('js','jquery-1.8.3.min.js');
Bootstrapmagic.aggregateAsset('js','bootstrap.js');
Bootstrapmagic.aggregateAsset('js','less-1.3.3.js');
Bootstrapmagic.aggregateAsset('js','colorpicker.js');
Bootstrapmagic.aggregateAsset('js','twitter-bootstrap/bootstrap.js');
Bootstrapmagic.aggregateAsset('css','bootstrapmagic.css');
Bootstrapmagic.aggregateAsset('css','colorpicker.css');

    /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Bootstrapmagic.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Bootstrapmagic.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settigns
    Bootstrapmagic.settings(function (err, settings) {
      //you now have the settings object
    });
    */

    return Bootstrapmagic;
});