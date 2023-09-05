<template>
  <div class="moving-letters">
    <h1 class="ml10">
      <span class="text-wrapper">
        <div>
          <span v-for="(letter,i) in '流动性挖矿'" :key="i" class="letter">{{ letter }}</span>
        </div>
        <div>
          <span v-for="(letter,i) in '高杠杆'" :key="i" class="letter1">{{ letter }}</span>
        </div>
        <div>
          <span v-for="(letter,i) in '零滑点'" :key="i" class="letter2">{{ letter }}</span>
        </div>
        <h2 class="text">
          <span v-for="(letter,i) in 'Archimedes'" :key="i">{{ letter }}</span>
        </h2>
      </span>
    </h1>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
const ml = { timelines: {}};

export default {
  name: "firstScreenAd",
  mounted() {
    ml.timelines["ml10"] = anime.timeline({loop: false})
        .add({
          targets: '.ml10 .letter',
          rotateY: [-90, 0],
          duration: 1300,
          delay: function(el, i) {
            return 45 * i + 800;
          }
        })
        .add({
          targets: '.ml10 div .letter',
          // opacity: 0,
          'font-size': '6vw',
          duration: 600,
          easing: "easeInExpo",
        })
        .add({
          targets: '.ml10 div .letter1',
          rotateY: [-90, 0],
          duration: 1300,
          delay: function(el, i) {
            return 45 * i;
          }
        })
        .add({
          targets: '.ml10 div .letter2',
          rotateY: [-90, 0],
          duration: 1300,
          delay: function(el, i) {
            return 45 * i;
          }
        })
        .add({
          targets: '.ml10 div',
          opacity: 0,
          scale: 3,
          duration: 600,
          easing: "easeInExpo",
          // delay: 500
        })
        .add({
          targets: '.ml10 .text span',
          translateY: [-600,0],
          scale: [10,1],
          opacity: [0,1],
          easing: "easeOutExpo",
          duration: 600,
          delay: anime.stagger(100),
        })
        .add({
          targets: '.ml10',
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        })
  }
}
</script>

<style lang="scss" scoped>
body {
  font: 13px "Source Sans Pro", Arial, Helvetica, sans-serif;
  //background-color: #224a54;
  color: #fff;
  text-align: center;
}

.moving-letters {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  color: white;
  //background: #2b2d44;
  background: #0e1623;
}
.ml10 {
  font-weight: 900;
  font-size: 10vw;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.ml10 .text-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.2em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  //overflow: hidden;

  div {
    text-align: center;
  }
}

.ml10 .letter {
  display: inline-block;
  line-height: 1em;
  transform-origin: 0 0;
}
.ml10 .letter1 {
  display: inline-block;
  line-height: 1em;
  transform-origin: 0 0;
}
.ml10 .letter2 {
  display: inline-block;
  line-height: 1em;
  transform-origin: 0 0;
}

//.text-wrapper {
//  position: relative;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  min-height: 100vh;
//  background: #0e1623;
//  overflow: hidden;
//}
.text-wrapper .text {
  position: absolute;
  font-size: 7vw;
  text-align: center;
  color: #00fe77;
  //color: #00bed7;
  -webkit-box-reflect: below -5.4vw linear-gradient(transparent,#0004);
  white-space: nowrap;
}
.text-wrapper .text span {
  position: relative;
  display: inline-block;
  opacity: 0;
}
</style>
