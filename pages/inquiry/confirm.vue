<template lang="pug">
  .page-wrapper
    //PageHeader
    .section.section-link
      h2 Contact
      .confirmWrapper
        h2 お問い合わせ内容の確認
        form(v-on:submit.prevent="submit")
          .confirm-group
            .confirm-key お問い合わせ先イベント
            .confirm-value {{eventName}}
          .confirm-group(v-if="contactData.isCircle")
            .confirm-key サークル名
            .confirm-value {{contactData.circleName}}
          .confirm-group
            .confirm-key(v-if="!contactData.isCircle") お名前
            .confirm-key(v-else) ペンネーム
            .confirm-value {{contactData.name}}
          .confirm-group
            .confirm-key メールアドレス
            .confirm-group__val {{contactData.mail}}

          //- サークル
          .confirm-section(v-if="contactData.isCircle")
            //- 内容修正は特記事項無し
            //- オプション追加
            .confirm-section(v-if="contactData.inquiryCategory === 'addOptions'")
              //- h3 追加内容
              .confirm-group
                .confirm-key 通行証の追加枚数
                .confirm-value {{contactData.ticketCount}}枚
              .confirm-group
                .confirm-key 椅子の追加数
                .confirm-value {{contactData.chairCount}}脚

            //- 振込連絡
            .confirm-section(v-if="contactData.inquiryCategory === 'reportPayment'")
              //- h3 お振り込み内容
              .confirm-group
                .confirm-key お支払い日
                .confirm-value {{contactData.paidDate}}
              .confirm-group
                .confirm-key お支払い金額
                .confirm-value {{contactData.paidPrice}}
              .confirm-group
                .confirm-key お支払い名義
                .confirm-value {{contactData.paidName}}
          .confirm-group(v-if="contactData.inquiryCategory !== 'reportPayment'")
            .confirm-key(v-if="contactData.inquiryCategory === 'correction'") 修正内容
            .confirm-key(v-else-if="contactData.inquiryCategory === 'addOptions'") ご連絡事項
            .confirm-key(v-else) お問い合わせ内容
            .confirm-group__val {{contactData.body}}
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
.confirm-group {
  .confirm-key {
    position: relative;
    margin: 1.4em 0 0.8em;
    padding: .5em .7em;
    border-radius: 3px;
    background-color: #2589d0;
    color: #fff;
  }
}
</style>
