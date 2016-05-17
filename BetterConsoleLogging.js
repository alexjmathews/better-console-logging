var chalk = require('chalk')
module.exports = function() {
    ['log', 'warn', 'error'].forEach(function(method) {
        var old = console[method];
        console[method] = function() {
    		for(var attributename in arguments){
    			// old.call(console, )
     			if (typeof(arguments[attributename]) != 'object') {
    				arguments[attributename] = arguments[attributename].toString()
    			} else {
    				arguments[attributename] = JSON.stringify(arguments[attributename]).toString()
    			}
    		}
            var stack = (new Error()).stack.split(/\n/);
            if (stack[0].indexOf('Error') === 0) {
                stack = stack.slice(1);
            }
    		var color;
    		if (method == 'error') {
    			color = chalk.bgRed;
    		} else if (method =='warn') {
    			color = chalk.bgYellow;
    		} else {
    			color = chalk.yellow;
    		}
    		var trimmed = stack[1].trim();
    		if (trimmed.indexOf(__dirname)>=0) {
    			var index = trimmed.indexOf(__dirname);
    			var paren = stack[1].trim().indexOf("(");
    			if (paren >=0) {
    				trimmed = trimmed.substring(0, index -1) +  trimmed.substring(index + __dirname.length+1, trimmed.length-1)
    			} else {
    				trimmed = trimmed.substring(0, index -1) + " "+ trimmed.substring(index + __dirname.length+1)
    			}
    		}
    		trimmed = color(trimmed);
            var args = [].slice.apply(arguments).concat([trimmed]);
            // setTimeout(function () {
            //     old.call(console, "hellasdfasdfasdf")
            // }, 5000);
            //
            return old.apply(console, args);
        };
    });

}
