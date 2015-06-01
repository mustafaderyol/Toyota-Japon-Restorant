define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        Upload = Backbone.Model.extend({
            url: '../../jpnrest/api/uploadHelp/upload'
        });
    return {
        Upload: Upload
    };
});