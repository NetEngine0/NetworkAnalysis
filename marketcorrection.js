(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded || !Game.customShimmerTypes) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    if (window.MarketCorrectionLoaded) return;
    window.MarketCorrectionLoaded = true;

    
    // effect
    
    if (!Game.buffTypes['market correction']) {
        CCSE.NewBuff('market correction', function(time, pow){
            return {
                name: "Market Correction",
                desc: "The tax man came, you forfiet 1 of each of your assets to avoid jail.",
                icon: [10, 14],
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
            me._marketHit = (Math.random() < 0.05); // 5% chance
        }

        if (me._marketHit) {
            list.push('market correction');
        }

    });

   
    // effect
    
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice){

        if (choice == 'market correction') {

            for (let i in Game.Objects) {

                let obj = Game.Objects[i];

                if (obj.amount > 0) {
                    obj.amount--;
                    obj.bought--;
                }
            }

            Game.recalculateGains = 1;

            return Game.gainBuff('market correction', 1, 1);
        }

        return buff;
    });

})();