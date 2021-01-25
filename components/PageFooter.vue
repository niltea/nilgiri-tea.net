<template lang="pug">
  footer#mainFooter
    .inner
      .footer-notes
        p: NuxtLink(to="/privacy") プライバシーポリシー
        //- p: NuxtLink(to="/sctl") 特定商取引法に関する表示
        p 本サイトに掲載の各作品の原作者様・関係者様・制作会社様等とは一切関係ありません。
        p Copyright© 2021 Nilgiri Tea All rights reserved.

</template>

<script>
export default {
  computed: {
  },
};
</script>

<style lang="scss" scoped>
/* ===============
footer
================== */
footer {
  position: relative;
  background-color: #000;
  color: #fff;
  font-weight: 300;
  a {
    color: #fff;
  }
  .inner {
    position: relative;
    margin: 0 auto;
  }
  @media screen and (min-width: 751px) {
    margin-top: 100px;
    padding: 80px 30px 80px;
    .inner {
      a:hover {
        text-decoration: none;
      }
    }
    .footer-notes {
      p {
        font-size: 11px;
        & + p {
          margin-top: 1.3em;
        }
      }
    }
  }
  @media screen and (max-width: 750px) {
    margin-top: 80px;
    padding: 80px 30px 80px;
    .inner {
      a:hover {
        text-decoration: none;
      }
    }
    .footer-notes {
      p {
        font-size: 11px;
        & + p {
          margin-top: 1.3em;
        }
      }
    }
  }
}
</style>
