<template>
    <div class="loading" v-show="isShow">
      <div class="stick"></div>
      <div class="stick"></div>
      <div class="stick"></div>
      <div class="stick"></div>
      <div class="stick"></div>
      <div class="stick"></div>

      <h1>Loading...</h1>

    </div>
</template>

<style lang="scss">
/* Loader #1 by Sam Lillicrap
   https://www.samueljwebdesign.co.uk
   https://codepen.io/samueljweb/pen/LbGxi
*/

$text_color: #BCD5D1;
$stick_color: #BCD5D1; //Changes the colour of all sticks
$stick_length: 30px; //Changes length of all sticks
$stick_distance: -8px; //Changes distance between sticks (will need editing after 30px)

.loading {
  margin:auto;
  vertical-align: middle;

  h1 {
    font-family: 'Lucida Family';
    color:$text_color;
    text-transform: uppercase;
    font-size:1em;
    letter-spacing:1.5px;
    text-align:center;
    width: $stick_length * 5 - $stick_distance;
    margin-top:20px;
    animation: fade 2s infinite;
  }
}

.stick {
  width: $stick_length;
  height:3px;
  background:$stick_color;
  display:inline-block;
  margin-right:$stick_distance;
}

.stick:nth-child(n) {
  transform:rotate(30deg);
  animation: fall 2s infinite;
}
.stick:nth-child(2n) {
  transform:rotate(-30deg);
  animation: rise 2s infinite;
}

@keyframes rise {
  50% {transform:rotate(30deg)}
}

@keyframes fall {
  50% {transform:rotate(-30deg)}
}

@keyframes fade {
   50% {opacity:0.5}
  100% {opacity:1}
}
</style>

<script>
export default {
    data: function() {
        return {
            isShow: false
        }
    },
    methods: {
        show: function() {
            this.isShow = true;
        },
        hide: function() {
            this.isShow = false;
        }
    }
}
</script>