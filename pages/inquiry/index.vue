<template lang="pug">
  .page-wrapper
    PageHeader
    .section.section-link
      .contactWrapper
        h2 Nilgiri Tea 主催イベントへのお問い合わせ
        p 本フォームによるお問い合わせについては、ご回答そのもののお約束をするものではありません。
          br
          |また、一定期間内のご回答をお約束することもできかねますので、あらかじめご了承ください。
        form(v-on:submit.prevent="submit")
          .form-section
            .form-group
              .form-header お問い合わせ先のイベントを選択してください
              .form-value.form-radio
                label(for="event-vggc")
                  input.input-radio#event-vggc(
                    type="radio",
                    name="event",
                    value="vggc",
                    v-model="contact.event",
                  )
                  | VGGC（「ぶいすぽっ！」オンリーイベント）
                label(for="event-holo")
                  input.input-radio#event-holo(
                    type="radio",
                    name="event",
                    value="holokle",
                    v-model="contact.event",
                  )
                  | ホロクル（「ホロライブプロダクション」オンリーイベント）
                label(for="event-nilgiri")
                  input.input-radio#event-nilgiri(
                    type="radio",
                    name="event",
                    value="nilgiri",
                    v-model="contact.event",
                  )
                  | イベント共通のお問い合わせ
          // イベントについて
          .form-section(v-if="contact.event === 'vggc' || contact.event === 'holokle'")
            .form-group
              .form-header サークル参加・一般参加のいずれかを選択してください。
              p.form-note サークル参加者（申込予定含む）の方は「サークル参加」を選択してください。<br>正しく選択されない場合、ご対応が遅れる場合があります。<br>スムーズなご対応のためご協力をお願いいたします。
              .form-value.form-radio
                label(for="isCircle-true")
                  input.input-radio#isCircle-true(
                    type="radio",
                    name="isCircle",
                    :value="true",
                    v-model="contact.isCircle",
                  )
                  | サークル参加の方（お申込み予定含む）
                label(for="isCircle-false")
                  input.input-radio#isCircle-false(
                    type="radio",
                    name="isCircle",
                    :value="false",
                    v-model="contact.isCircle",
                  )
                  | 一般参加者の方・その他のお問い合わせ

            // サークル参加者の問い合わせ
            .form-section(v-if="contact.isCircle === true")
              h2 サークル参加者の問い合わせ
              .form-group
                .form-group__val.form-input
                  label ご連絡先のメールアドレス
                  .err(v-if="error.mail === true") メールアドレスが正しく入力されていません
                  input.input-text(name="mail" v-model="contact.mail")
              .form-group
                .form-group__val.form-input
                  label サークル名
                  .err(v-if="error.circleName === true") サークル名が入力されていません
                  input.input-text(type="text" name="circleName" class="c-input-text" v-model="contact.circleName")
              .form-group
                .form-group__val.form-input
                  label ペンネーム
                  .err(v-if="error.name === true") ペンネームが入力されていません
                  input.input-text(type="text" name="name" class="c-input-text" v-model="contact.name")
              .form-group
                .form-header お問い合わせ種別を選択してください。
                .form-value.form-radio
                  label
                    input(value="correction", type="radio", name="type", v-model="contact.inquiryCategory")
                    | サークル参加申込内容の修正・変更（通行証・椅子の追加を除く）
                  label
                    input(value="addOptions", type="radio", name="type", v-model="contact.inquiryCategory")
                    | サークル通行証または椅子の追加
                  label
                    input(value="others", type="radio", name="type", v-model="contact.inquiryCategory")
                    | その他のご連絡・お問い合わせ

              // サークル参加申込内容の修正・変更（オプション追加以外）
              .form-section(v-if="contact.inquiryCategory === 'correction'")
                .form-group
                  .form-header 変更後の参加情報
                  p.form-note
                    |変更後の参加情報をお知らせください。
                    br
                    |どの項目を変更するか、お申込み確認メールを参照し明記してください。
                    br
                    |変更内容だけのみ記載されている場合、ご対応できません。
                  .form-value.form-textarea
                    .err(v-if="error.body === true") 変更内容が入力されていません
                    textarea.input-textarea(name="body" v-model="contact.body")
                .form-group
                  .err.center(v-if="error.hasError === true") 入力項目にエラーがあります。
                  button.button-submit(type="submit") 確認

              // サークル通行証の追加
              .form-section(v-if="contact.inquiryCategory === 'addOptions'")
                .form-header 追加数量の選択
                p.form-note
                  | 椅子の追加は当日のみの受け付けとなります。
                p.form-note
                  span.red.bold
                    | 参加費お支払い後の変更はできません。
                  br
                  | ただし頒布上やむを得ない理由がある場合に限り受け付ける場合があります。
                  br
                  | この場合、かならず理由を明記したうえでお問い合わせください。
                .form-group
                  .form-header
                    | 通行証の追加数
                  .form-value.input-select
                    label
                      select.select(name="ticketCount", v-model="contact.ticketCount")
                        option(value="0") 0
                        option(value="1") 1
                        option(value="2") 2
                .form-group
                  .form-group__val.form-textarea
                    label ご連絡事項
                    textarea.input-textarea(name="body" v-model="contact.body")
                .form-group
                  .err.center(v-if="error.hasError === true") 入力項目にエラーがあります。
                  button.button-submit(type="submit") 確認

              // その他のご連絡・お問い合わせ
              .form-section(v-if="contact.inquiryCategory === 'others'")
                .form-group
                  .form-group__val.form-textarea
                    label お問い合わせ内容
                    .err(v-if="error.body === true") お問い合わせ内容が入力されていません
                    textarea.input-textarea(name="body" v-model="contact.body")
                .form-group
                  .err.center(v-if="error.hasError === true") 入力項目にエラーがあります。
                  button.button-submit(type="submit") 確認

          .form-section(v-if="contact.event === 'nilgiri' || (contact.isCircle !== 'nilgiri' && contact.isCircle === false)")
            .form-group
              .form-group__val.form-input
                label ご連絡先のメールアドレス
                .err(v-if="error.mail === true") メールアドレスが正しく入力されていません
                input.input-text(name="mail" v-model="contact.mail")
            .form-group
              .form-group__val.form-input
                label お名前
                .err(v-if="error.name === true") お名前が入力されていません
                input.input-text(type="text" name="name" class="c-input-text" v-model="contact.name")
            .form-group
              .form-group__val.form-textarea
                label お問い合わせ内容
                .err(v-if="error.body === true") お問い合わせ内容が入力されていません
                textarea.input-textarea(name="body" v-model="contact.body")
            .form-group
              .err.center(v-if="error.hasError === true") 入力項目にエラーがあります。
              button.button-submit(type="submit") 確認
