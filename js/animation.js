window.onload = function() {

var parentSvg = Snap("#svg");
Snap.load("intro.svg", onSVGLoaded);

function onSVGLoaded( data ){
    var svg = Snap(data.select('svg'));
    parentSvg.append(svg);

    var width = svg.attr("width");
    var height = svg.attr("height");

    function resize(e) {
      var wW = window.innerWidth;
      var wH = window.innerHeight;

      var scalex = (wW - 50) / width;
      var scaley = (wH - 50) / height;
      var scale = Math.min(Math.min(scalex, scaley), 3);

      var wsize = width*scale + "px";
      var hsize = height*scale + "px";;

      parentSvg.attr({width: wsize});
      parentSvg.attr({height: hsize});

      svg.attr({width: wsize});
      svg.attr({height: hsize});
    }
    window.onresize = resize;
    resize();

    function createElement(id, offsetin, offsetout) {
        var e = Snap(id);
        e.localMatrix = e.transform().localMatrix;
        e.transformIn = e.localMatrix.clone().translate(0, offsetin);
        e.transformOut = e.localMatrix.clone().translate(0, offsetout);

        return e;
    }

    var timers = [];

    function animateElement(e, transform, start, duration, easing) {
      timers.push(setTimeout(function(){
        e.animate(transform, duration, easing);
      }, start));
    }

    var butterfly = createElement("#butterfly", 160, 450);
    var feet = createElement("#feet", 160, 450);
    var jet = createElement("#jet", 160, 450);
    var logo = createElement("#logo", 160, 450);


    var lineOffset = 38.68;  // 77.37 for two lines

    var meta = createElement("#meta", 160, 450);
    var morphose = createElement("#morphose", 160 + lineOffset*2, 450);
    var reflexo = createElement("#reflexo", 160, 450);
    var logie = createElement("#logie", 160 + lineOffset, 450);
    var geneve = createElement("#geneve", 160, 450);

    var metaT1 = meta.transformIn.clone().translate(0, lineOffset * 2);
    var metaT0 = metaT1.clone().translate(50,0);
    var metaT2 = meta.transformIn.clone().translate(0, lineOffset);
    var reflexoT1 = reflexo.transformIn.clone().translate(0, lineOffset);
    var reflexoT0 = reflexoT1.clone().translate(50, 0);
    var geneveT0 = geneve.transformIn.clone().translate(50, 0);

    var contact = createElement("#contact", 0, 0);

    function elastic(n) {
        var p = 0.5; // Default 0.3
        return Math.pow(2, -10 * n) * Math.sin((n - p/4) *
            (2 * Math.PI) / p) + 1;
    };

    function animate() {
      animateElement(butterfly, {transform: butterfly.transformIn}, 0, 1000, elastic);
      animateElement(meta, {opacity: 0.0, transform: metaT0}, 0, 0);
      animateElement(meta, {opacity: 1.0, transform: metaT1}, 800, 800);
      animateElement(morphose, {opacity: 0.0, transform: morphose.transformIn}, 0, 0);
      animateElement(morphose, {opacity: 0.4}, 1500, 800);
      animateElement(meta, {opacity: 0.4, transform: metaT2}, 3000, 150);
      animateElement(morphose, {opacity: 0.0}, 3000, 150);
      animateElement(butterfly, {transform: butterfly.transformOut}, 3000, 150);

      animateElement(feet, {transform: feet.transformIn}, 3000, 800, elastic);
      animateElement(reflexo, {opacity: 0.0, transform: reflexoT0}, 0, 0);
      animateElement(reflexo, {opacity: 1.0, transform: reflexoT1}, 3500, 800);
      animateElement(logie, {opacity: 0.0, transform: logie.transformIn}, 0, 0);
      animateElement(logie, {opacity: 0.4}, 4200, 800);
      animateElement(meta, {transform: meta.transformIn}, 5700, 150);
      animateElement(reflexo, {opacity: 0.4, transform: reflexo.transformIn}, 5700, 150);
      animateElement(logie, {opacity: 0.0}, 5700, 150);
      animateElement(feet, {transform: feet.transformOut}, 5700, 150);

      animateElement(jet, {transform: jet.transformIn}, 5700, 800, elastic);
      animateElement(geneve, {opacity: 0.0, transform: geneveT0}, 0, 0);
      animateElement(geneve, {opacity: 1.0, transform: geneve.transformIn}, 6200, 800);
      animateElement(jet, {transform: jet.transformOut}, 8200, 150);

      animateElement(logo, {transform: logo.transformIn}, 8200, 800, elastic);
      animateElement(meta, {opacity: 1.0}, 8200, 800);
      animateElement(reflexo, {opacity: 1.0}, 8200, 800);

      animateElement(contact, {opacity: 1.0}, 9500, 1000);
  }

  function reset() {
      timers.forEach(function(t){ clearTimeout(t); });

      butterfly.stop();
      butterfly.attr({opacity: 1.0});
      butterfly.transform(butterfly.localMatrix);

      feet.stop();
      feet.attr({opacity: 1.0});
      feet.transform(feet.localMatrix);

      jet.stop();
      jet.attr({opacity: 1.0});
      jet.transform(jet.localMatrix);

      logo.stop();
      logo.attr({opacity: 1.0});
      logo.transform(butterfly.localMatrix);

      meta.stop();
      meta.attr({opacity: 1.0});
      meta.transform(meta.localMatrix);

      morphose.stop();
      morphose.attr({opacity: 1.0});
      morphose.transform(morphose.localMatrix);

      reflexo.stop();
      reflexo.attr({opacity: 1.0});
      reflexo.transform(reflexo.localMatrix);

      logie.stop();
      logie.attr({opacity: 1.0});
      logie.transform(logie.localMatrix);

      geneve.stop();
      geneve.attr({opacity: 1.0});
      geneve.transform(geneve.localMatrix);

      contact.stop();
      contact.attr({opacity: 0.0});
  }

  reset();
  animate();

  ifvisible.on("blur", function(){
    reset();
  });

  ifvisible.on("focus", function(){
    animate();
  });

  svg.click(function(){
    reset();
    animate();
  });
}

}

