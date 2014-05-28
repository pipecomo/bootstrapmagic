/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
  less = {
        env: "development", // or "production"
        async: false,       // load imports async
        fileAsync: false,   // load imports async when in a page under 
                            // a file protocol
        poll: 3000,         // when in watch mode, time in ms between polls
        functions: {},      // user functions, keyed by name
        dumpLineNumbers: "comments", // or "mediaQuery" or "all"
        relativeUrls: false,
        
        // whether to adjust url's to be relative
        // if false, url's are already relative to the
        // entry less file
        
        // rootpath: "/tutu/"
        // rootpath: "/github/variables-bootstrap-angularJS-editor/"
        // a path to add on to the start of every url 
        //resource
    };
WebFont.load({
      google: {
        families: ['Droid Sans', 'Droid Serif']
      }
    });
