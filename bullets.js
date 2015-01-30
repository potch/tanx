pc.script.create('bullets', function (context) {
    var vecTmp = new pc.Vec3();
    
    var Bullets = function (entity) {
        this.entity = entity;
    };

    Bullets.prototype = {
        initialize: function () {
            this.tanks = context.root.findByName('tanks');
            this.bullet = context.root.findByName('bullet');
            this.bullet.enabled = false;
            
            this.bullets = context.root.findByName('bullets');
        },

        new: function(data) {
            var tank = this.tanks.findByName('tank_' + data[1]);
            if (! tank) return;
            
            var bullet = this.bullet.clone();
            bullet.setName('bullet_' + data[0]);
            bullet.enabled = true;
            // offset
            vecTmp.set(0, 0, 1);
            tank.script.tank.head.getRotation().transformVector(vecTmp, vecTmp);
            vecTmp.normalize().scale(0.5);
            
            bullet.setPosition(tank.getPosition().x + vecTmp.x, 0.9, tank.getPosition().z + vecTmp.z);
            bullet.targetPosition = new pc.Vec3(data[4], 0.9, data[5]);
            bullet.speed = data[6] * 50 * 0.5;
            bullet.model.material = tank.script.tank.matBullet;
            
            this.bullets.addChild(bullet);
        },
        
        delete: function(args) {
            var bullet = this.bullets.findByName('bullet_' + args.id);
            if (! bullet) return;
            
            if (! args.pos) {
                args.pos = bullet.getPosition();
                args.pos = [ args.pos.x, args.pos.z ];
            }
            
            if (args.pos) {
                var i = Math.floor(Math.random() * 2 + 1);
                while(i--) {
                    context.root.getChildren()[0].script.fires.new({
                        x: args.pos[0] + (Math.random() - 0.5) * 2,
                        z: args.pos[1] + (Math.random() - 0.5) * 2,
                        size: Math.random() * 1 + 1,
                        life: Math.floor(Math.random() * 50 + 200)
                    });
                }
            }
            
            bullet.destroy();
        }
    };

    return Bullets;
});