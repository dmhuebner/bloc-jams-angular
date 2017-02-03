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
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                
                var seekBar = $(element);
                
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
                
                scope.onClickSeekBar = function() {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        }
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();