</template>

<script>
export default {
  data () {
    return {
      contact: {
        event          : null,
        isCircle       : null,
        inquiryCategory: '',
        ticketCount    : 0,
        chairCount     : 0,
        paidDate       : '',
        paidPrice      : 0,
        paidName       : '',
        name           : '',
        circleName     : '',
        mail           : '',
        body           : '',
      },
      error: {
        hasError  : false,
        mail      : false,
        name      : false,
        body      : false,
        circleName: false,
        paidDate  : false,
        paidPrice : false,
      },
    };
  },
  mounted () {
    const queryEvent = this.$nuxt.$route.query.event;
    if (queryEvent === 'vggc' || queryEvent === 'holokle') {
      this.contact.event = queryEvent;
    }
  },
  created () {
    const contactData = this.$store.getters['inquiry/getContact'];
    // データコピー
    this.contact.event = contactData.event;
    this.contact.isCircle = contactData.isCircle;
    this.contact.inquiryCategory = contactData.inquiryCategory;
    this.contact.ticketCount = contactData.ticketCount;
    this.contact.chairCount = contactData.chairCount;
    this.contact.paidDate = contactData.paidDate;
    this.contact.paidPrice = contactData.paidPrice;
    this.contact.paidName = contactData.paidName;
    this.contact.name = contactData.name;
    this.contact.circleName = contactData.circleName;
    this.contact.mail = contactData.mail;
    this.contact.body = contactData.body;

    this.$store.dispatch('inquiry/resetOKFlag');
  },
  methods: {
    checkForm () {
      // メールチェック
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      this.error.mail = !reg.test(this.contact.mail);
      // 名前チェック
      this.error.name = (this.contact.name === '');
      this.error.hasError = (this.error.mail || this.error.name);
      // body
      if (!this.contact.isCircle) {
        // 一般参加者
        this.error.body = (this.contact.body === '');
        this.error.circleName = false;
        this.error.hasError = (this.error.hasError || this.error.body);
      } else {
        // サークル
        this.error.body = false;
        this.error.circleName = (this.contact.circleName === '');
        if (!(this.contact.inquiryCategory === 'addOptions')) {
          this.error.body = (this.contact.body === '');
        }
        this.error.hasError = (this.error.hasError || this.error.body || this.error.circleName);
      }
      this.error.hasError = (this.error.hasError || this.error.body || this.error.circleName);
    },
    submit () {
      this.checkForm();
      if (this.error.hasError === true) {
        return;
      }
      // storeに保存
      this.$store.dispatch('inquiry/setFormData', this.contact);
      // 確認画面に遷移
      this.$router.push('/inquiry/confirm/');
    },
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: #f00;
}
.bold {
  font-weight: 700;
}
.form-group {
  margin-top: 30px;
}
.form-section {
  margin-top: 4em;
  &:first-child {
    margin-top: 0;
  }
}
.contactWrapper {
  max-width: 900px;
  margin: 0 auto;
  form {
    width: 100%;
    background-color: #fff;
    padding: 1em;
    .form-group {
      width: 100%;
      position: relative;
      &:first-child {
        margin-top: 0;
      }
    }
    .form-header {
      font-weight: normal;
      padding: 1em 0;
      box-sizing: border-box;
    }
    .form-value {}
  }
}
.form-input,
.form-textarea {
  color: #333;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: .4em;
  }
}
.input-text,
.input-textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d2d2d2;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 1em;
  line-height: 1.5;
  background: #f7f7f7;
  &::placeholder {
    color: #999;
  }
}

