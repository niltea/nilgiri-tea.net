<template lang="pug">
  .page-wrapper
    PageHeader
    .payment
      h2 Nilgiri Tea 主催各イベント参加費のお支払い
      .lead
        |{{eventID}}
        |○○の参加費お支払いを行います

        .hoge
          .hoge スペース数を選択してください
          input#space-1(type="radio" name="count", value="1")
          label(for="space-1") 1スペース
          input#space-2(type="radio" name="count", value="2")
          label(for="space-1") 2スペース
          .hoge.checkbox 1スペース
          .hoge.checkbox 2スペース

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
  computed: {
    eventID () {
      return this.$nuxt.$route.params.eventid;
    },
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
