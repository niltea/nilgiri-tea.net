<template lang="pug">
  .page-wrapper
    //PageHeader
    .section.section-link
      h2 Contact
      .contactWrapper
        .form-val {{contactData}}
        form(v-on:submit.prevent="submit")
          .form-section
            .form-group
              .form-key お問い合わせ先のイベントを選択してください
              .form-value
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
                  | イベント共通・主催者についてのお問い合わせ
          // イベントについて
          .form-section(v-if="contact.event === 'vggc' || contact.event === 'holokle'")
            .form-group
              .form-key サークル参加・一般参加のいずれかを選択してください。
              .form-value
                label(for="isCircle-true")
                  input.input-radio#isCircle-true(
                    type="radio",
                    name="isCircle",
                    :value="true",
                    v-model="contact.isCircle",
                  )
                  | サークル参加
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
                .form-group__key ご連絡先のメールアドレス
                .form-group__val
                  input.input-text(type="email" name="mail" v-model="contact.mail")
              .form-group
                .form-group__key サークル名
                .form-group__val
                  input.input-text(type="text" name="circleName" class="c-input-text" v-model="contact.circleName")
              .form-group
                .form-group__key ペンネーム
                .form-group__val
                  input.input-text(type="text" name="name" class="c-input-text" v-model="contact.name")
              .form-group
                .form-key お問い合わせ種別を選択してください。
                .form-value
                  label
                    input(value="correction", type="radio", name="type", v-model="contact.inquiryCategory")
                    | サークル参加申込内容の修正・変更（オプション追加以外）
                  label
                    input(value="addOptions", type="radio", name="type", v-model="contact.inquiryCategory")
                    | サークル通行証または椅子の追加
                  label
                    input(value="reportPayment", type="radio", name="type", v-model="contact.inquiryCategory")
                    | 参加費ご入金連絡（銀行振込）
                  label
                    input(value="others", type="radio", name="type", v-model="contact.inquiryCategory")
                    | その他のご連絡・お問い合わせ

              // サークル参加者の問い合わせ
              .form-section(v-if="contact.inquiryCategory === 'correction'")
                .form-group
                  .form-key
                    |変更後の参加情報をお知らせください。
                    br
                    |どの項目を変更するか、お申込み確認メールを参照し明記してください。
                    br
                    |変更内容だけの記載しかない場合、ご対応できない場合があります。
                  .form-value
                    textarea.input-textarea(name="body" v-model="contact.body")
                button.button(type="submit") 確認

              // サークル通行証または椅子の追加
              .form-section(v-if="contact.inquiryCategory === 'addOptions'")
                p
                  | 通行証は標準で2名分（2スペース参加の場合は4名分）が参加費に含まれています。
                  br
                  | 頒布上必要な場合に限り、1スペースあたり1名分追加できます。
                p
                  | 椅子は標準で1脚（2スペース参加の場合は2脚）が参加費に含まれています。
                  br
                  | 1スペースあたり1脚追加できます。

                p
                  | やむを得ない理由がある場合、上記の制限を超えて追加が可能です。
                  br
                  |「ご連絡事項」へ詳細・追加する数量・追加理由をご記入ください。

                .form-group
                  .form-key
                    | 通行証の追加数
                  .form-value
                    select.select(name="ticketCount", v-model="contact.ticketCount")
                      option(value="0") 0
                      option(value="1") 1
                      option(value="2") 2
                .form-group
                  .form-key
                    | 椅子の追加数
                  .form-value
                    select.select(name="chairCount", v-model="contact.chairCount")
                      option(value="0", selected="selected") 0
                      option(value="1") 1
                      option(value="2") 2
                .form-group
                  .form-group__key ご連絡事項
                  .form-group__val
                    textarea.input-textarea(name="body" v-model="contact.body")
                button.button(type="submit") 確認

              // 参加費ご入金連絡（銀行振込）
              .form-section(v-if="contact.inquiryCategory === 'reportPayment'")
                p
                  | スムーズにお支払いを確認するため、補足情報をご記載ください。
                  br
                  | 既に準備会より入金確認のご連絡を行っている場合、本フォームでの報告は不要です。
                  br
                  | クレジットカード決済の場合も自動で必要事項を取得していますのでご連絡不要です。
                .form-group
                  .form-group__key お支払い日
                  .form-group__val
                    input.input-text(type="date" name="paidDate" v-model="contact.paidDate")
                .form-group
                  .form-group__key お支払い金額
                  .form-group__val
                    input.input-text(type="number" name="paidPrice" v-model="contact.paidPrice")
                    | 円
                .form-group
                  .form-group__key お支払い名義（カタカナで入力）<br>※サークル名でお振り込みされた場合は記入不要
                  .form-group__val
                    input.input-text(type="text" name="paidName" v-model="contact.paidName")
                button.button(type="submit") 確認

              // その他のご連絡・お問い合わせ
              .form-section(v-if="contact.inquiryCategory === 'others'")
                .form-group
                  .form-group__key お問い合わせ内容
                  .form-group__val
                    textarea.input-textarea(name="body" v-model="contact.body")
                button.button(type="submit") 確認

          .form-section(v-if="contact.event === 'nilgiri' || (contact.isCircle !== 'nilgiri' && contact.isCircle === false)")
            .form-group
              .form-group__key メールアドレス
              .form-group__val
                input.input-text(type="email" name="mail" v-model="contact.mail")
            .form-group
              .form-group__key 名前
              .form-group__val
                input.input-text(type="text" name="name" class="c-input-text" v-model="contact.name")
            .form-group
              .form-group__key お問い合わせ内容
              .form-group__val
                textarea.input-textarea(name="body" v-model="contact.body")
            button.button(type="submit") 確認
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
    };
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
    submit () {
      // storeに保存
      this.$store.dispatch('inquiry/setFormData', this.contact);
      // 確認画面に遷移
      this.$router.push('/inquiry/confirm/');
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  & + .form-group {
    margin-top: 30px;
  }
}
.form-section {
  &:not(:first-child) {
    margin-top: 50px;
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
</style>
