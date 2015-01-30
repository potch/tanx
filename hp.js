pc.script.create('hp', function (context) {
    var Hp = function (entity) {
        var div = document.createElement('div');
        div.style.id = 'hpBar';
        div.style.position = 'absolute';
        div.style.top = '16px';
        div.style.left = '50%';
        div.style.width = '30%';
        div.style.height = '6px';
        div.style.marginLeft = '-15%';
        div.style.backgroundColor = 'rgba(164, 164, 164, .7)';
        document.body.appendChild(div);
        
        var hp = this.hp = document.createElement('div');
        hp.style.height = '6px';
        hp.style.backgroundColor = '#2ecc71';
        hp.style.width = '100%';
        hp.style.webkitTransition = 'width 200ms';
        hp.style.mozTransition = 'width 200ms';
        hp.style.msTransition = 'width 200ms';
        hp.style.transition = 'width 200ms';
        div.appendChild(hp);

        this.points = 0;
    };

    Hp.prototype = {
        set: function(hp) {
            if (this.points !== hp) {
                this.points == hp;
                this.hp.style.width = Math.floor((hp / 10) * 100) + '%';
            }
        }
    };

    return Hp;
});