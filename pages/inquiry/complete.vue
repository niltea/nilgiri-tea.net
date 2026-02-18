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
        //- p(v-if="contactData.inquiryCategory === 'addOptions'")
          | 続いて、
          NuxtLink(to="/payment/options") お支払いページ
          | より、追加料金のお支払いを行ってください。
          br
          | ※1スペースあたり1枚を超える追加の場合、準備会のご連絡をお待ちください。
          br
          | お申し込みより2日以内にお支払いがない場合は追加申請が無効となります。
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
      this.$nuxt.context.redirect('/inquiry');
    }
  },
  methods: {
    submit () {
      // 送信後、storeに保存していたデータを破棄
      this.$store.dispatch('inquiry/removeAction');
      // 確認画面に遷移
      this.$router.push('/inquiry/complete');
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
