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

          .confirm-group(v-if="contactData.inquiryCategory !== 'reportPayment'")
            .confirm-key(v-if="contactData.inquiryCategory === 'correction'") 修正内容
            .confirm-key(v-else-if="contactData.inquiryCategory === 'addOptions'") ご連絡事項
            .confirm-key(v-else) お問い合わせ内容
            .confirm-group__val(v-html="replaceBR(contactData.body)")
          .button-wrapper
            button.button-submit(disabled="disabled", :class="{isProgress}"): NuxtLink.button-inner(to="/inquiry/") 修正
            button.button-submit(type="submit", :disabled="isProgress", :class="{isProgress}"): span.button-inner 送信
</template>

<script>
export default {
  data () {
    return {
      isProgress: false,
    };
  },
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
    replaceBR (text) {
      return text.replace(/\n/g, '<br>');
    },
    async submit () {
      this.isProgress = true;
      console.log(this.replaceBR(this.contactData.body))
      const response = await this.$axios.post(
        'https://usebasin.com/f/4993e557a6b6',
        {
          event          : this.contactData.event,
          isCircle       : this.contactData.isCircle,
          inquiryCategory: this.inquiryCategory,
          ticketCount    : this.contactData.ticketCount,
          chairCount     : this.contactData.chairCount,
          paidName       : this.contactData.paidName,
          name           : this.contactData.name,
          circleName     : this.contactData.circleName,
          email          : this.contactData.mail,
          body           : this.replaceBR(this.contactData.body),
        })
        .catch((err) => {
          throw new Error(err);
        });
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
.button-wrapper {
  display: flex;
  width: 520px;
  margin: 0 auto;
}
.button-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin:0 auto;
  padding: 0;
  border: 1px solid #2589d0;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  .button-inner {
    font-size: 18px;
    font-weight: 400;
    text-decoration: none;
    display: block;
    padding: .9em 2em;
    width: 100%;
    height: 100%;
    color: #2589d0;
    box-sizing: border-box;
  }
  &.isProgress {
    opacity: 0.5;
    pointer-events: none;
  }
  &:not(.isProgress):hover {
    background-color: #2589d0;
    .button-inner {
      color: #fff;
    }
  }
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
