(function() {
    function seekBar($document) {
        
        /**
        * @function calculatePercent
        * @desc Calculates percent of seekbar fill width
        * @param {Element Object} seekBar | (DOM Event) event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                
                /**
                * @desc jQueyry wrapped object for element argument
                * @type jQuery {Object}
                */
                var seekBar = $(element);
                
                /**
                * @desc Observes changes to value and max attributes
                */
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });

                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                
                /**
                * @function percentString
                * @desc Creates percent string based on current and max value
                * @param
                * PRIVATE
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + '%';
                };
                
                /**
                * @function fillStyle
                * @desc Sets width equal to percent string
                * @param
                * PUBLIC
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                
                /**
                * @function onClickSeekBar
                * @desc Calculates and sets percent value
                * @param
                * PUBLIC
                */
                scope.onClickSeekBar = function() {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                /**
                * @function trackThumb
                * @desc Tracks mouseup/mousedown/mousemove on thumb
                * @param
                * PUBLIC
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                /**
                * @function notifyOnChange
                * @desc Notifies onChange when value changes
                * @param
                * PUBLIC
                */
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
            }
        }
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();