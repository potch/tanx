var tmpVec = new pc.Vec3();

pc.script.create('link', function (context) {
    var Link = function (entity) {
        this.entity = entity;
        this.entity.link = this.link.bind(this);
        this.link = null;
        this.vec = new pc.Vec2();
        this.angle = 0;
        this.lastAngle = 0;
        this.lastSend = 0;
        this.mPos = new pc.Vec2();
    };

    Link.prototype = {
        initialize: function () {
            context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.client = context.root.getChildren()[0].script.client;
        },

        update: function (dt) {
            if (this.link) {
                // rotate vector
                var rot = [ this.mPos.x, this.mPos.y ];
                var t =  rot[0] * Math.sin(Math.PI * 0.75) - rot[1] * Math.cos(Math.PI * 0.75);
                rot[1] = rot[1] * Math.sin(Math.PI * 0.75) + rot[0] * Math.cos(Math.PI * 0.75);
                rot[0] = t;
                
                tmpVec.set(
                    this.link.getPosition().x + 9 + (rot[0] / (context.graphicsDevice.width / 2) * 4),
                    14,
                    this.link.getPosition().z + 9 + (rot[1] / (context.graphicsDevice.height / 2) * 4)
                )
                this.entity.setPosition(tmpVec.lerp(this.entity.getPosition(), tmpVec, 0.1));
            }
            
            if (Date.now() - this.lastSend > 100 && this.angle !== this.lastAngle) {
                this.lastSend = Date.now();
                this.lastAngle = this.angle;
                
                this.client.socket.send('target', this.angle);
            }
        },
        
        onMouseMove: function(evt) {
            if (this.link) {
                this.mPos.set(evt.x - (context.graphicsDevice.width / 2), evt.y - (context.graphicsDevice.height / 2));
                this.vec.copy(this.mPos).normalize();
                
                // rotate vector
                var t =      this.vec.x * Math.sin(Math.PI * 0.75) - this.vec.y * Math.cos(Math.PI * 0.75);
                this.vec.y = this.vec.y * Math.sin(Math.PI * 0.75) + this.vec.x * Math.cos(Math.PI * 0.75);
                this.vec.x = t;
                
                this.angle = Math.floor(Math.atan2(this.vec.x, this.vec.y) / (Math.PI / 180));
                this.link.targeting(this.angle);
            }
        },
        
        link: function(tank) {
            this.link = tank;
        }
    };

    return Link;
});