(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded || !Game.customShimmerTypes) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    if (window.SuperClickLoaded) return;
    window.SuperClickLoaded = true;

    
    // buff
   
    if (!Game.buffTypes['super click frenzy']) {
        CCSE.NewBuff('super click frenzy', function(time, pow){
            return {
                name: "Super Click Frenzy",
                desc: "Clicking power x50000 for 20 seconds!",
                icon: [11, 14], // You can change this icon
                time: 20 * Game.fps,
                multClick: 5000,
                add: function(){}
            };
        });
    }

    
    // rarity
    
    let lastRoll = -1;

    Game.customShimmerTypes['golden'].customListPush.push(function(me, list){

        let id = me.id || Game.T;

        if (id !== lastRoll) {
            lastRoll = id;
            me._superClickHit = (Math.random() < 0.05); // 5% chance
        }

        if (me._superClickHit) {
            list.push('super click frenzy');
        }

    });

    
    // effect
    
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice){

        if (choice == 'super click frenzy') {


            return Game.gainBuff('super click frenzy', 20 * Game.fps, 50000);
        }

        return buff;
    });


})();