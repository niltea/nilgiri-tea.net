<template lang="pug">
  .page-wrapper
    PageHeader
    About
    nuxt-content(:document="page")
    .section.section-link
      h2 Links
      ul.links
        li: a.contact(href="https://twitter.com/niltea", target="_blank") Twitter
        li: a.contact(href="https://tumblr.nilgiri-tea.net/", target="_blank") Tumblr
        li: a.contact(href="http://github.com/niltea", target="_blank") GitHub

    .section.section-contact
      h2 Contact
      p
        |ご連絡は下記フォームよりお願いします。
        br
        |なお、各即売会については、それぞれのWebサイトへ記載のメールアドレスよりご連絡ください。
      a.contact(href="https://docs.google.com/forms/d/e/1FAIpQLSeFP43yofY-p2GYOdRiv8rNOZIMF2obWYYQ-ZjjbdUVnGPHnA/viewform", target="_blank") contact Form
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('index').fetch();
    return {
      page,
    };
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 751px) {
  .section.section-link {
    ul.links {
      margin-top: 10px;
      li {
        font-size: 18px;
        a {
          margin: 0;
        }
        +li {
          margin-top: 2px;
        }
      }
    }
  }
  .section.section-contact {
    .contact {
      display: inline-block;
      margin-top: 15px;
      font-size: 18px;
    }
  }
}
@media screen and (max-width: 750px) {
  .section.section-link {
    ul.links {
      margin-top: 10px;
      li {
        font-size: 18px;
        a {
          margin: 0;
        }
        +li {
          margin-top: 2px;
        }
      }
    }
  }
  .section.section-contact {
    .contact {
      display: inline-block;
      margin-top: 15px;
      font-size: 18px;
    }
  }
}
</style>
