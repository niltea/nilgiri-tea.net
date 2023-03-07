<template lang="pug">
  .page-wrapper
    //PageHeader
    .section.section-link
      h2 Contact
      .confirmWrapper
        form(v-on:submit.prevent="submit")
          .form-val {{contactData}}
          .form-group
            .form-key 名前
            .form-val {{contactData.name}}
          .form-group
            .form-key 性別
            .form-value {{contactData.gender}}
          .form-group
            .form-group__key メールアドレス
            .form-group__val {{contactData.mail}}
          .form-group
            .form-key お問い合わせ種別
            .form-value {{contactData.type}}
          .form-group
            .form-group__key お問い合わせ内容
            .form-group__val {{contactData.body}}
          .form-group
            .form-key サイトを訪問した経緯
            .form-value
              span(v-for="(item, index) in contactData.route" :key="`route-${index}`") {{item}}
          button.button(type="submit") 送信
          NuxtLink(to="/inquiry/") 修正
</template>

<script>
export default {
  computed: {
    contactData () {
      return this.$store.getters['inquiry/getContact'];
    },
  },
  created () {
    if (!this.contactData.isOK) {
      this.$nuxt.context.redirect('/inquiry/');
    }
  },
  methods: {
    submit () {
      // 送信後、storeに保存していたデータを破棄
      this.$store.dispatch('inquiry/removeAction');
      // 確認画面に遷移
      this.$router.push('/inquiry/complete/');
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
