/* Controllers */

function LessCtrl($scope, $http, ap_less, $timeout) {
   
    $scope.variables = {};
    $scope.fonts = {};
    $scope.fontStylesWeights ={};
    var initLessVariables = function () {
        $http.get('less/variables.json').success(function(data) {

            if (window.localStorage) {
                for (var key in window.localStorage) {
                    var url = "http://pikock.github.io/bootstrap-magic/twitter-bootstrap/less/bootstrap.less:timestamp"
                    if (key == url) {
                        delete window.localStorage[key];
                    };
                  }
            };
            
            $scope.variables = data;
            $timeout(function() {
                $scope.applyLess(false);
            },0);
            $timeout(function() {
                // move into a service
                var keys = ap_less.getKeys($scope);
                var icons = ap_less.getUrls();
                var font = ap_less.getFonts();
               
               
                $timeout(function() {
                   $('.colors').ColorPicker({  
        onSubmit: function(hsb, hex, rgb, el, parent) {  
            $(el).val('#'+hex);  
            $(el).ColorPickerHide();  
              var scope = angular.element(el).scope();
             scope.variable.value = '#'+hex;
             $(el).next().css('backgroundColor', '#'+hex);
             $scope.updatePreview(el,'#'+hex);
             
             if ($scope.autoapplyless)
              $scope.autoApplyLess();
            
        },  
        onBeforeShow: function () {  
        	
        	if(this.value.charAt(0) == '@')
        	$scope.getVariableValue(this)
        	else
        	$(this).ColorPickerSetColor(this.value);
        	
        	//console.log(value);	
                
             
        }  
    })  
    .bind('keyup', function(){  
        $(this).ColorPickerSetColor(this.value);  
    });  
                    
                    
                    
                    $('.lessVariable').each( function(index){
                        var theElement = $(this);
                        var scope = angular.element(this).scope();
                        switch ( scope.variable.type ) {
                        	case 'icons':
                        		var src = icons;
                        		break;
                        		
                        	case 'font':
                        		var src = font;
                        		break;	
                        		
                        	case 'color':
                        	default:
                        	    var src = keys;
                        	    
                        }
                        $(this).typeahead({ 
                            source: src,
                            updater: function (item) {
                                scope.variable.value = item;
                                   $timeout(function() {
                                       if (item.charAt(0) == '@')
                                       {
                                           if ($scope.autoapplyless)
                                            $scope.displayBrandColor(item, theElement);   
                                        } 
                                         
                                       
                                          if ($scope.autoapplyless){
                                                $scope.autoApplyLess();
                                               //$scope.getFontVariants(item);
                                                                 }
                                                 }, 500);
                                return item;
                            }
                        });
                    });
                    
                },0); 
            },0);
        });
    };
    initLessVariables();
    
    $scope.autoapplyless = true;
    
    $scope.autoApplyLess = function (event) {
        console.log('auto apply called')
        if ($scope.autoapplyless){
            var vars = ap_less.getVariables($scope, false);
            less.modifyVars(vars.variables);
            
            // added by pipe to get the font variations
      
           
               $scope.getFontVariants(vars.fonts) 
            
            
            
           
        }
    };
    
    $scope.applyLess = function (applyAll) {
        var vars = ap_less.getVariables($scope, applyAll);
        
        less.modifyVars(vars.variables);
         // added by pipe to get the font variations
      
           
               $scope.getFontVariants(vars.fonts) 

     
    };
    
    $scope.displayBrandColor = function(color, theElement){
        
      
        $('.colors').each(function(index){
            var next = angular.element(theElement).next();	
            var scope = angular.element(this).scope();
            if(scope.variable.key === color)
            {
                var value = scope.variable.value;
               
                 $(next).next().css('backgroundColor', value);
               	
                 
            }
        })
        
    }
    $scope.updatePreview = function(element, value){
    
               var scope = angular.element(element).scope();
              
    	$('.colors').each(function(index){
            	
           
            if(scope.variable.key === $(this).val())
            {
              $(this).next().next().css('backgroundColor', value);
            }
        })
    
    }
    
    $scope.getVariableValue = function(element){
    var value = element.value
    $('.colors').each(function(index){
            	
            var scope = angular.element(this).scope();
            if(scope.variable.key === value)
            {
            	
              $(element).ColorPickerSetColor(scope.variable.value); 
            }
        })
    
    }
    $scope.getFontVariants = function(fonts){
     
     
         ap_less.getFontVariants($scope, fonts);
       
         $scope.$watch('fontStylesWeights', function() {
            
             // this being done because this variable is outside the scope
       if (typeof $scope.fontStylesWeights !== 'undefined')
       {  
               $('.fontfamily').each( function(ffindex){
                          var scope = angular.element(this).scope();
                         
                          var groupname = scope.variable.group;
                          //console.log(groupname);
                          $('.fontstyle').each(function(fsindex){
                              var fontstylescope = angular.element(this).scope();
                              var fontstylegroupname = fontstylescope.variable.group;
                              if(groupname === fontstylegroupname)
                              {
                                  var fontstyleSrc = [];
                        		for (var key in $scope.fontStylesWeights[ffindex]) {
                                        if(key === 'regular')
                                        key = 'normal'
                                    
                                        fontstyleSrc.push(key)
                                        
                                        }
                                        var newStyleName =   groupname+'FontStyles' 
                                            $scope[newStyleName] = fontstyleSrc;
                                        var newWeightName =   groupname+'FontWeights'; 
                                        if(fontstylescope.variable.value === 'normal')
                                        var  keyName = 'regular';
                                        else
                                        var  keyName = fontstylescope.variable.value;
                                    
                                         var fontweightSrc =    $scope.fontStylesWeights[ffindex][keyName]; 
                                          $scope[newWeightName] = fontweightSrc;
                                        
                                      
                              }
                              
                              
                          });
                        
                      });
                   WebFont.load({
              google: {
                families: $scope.googleFontFamilies
              }
            });    
         }
   });                
                 


       
         
    }
    $scope.colorpicker = function(type) {
    	return (type == 'color') ? true : false;
    }
    
    $scope.color = function(type, value) {
    	return (type == 'color' && /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(value) ) ? value : '#ffffff';
    }
    
    $scope.$on('applyLess', function() {
        $scope.applyLess();
    });
    
    $scope.setIsViewLoading = function(val) {
        $scope.isViewLoading = val;
    };
    
    $scope.minified = false;
    
    
    $scope.saveCSS = function() {
        ap_less.saveCSS($scope);
    }
    
    $scope.saveLessVariables = function () {
    	ap_less.saveLessVar(ap_less.getVariablesToString($scope));
    };
    
    $scope.resetLessVariables = function () {
    	initLessVariables();
    	setTimeout(function() {
            $scope.applyLess();
        },0);
    };
    
    $scope.importLessVariables= function (string) {
        $scope = ap_less.importVariables($scope, string);
        $scope.applyLess();
    };
    
    $scope.upDateValue = function () {
        
    };
    
    $scope.isViewLoading = false;
    
    $scope.$on('$routeChangeStart', function() {
        $scope.isViewLoading = true;
    });
    
    $scope.$on('$routeChangeSuccess', function() {
        $scope.isViewLoading = false;
    });
    
    $scope.getGroupUrl = function() {
        return 'preview/' + angular.lowercase(this.group.name).replace(/[^\w ]+/g,'').replace(/ +/g,'-') + '.html';
    };
     //pipe added some default values//
    
    $scope.showTheOptions = function (name){
            
        if($scope.blockSelection == name || name == 'Brand Colors')
        {
            return true;
        }
    }
    $scope.showTheBlock = function (name){
            
        if(name != 'Brand Colors' && $scope.blockSelection == name || $scope.blockSelection == 'All')
        {
            return true;
        }
    }
    $scope.sideBarSelection = 'show';
    $scope.widthSelection = '1200';
    $scope.blockSelection = 'Typography';
    $scope.brandColors = 'show';
    $scope.headingFontStyles = ['normal'];
    $scope.headingFontWeights = ['400','700'];

}
LessCtrl.$inject = ['$scope', '$http', 'ap_less', '$timeout'];

function PageCtrl($scope, $http, ap_less) {
    }
PageCtrl.$inject = ['$scope', '$http', 'ap_less'];

 
   
