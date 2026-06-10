(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded || !Game.customShimmerTypes) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    if (window.SixtySevenBuffFixFinal) return;
    window.SixtySevenBuffFixFinal = true;


    //  buff register
    
    if (!Game.buffTypes['67_overload']) {
        CCSE.NewBuff('67_overload', function(time, pow){
            return {
                name: "67 67 67 67 67",
                desc: "Everything is 67.",
                icon: [10, 14],
                time: time,
                add: function(){}
            };
        });
    }

    
    window._67active = false;
    let endTime = 0;

    // pop up
  
    let chaosLayer = document.createElement("div");
    chaosLayer.style.position = "fixed";
    chaosLayer.style.left = "0";
    chaosLayer.style.top = "0";
    chaosLayer.style.width = "100vw";
    chaosLayer.style.height = "100vh";
    chaosLayer.style.pointerEvents = "none";
    chaosLayer.style.zIndex = "9999999";
    document.body.appendChild(chaosLayer);

    function spawn67(text){
        let el = document.createElement("div");
        el.innerHTML = text;

        el.style.position = "absolute";
        el.style.left = Math.random() * window.innerWidth + "px";
        el.style.top = Math.random() * window.innerHeight + "px";
        el.style.opacity = "1";
        el.style.transition = "opacity 1.5s linear";
        el.style.fontSize = (25 + Math.random() * 35) + "px";
        el.style.color = "#fff";
        el.style.textShadow = "2px 2px 4px #000";
        el.style.transform = "rotate(" + (Math.random() * 60 - 30) + "deg)";

        chaosLayer.appendChild(el);

        setTimeout(() => el.style.opacity = "0", 5000);
        setTimeout(() => el.remove(), 6500);
    }

    
    // safe gc hook
    
    let lastRoll = -1;

    Game.customShimmerTypes['golden'].customListPush.push(function(me, list){

        let id = me.id || Game.T;

        if (id !== lastRoll) {
            lastRoll = id;
            me._67hit = (Math.random() < 0.08);
        }

        if (me._67hit) {
            list.push('67_overload');
        }

    });

    
    // set objects owned
   
    function force67Buildings(){
        for (let i in Game.Objects) {
            let obj = Game.Objects[i];
            obj.amount = 670;
            obj.owned = 670;
        }
    }

    function restoreBuildings(){
        for (let i in Game.Objects) {
            let obj = Game.Objects[i];
            obj.amount = obj.owned;
        }
        Game.recalculateGains = 1;
    }

    
    // main loop
   
    Game.registerHook("logic", function () {

        if (!window._67active) return;

        if (Game.T > endTime) {
            window._67active = false;
            restoreBuildings();
            Game.cookiesPs = 0;
            Game.cookiesPsRaw = 0;
            Game.computedMouseCps = 0;
            return;
        }

        force67Buildings();

        Game.cookiesPs = 670;
        Game.cookiesPsRaw = 670;
        Game.computedMouseCps = 670;
    });

    
    // string fix crash + logic
    
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice){

        if (choice == '67_overload') {

            window._67active = true;
            endTime = Game.T + 10 * Game.fps;

            for (let i = 0; i < 90; i++) {
                setTimeout(() => spawn67("67"), i * 25);
            }

            me.die();

            // note : directly apply buff instead of relying on return
            Game.gainBuff('67_overload', 10, 1);

            return buff;
        }

        return buff;
    });


})();