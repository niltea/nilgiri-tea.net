<template lang="pug">
  .about
    h2 渋澤タカシ
    p.about-text
      |Nilgiri Tea is named after the black tea
      |grown and processed in the Nilgiris district of India.
      |working since 2008
      |Planning and hold comic conventions,
      |Produce Websites, Designing, also Drawing illustrations.
</template>

<style lang="scss" scoped>
h2,
p {
  @include txtHide;
}
@media screen and (min-width: 751px) {
  .about {
    margin-top: 60px;
  }
  h2,
  p {
    width: 321px;
    background: url("/img/about-w.png") 0 0 no-repeat;
    background-size: 321px auto;
  }
  h2 {
    height: 30px;
  }
  p {
    height: 106px;
    background-position: 0 -30px;
  }
  @media (-webkit-min-device-pixel-ratio:2), (min-resolution: 2dppx) {
    h2,
    p {
      background-image: url("/img/about-2x.png");
    }
  }
}
@media screen and (max-width: 750px) {
  .about {
    width: 321px;
    margin: 60px auto 0;
  }
  h2,
  p {
    width: 321px;
    background: url("/img/about-2x.png") 0 0 no-repeat;
    background-size: 321px auto;
  }
  h2 {
    height: 30px;
  }
  p {
    height: 106px;
    background-position: 0 -30px;
  }
}
</style>
