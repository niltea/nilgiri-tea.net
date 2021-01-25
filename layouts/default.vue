<template lang="pug">
  div.wrapper#page-top
    Nuxt
    PageFooter
</template>
<script>
export default {
  mounted () {
    this.$nextTick(function () {
      this.$adobeFonts(document);
    });
  },
};
</script>

<style lang="scss" >
html {
  font-family:
    itc-avant-garde-gothic-pro,
    fot-udkakugo-large-pr6n,
    sans-serif;
  font-size: 13px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #f8f8f8 url("/img/bg.png");
}
.wrapper {
  position: relative;
  z-index: 0;
  font-weight: 0;
  font-style: normal;

  ::selection {
    color: #000;
    background-color: #33c5ff;
  }
  >>> a {
    outline: none;
    text-decoration: underline;
    &:link,
    &:visited {
      color: #111;
    }
  }
  >>> button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }
  h2 {
    font-weight: 500;
  }
  @media screen and (min-width: 751px) {
    >>> .onlySP {
      display: none;
    }
  }
  @media screen and (max-width: 750px) {
    >>> .onlyPC {
      display: none;
    }
  }
}

h2 {
  font-weight: 700;
}
@media screen and (min-width: 751px) {
  .page-wrapper {
    padding: 0 30px;
  }
  .section {
    margin-top: 80px;
  }
  h2 {
    font-size: 32px;
    margin-top: 40px;
    margin-bottom: 15px;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    font-size: 12px;
    line-height: 2em;
  }
  ul {
    margin-top: 35px;
    li {
      font-size: 10px;
      line-height: 2em;
      a {
        display: inline-block;
        margin-bottom: 10px;
      }
      +li {
        margin-top: 40px;
      }
    }
  }
  .nuxt-content {
    margin-top: 90px;
  }
  .contact {
    display: inline-block;
    margin-top: 15px;
  }
}
@media screen and (max-width: 750px) {
  .page-wrapper {
    padding: 0 30px;
  }
  .section {
    margin-top: 60px;
  }
  h2 {
    font-size: 30px;
    margin-top: 60px;
    margin-bottom: 15px;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    font-size: 12px;
    line-height: 2em;
  }
  ul {
    margin-top: 35px;
    li {
      font-size: 10px;
      line-height: 2em;
      a {
        display: inline-block;
        margin-bottom: 10px;
      }
      +li {
        margin-top: 40px;
      }
    }
  }
  .nuxt-content {
    margin-top: 90px;
  }
  .contact {
    display: inline-block;
    margin-top: 15px;
  }
}
a {
  color: #000000;
  &:visited {
    color: #646;
  }
}
</style>
