(function waitForCCSE(){

    if (!Game || !CCSE || !CCSE.isLoaded) {
        setTimeout(waitForCCSE, 500);
        return;
    }

    if (window.SixtySevenOneFileLoaded) return;
    window.SixtySevenOneFileLoaded = true;

    
    // 67 popups
    
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
        el.style.transform =
            "rotate(" + (Math.random() * 60 - 30) + "deg)";

        chaosLayer.appendChild(el);

        setTimeout(() => el.style.opacity = "0", 5000);
        setTimeout(() => el.remove(), 6500);
    }

    
    // buff
    
    if (!Game.buffTypes['67 67 67 67 67']) {
        CCSE.NewBuff('67 67 67 67 67', function(time, pow){
            return {
                name: "67 67 67 67 67",
                desc: "Everything is 67.",
                icon: [10, 14],
                time: 15 * Game.fps,
                add: function(){}
            };
        });
    }

    
    // state
    
    window._67active = false;
    let endTime = 0;

    
    // gc spawn
   
    let lastRoll = -1;

    Game.customShimmerTypes['golden'].customListPush.push(function(me, list){

        let id = me.id || Game.T;

        if (id !== lastRoll) {
            lastRoll = id;
            me._67hit = (Math.random() < 0.05);
        }

        if (me._67hit) {
            list.push('67 67 67 67 67');
        }

    });

    
    // buildings 67
   
    function force67Buildings(){

        for (let i in Game.Objects) {

            let obj = Game.Objects[i];

            obj.amount = 67;
            obj.owned = 67;
            obj.bought = 67;

            if (obj.refresh) obj.refresh();
        }

        Game.recalculateGains = 1;
    }

    
    // override logic 
    
    Game.registerHook("logic", function () {

        if (!window._67active) return;

        if (Game.T > endTime) {
            window._67active = false;
            return;
        }

        //  lock buildings
        force67Buildings();

        //  lock cps
        Game.cookiesPs = 67;
        Game.cookiesPsRaw = 67;
        Game.computedMouseCps = 67;

    });

    
    // effect
   
    Game.customShimmerTypes['golden'].customBuff.push(function(me, buff, choice){

        if (choice == '67 67 67 67 67') {

            window._67active = true;
            endTime = Game.T + 15 * Game.fps;

            //  long-lasting popups
            for (let i = 0; i < 90; i++) {
                setTimeout(() => spawn67("67"), i * 25);
            }

            return Game.gainBuff('67 67 67 67 67', 15, 1);
        }

        return buff;
    });


})();