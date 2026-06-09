(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded || !Game.customShimmerTypes) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    if (window.SugarRushLoaded) return;
    window.SugarRushLoaded = true;

    
    // buff
    
    if (!Game.buffTypes['sugar rush']) {
        CCSE.NewBuff('sugar rush', function(time, pow){
            return {
                name: "Sugar Rush",
                desc: "Gain 5 sugar lumps instantly.",
                icon: [29, 14],
                time: 1,
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
            me._sugarRushHit = (Math.random() < 0.02); // 0.5% chance
        }

        if (me._sugarRushHit) {
            list.push('sugar rush');
        }

    });

   
    // effect
   
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice){

        if (choice == 'sugar rush') {

            Game.gainLumps(5);

            Game.Popup("Sugar Rush! +5 Sugar Lumps");

            return Game.gainBuff('sugar rush', 1, 1);
        }

        return buff;
    });

})();