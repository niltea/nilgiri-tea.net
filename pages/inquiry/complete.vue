<template lang="pug">
  .page-wrapper
    //PageHeader
    .section.section-link
      h2 お問い合わせ完了
      .confirmWrapper
        | お問い合わせ内容を送信しました。
        br
        | 必要な場合、準備会より返信を行いますのでお待ちください。
        br
        NuxtLink(to="/") トップへ
</template>

<script>
export default {
  data () {
    return {
      contact: {
        name  : '',
        gender: '',
        mail  : '',
        type  : '',
        body  : '',
        route : [],
      },
    };
  },
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
