<template lang="pug">
  .page-header
    h1.logo
      NuxtLink.link(to="/") Nilgiri Tea
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
.logo {
  mix-blend-mode: difference;
}
a {
  display: block;
  width: 100%;
  height: 100%;
  @include txtHide;
}

/* ===============
section - child top
================== */
@media screen and (min-width: 751px) {
  .page-header {
    padding: 80px 0 0;
  }
  .logo {
    width: 360px;
    height: 72px;
    background: url("/img/title-w.png") 0 0 no-repeat;
    background-size: 360px auto;
  }
  @media (-webkit-min-device-pixel-ratio:2), (min-resolution: 2dppx) {
    .logo {
      background: url("/img/title-2x.png") 0 0 no-repeat;
    }
  }
}
@media screen and (max-width: 750px) {
  .page-header {
    padding: 80px 0 0;
  }
  .logo {
    width: 320px;
    height: 64px;
    background: url("/img/title-n.png") 0 0 no-repeat;
    background-size: 320px auto;
    margin: 0 auto;
  }
}
</style>
