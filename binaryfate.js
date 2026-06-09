(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded || !Game.customShimmerTypes) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    if (window.BinaryFateLoaded) return;
    window.BinaryFateLoaded = true;

   
    // rarity
    
    if (!Game.buffTypes['binary fate']) {
        CCSE.NewBuff('binary fate', function(time, pow){
            return {
                name: "Binary Fate",
                desc: "50/50 chance of extreme fortune or catastrophe.",
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

            // appears 1% of the time
            me._binaryHit = (Math.random() < 0.01);
        }

        if (me._binaryHit) {
            list.push('binary fate');
        }

    });

    
    // effect
    
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice){

        if (choice == 'binary fate') {

            let roll = Math.random();

            
            // bad...
            
            if (roll < 0.5) {

                // wipe cookies
                Game.cookies = 0;

                // remove ALL buildings
                for (let i in Game.Objects) {
                    let obj = Game.Objects[i];
                    obj.amount = 0;
                    obj.bought = 0;
                }

                Game.recalculateGains = 1;

                Game.Popup("BINARY FATE: CATASTROPHE");

            }

            
            // good...
            
            else {

                // big cookie (10 hours CPS)
                Game.Earn(Game.cookiesPs * 60 * 60 * 10);

                // click power boost (temporary via modifier)
                Game.clickFrenzy = 1;
                Game.clickFrenzyPower = 10;

                Game.Popup("BINARY FATE: LUCKY BREAK");

            }

            return Game.gainBuff('binary fate', 1, 1);
        }

        return buff;
    });


})();