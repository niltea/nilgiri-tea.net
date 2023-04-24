<template lang="pug">
  .page-wrapper
    //PageHeader
    .section.section-link
      h2 Contact
      .confirmWrapper
        h2 お問い合わせ内容の確認
        form(v-on:submit.prevent="submit")
          .form-group
            .form-key イベント
            .form-value {{eventName}}
          .form-group
            .form-key お名前
            .form-val {{contactData.name}}
          .form-group
            .form-group__key メールアドレス
            .form-group__val {{contactData.mail}}

          //- サークル
          .confirm-section(v-if="contactData.isCircle")
            //- 内容修正は特記事項無し
            //- オプション追加
            .confirm-section(v-if="contactData.inquiryCategory === 'addOptions'")
              h3 追加内容
              .form-group
                .form-group__key 通行証の追加枚数
                .form-value {{contactData.ticketCount}}枚
              .form-group
                .form-group__key 椅子の追加数
                .form-value {{contactData.chairCount}}脚

            //- 振込連絡
            .confirm-section(v-if="contactData.inquiryCategory === 'reportPayment'")
              h3 お振り込み内容
              .form-group
                .form-group__key お支払い日
                .form-value {{contactData.paidDate}}
              .form-group
                .form-group__key お支払い金額
                .form-value {{contactData.paidPrice}}
              .form-group
                .form-group__key お支払い名義
                .form-value {{contactData.paidName}}
          .form-group(v-if="contactData.inquiryCategory !== 'reportPayment'")
            .form-group__key(v-if="contactData.inquiryCategory === 'correction'") 修正内容
            .form-group__key(v-else-if="contactData.inquiryCategory === 'addOptions'") ご連絡事項
            .form-group__key(v-else) お問い合わせ内容
            .form-group__val {{contactData.body}}
          button.button-submit(type="submit") 送信
          NuxtLink.button-submit(to="/inquiry/") 修正
</template>

<script>
export default {
  computed: {
    contactData () {
      return this.$store.getters['inquiry/getContact'];
    },
    eventName () {
      switch (this.contactData.event) {
        case 'vggc':
          return 'VGGC（「ぶいすぽっ！」オンリーイベント）';
        case 'holokle':
          return 'ホロクル（「ホロライブプロダクション」オンリーイベント）';
        default:
          return 'イベント共通のお問い合わせ';
      }
    },
    inquiryCategory () {
      switch (this.contactData.inquiryCategory) {
        case 'correction':
          return 'サークル参加申込内容の修正・変更';
        case 'addOptions':
          return 'サークル通行証または椅子の追加';
        case 'reportPayment':
          return '参加費ご入金連絡（銀行振込）';
        default:
          return 'その他のご連絡・お問い合わせ';
      }
    },
  },
  created () {
    if (!this.contactData.isOK) {
      this.$nuxt.context.redirect('/inquiry/');
    }
  },
  methods: {
    async submit () {
      const payload = {
        event          : this.contactData.event,
        isCircle       : this.contactData.isCircle,
        inquiryCategory: this.contactData.inquiryCategory,
        ticketCount    : this.contactData.ticketCount,
        chairCount     : this.contactData.chairCount,
        paidDate       : this.contactData.paidDate,
        paidPrice      : this.contactData.paidPrice,
        paidName       : this.contactData.paidName,
        name           : this.contactData.name,
        circleName     : this.contactData.circleName,
        mail           : this.contactData.mail,
        body           : this.contactData.body,
      };

      const response = await this.$axios.post(
        `${window.location.origin}/api/mailer`,
        {
          payload,
        })
        .catch((err) => {
          throw new Error(err);
        });
      console.log(response);
      if (response.data.error === true) {
        this.errorMessage = response.text;
        console.log('err');
        console.log(response.err);
        return;
      }
      console.log('ok');
      console.log(response);
      // 送信後、storeに保存していたデータを破棄
      this.$store.dispatch('inquiry/removeAction');
      // 確認画面に遷移
      this.$router.push('/inquiry/complete/');
    },
  },
};
</script>

<style lang="scss" scoped>
.button-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin:0 auto;
  padding: .9em 2em;
  border: 1px solid #2589d0;
  border-radius: 5px;
  background-color: #fff;
  color: #2589d0;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  box-sizing: border-box;
}
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