.form-radio {
  border: none;
  label {
    display: flex;
    align-items: center;
    gap: 0 .5em;
    position: relative;
    margin-bottom: .4em;
    padding: .5em .7em;
    border: 1px solid #2589d0;
    border-radius: 3px;
    background-color: #f7f7f7;
    cursor: pointer;
    &:has(:checked) {
      background-color: #2589d0;
      color: #fff;
    }
    &:before,
    &:has(:checked)::after {
      border-radius: 50%;
      content: '';
    }
    &:before {
      width: 14px;
      height: 14px;
      background-color: #fff;
      border: 1px solid #2589d0;
    }
    &:has(:checked)::after {
      position: absolute;
      top: 50%;
      left: calc(8px + .7em);
      transform: translate(-50%, -50%);
      width: 7px;
      height: 7px;
      background-color: #2589d0;
    }
  }
  input {
    display: none;
  }
}
.input-select {
  position: relative;
  &::before,
  &::after {
    position: absolute;
    content: '';
    pointer-events: none;
  }
  &::before {
    right: 0;
    display: inline-block;
    width: 2.8em;
    height: 2.8em;
    border-radius: 0 3px 3px 0;
    background-color: #2589d0;
    content: '';
  }
  &::after {
    position: absolute;
    top: 50%;
    right: 1.4em;
    transform: translate(50%, -50%) rotate(45deg);
    width: 6px;
    height: 6px;
    border-bottom: 3px solid #fff;
    border-right: 3px solid #fff;
    content: '';
  }
  select {
    width: 100%;
    appearance: none;
    min-width: 230px;
    height: 2.8em;
    padding: .4em 3.6em .4em .8em;
    border: 1px solid #2589d0;
    border-radius: 3px;
    color: #333333;
    font-size: 1em;
    cursor: pointer;
    &:focus {
      outline: 1px solid #2589d0;
    }
  }
}
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
  &:hover {
    background-color: #2589d0;
    color: #fff;
    .button-inner {
      color: #fff;
    }
  }
}
.form-header {
  font-size: 20px;
}
.form-note {
  font-size: 14px;
  & + .form-note {
    margin-top: 1em;
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
  .contactWrapper {
    width: 95%;
  }
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
.err {
  color: red;
  margin: .5em 0;
  &.center {
    text-align: center;
  }
}
</style>
