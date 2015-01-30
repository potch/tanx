pc.script.create('test', function (context) {
    // Creates a new Test instance
    var Test = function (entity) {
        this.entity = entity;
    };

    Test.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.entity.rotate(0, 10, 0);
        }
    };

    return Test;
});