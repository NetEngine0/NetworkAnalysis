(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded || !Game.customShimmerTypes) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    if (window.GoldenCascadeLoaded) return;
    window.GoldenCascadeLoaded = true;

    
    // buff

    if (!Game.buffTypes['golden cascade']) {
        CCSE.NewBuff('golden cascade', function(time, pow){
            return {
                name: "Golden Shower!! oh wait..",
                desc: "This cookie seems to attract more cookies.",
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
            me._cascadeHit = (Math.random() < 0.15); // 15%
        }

        if (me._cascadeHit) {
            list.push('golden cascade');
        }

    });

    
    // effect
    
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice){

        if (choice == 'golden cascade') {

            for (let i = 0; i < 3; i++) {
                new Game.shimmer("golden");
            }


            return Game.gainBuff('golden cascade', 1, 1);
        }

        return buff;
    });

})();