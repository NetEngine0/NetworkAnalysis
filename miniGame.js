(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded || !Game.customShimmerTypes) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    let shutdownUntil = 0;

    
    // math logic for effect

    Game.registerHook("logic", function () {
        if (Game.T < shutdownUntil) {
            Game.cookiesPs = 0;
            Game.computedMouseCps = 0;
            Game.EarnedCps = 0;
        }
    });


    // nerf logic itself

    if (!Game.buffTypes['shutdown cookie']) {
        CCSE.NewBuff('shutdown cookie', function(time, pow){
            return {
                name: "Pay attention!",
                desc: "Cookie production is completely halted for 60 seconds!",
                icon: [10, 14],
                time: 1800,
                add: function(){}
            };
        });
    }


    // rarity control for the 7th god damn ucking time with debugging for my stupid iidot dumb retard self fucking fucker mother fucker fuck fuck fuckj

    let lastShutdownRoll = -1;

    Game.customShimmerTypes['golden'].customListPush.push(function(me, list){

        // use shimmer id instead of object mute
        let id = me.id || Game.T; // fallback safety

        if (id !== lastShutdownRoll) {
            lastShutdownRoll = id;

            me._shutdownHit = (Math.random() < 0.05);

            console.log("Shutdown roll:", me._shutdownHit, "ID:", id);
        }

        if (me._shutdownHit) {
            list.push('shutdown cookie');
        }

    });

    // EFFECT WORK?
    
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice, effectDurMod, mult){

        if (choice == 'shutdown cookie') {

            shutdownUntil = Game.T + 60 * Game.fps;
    // once again i havbe absoltuelty no fucking idea what the fuxck this does but if its removed EVERYTHING BRTEAKS
            Game.last = "";

            return Game.gainBuff('shutdown cookie', 60 * Game.fps, 1);
        }

        return buff;
    });

    Game.Popup("Mods Injected!");

})();