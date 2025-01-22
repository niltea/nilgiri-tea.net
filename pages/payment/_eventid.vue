<template lang="pug">
  .page-wrapper
    PageHeader
    .payment

      .form.selectEvent(v-if="!eventID")
        h3 サークル参加費決済手続き
        p.headLead 決済を行うイベントを選択してください
          br
          |こちらはクレジット決済専用です。
          br
          |銀行振込の場合は、メールに記載のフォームより事前連絡を行ってください。
        .form-group
          .radio-group.form-item.chooseEvent
            template(v-for="event in events")
              input(:id="`event-${event.eventID}`", type="radio", name="event", :value="event.eventID", v-model="selectEvent")
              label(:for="`event-${event.eventID}`") {{event.name}}

        .form-group
          button.button(@click="chooseEvent", v-if="selectEvent") このイベントの決済へ進む

      .form.procedure(v-else-if="!confirmed")
        h3 {{eventOptions.name}} サークル参加費決済手続き
        p.headLead お申込み時の内容を入力してください
          br
          |こちらの画面では申込内容の修正はできません。
          br
          |修正が必要な場合、準備会までお問い合わせください。
        p.headLead
          |こちらはクレジット決済専用です。
          br
          |銀行振込の場合は、メールに記載のフォームより事前連絡を行ってください。
        .procedure-content
          .form-visual(v-if="eventOptions.image.data")
            img(:src="eventOptions.image.data[0].attributes.url", :alt="eventOptions.name")
          .form-content
            .errorMessage(v-if="errorMessage", v-html="errorMessage" )
            .form-group(v-if="eventOptions.eventID === 'options'")
              p.lead 各イベント指定のフォームより申請を行ってから、支払を行ってください。
                br
                | 申請した追加数
              p.lead 各イベント指定のフォームより申請を行ってから、支払を行ってください。
                |追加可能数には制限があります。
                br
                |制限を超えて追加申請を行う場合、指示があるまで本ページでの支払は行わないでください。
                br
                |指示なく支払があった場合、返金ができない場合があります。
            .form-group.spaceCount
              p.lead 申込時のサークル名を入力してください
              input.form-item(name="circleName", value="", v-model="circleName")
              input.form-item(name="circleID", value="", v-model="circleID", type="hidden")

            .form-group.email
              p.lead 申込時のメールアドレスを入力してください
              input.form-item(name="email", value="", v-model="email")

            .form-group.spaceCount(v-if="eventOptions.eventID !== 'options'")
              p.lead スペース数を選択してください
              .radio-group.form-item
                input#space-1(type="radio" name="space", value="1", v-model="spaceCount")
                label(for="space-1") 1スペース
                input#space-2(type="radio" name="space", value="2", v-model="spaceCount")
                label(for="space-2") 2スペース

            .form-group.passCount
              p.lead 通行証の追加数を選択してください
                br
                |準備会より指示があった場合を除き、数量変更は行わないでください。
              .radio-group.form-item
                input#pass-0(type="radio" name="pass", value="0", v-model="passCount")
                label(for="pass-0") なし
                input#pass-1(type="radio" name="pass", value="1", v-model="passCount")
                label(for="pass-1", v-if="eventOptions.price_pass !== '0'") 1枚
                input#pass-2(type="radio" name="pass", value="2", v-model="passCount")
                label(for="pass-2", v-if="eventOptions.price_pass !== '0'") 2枚

            .form-group.chairCount
              p.lead 追加椅子の数を選択してください
                br
                |準備会より指示があった場合を除き、数量変更は行わないでください。
              .radio-group.form-item
                input#chair-0(type="radio" name="chair", value="0", v-model="chairCount")
                label(for="chair-0") なし
                input#chair-1(type="radio" name="chair", value="1", v-model="chairCount")
                label(for="chair-1", v-if="eventOptions.priceChair !== '0'") 1脚
                input#chair-2(type="radio" name="chair", value="2", v-model="chairCount")
                label(for="chair-2", v-if="eventOptions.priceChair !== '0'") 2脚

            .form-group.promoCode(v-if="eventOptions.eventID !== 'options'")
              p.lead 優待コードがある場合は入力してください
              input.form-item(name="formPromoCode", value="", v-model="formPromoCode")
            .errorMessage(v-if="errorMessage", v-html="errorMessage" )
            .form-group.next(:class="{hasError}")
              button.button.next(@click="confirmPayment") 内容の確認へ
      .form.price(v-else)
        h3 決済内容の確認
        .form-text
          p 以下の内容が正しい事をご確認ください
            br
            |サークル名： {{ circleName }}
            br
            |メールアドレス： {{ email }}
            br
            |合計金額： {{ fee.total }}円
        .form-text
          p.lead 決済金額内訳
          p
            span(v-if="eventOptions.eventID !== 'options'")
              |参加費 {{ spaceCount }}スペース: {{ fee.space }}円
            span(v-if="eventOptions.priceIdPass && passCount !== '0'")
              br(v-if="eventOptions.eventID !== 'options'")
              .errorOnConfirm(v-if="hasPassError") 通行証は1スペースあたり1名分まで追加可能です。<br>通行証追加枚数を{{ passCount }}名分へ修正しました。<br>
              |追加サークル通行証 {{ passCount }}名分: {{ fee.pass }}円
            span(v-if="eventOptions.priceIdChair && chairCount !== '0'")
              br
              .errorOnConfirm(v-if="hasChairError") 追加椅子は1スペースあたり1脚まで追加可能です。<br>追加椅子を{{ chairCount }}脚へ修正しました。<br>
              |追加椅子 {{ chairCount }}脚: {{ fee.chair }}円
            span(v-if="promoAttached.isValid === true")
              br
              |コード割引 -{{ this.promoAttached.price }}円
        .form-text
          p.lead 準備会より指示があった場合を除き、<br>「内容を修正する」から椅子・通行証の追加数変更は行わないでください。
        .form-group
          button.button.prev(@click="cancelPayment") 内容を修正する
          button.button.next(@click="checkout") 決済を行う
      .sctl
        a(v-if="eventID",
          :href="`${eventOptions.URL}sctl`",
          target="_blank") 特定商取引法に基づく表示({{eventOptions.name}})
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.STRIPE_KEY);

class Item {
  constructor (options) {
    const itemData = {
      quantity: options.quantity,
    };
    if (options.price) {
      itemData.price = options.price;
    } else {
      itemData.price_data = {
        currency    : 'jpy',
        product_data: {
          name  : options.name,
          images: [options.image],
        },
        unit_amount: options.amount,
      };
    }
    return itemData;
  }
}
const paymentID = '1';
const token = 'ae217d983d262fd4316a672910b9d0db061cd23d0b3af39336bb99ea5a3d951a0a938236b46cd09417c963eda7991fb7998034da549095a4c36f5a1eb656c80a1f6bef064d0c43cd8d2b4f0fe2b40d9f2fab3f855f5e15debbc0a69b6cbf6f4e33be6dea3c6eb555d7c6e81053060ee7f92b302b820922646d087b1807a9c1b1';

export default {
  async asyncData ({ $axios }) {
    const res = await $axios.get(`https://strapi.nilgiri-tea.net/api/payments/${paymentID}?populate=deep,3`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      throw new Error(err);
    });
    return {
      events: (() => {
        const returnObj = {};
        res.data.data.attributes.event.forEach((event) => {
          returnObj[event.eventID] = event;
        });
        return returnObj;
      })(),
    };
  },
  data () {
    return {
      errorMessage : '',
      selectEvent  : '',
      circleName   : '',
      circleID     : '',
      email        : '',
      spaceCount   : 1,
      passCount    : 0,
      chairCount   : 0,
      formPromoCode: '',
      confirmed    : false,
      hasError     : false,
      hasPassError : false,
      hasChairError: false,
      isTest       : process.env.IS_TEST || false,
    };
  },
  computed: {
    eventID () {
      if (this.$nuxt.$route.params.eventid) {
        return this.$nuxt.$route.params.eventid;
      }
      return this.selectedEvent;
    },
    eventOptions () {
      if (!this.isTest) {
        return this.events[this.eventID];
      }
      // テスト環境用：デバッグデータ
      return {
        id: 3,
        eventID: 'debug',
        name: 'デバッグイベント',
        url: 'https://nilgiri-tea.net/',
        priceIdSpace: 'price_1Qjxn8H1HQvEK2BUnQEPNDyw',
        priceSpace: 5000,
        priceIdPass: 'price_1QjxneH1HQvEK2BUG5Pf8qvC',
        pricePass: 1000,
        priceIdChair:'price_1QjxoBH1HQvEK2BUr1BrDV8o',
        priceChair: 500,
        image: { data: [ {
          attributes: {
            url: 'https://image-distribution.nilgiri-tea.net/holo6visual_3ee49ef1cf.jpg'
          }
        } ] },
        promo: [
          {
            id: 5,
            name: 'テスト割引',
            code: 'HOLO9EARLYBIRD',
            promotionId: 'TnTAOzCt',
            price: 500
          },
        ]
      };
    },
    promoCodes () {
      if (!this.eventOptions.promo) {
        return ([]);
      }
      const setting = this.eventOptions.promo;
      return setting.map((promo) => {
        return {
          title: promo.title,
          code : promo.code,
          id   : promo.promotionId,
          price: promo.price,
        };
      });
    },
    promoAttached () {
      if (this.formPromoCode === '') {
        return {
          isValid: false,
        };
      }
      const foundPromo = this.promoCodes.find(candidate => candidate.code === this.formPromoCode);
      if (!foundPromo) {
        return {
          isValid: false,
        };
      }
      return {
        title  : foundPromo.title,
        price  : foundPromo.price,
        priceID: foundPromo.id,
        isValid: true,
      };
    },
    fee () {
      const space = this.eventOptions.priceSpace * this.spaceCount;
      const pass = this.eventOptions.pricePass * this.passCount;
      const chair = this.eventOptions.priceChair * this.chairCount;
      const promo = (this.promoAttached.isValid === true) ? parseInt(this.promoAttached.price, 10) : 0;
      return {
        total: space + pass + chair - promo,
        space,
        pass,
        chair,
        promo,
      };
    },
  },
  mounted () {
    const query = this.$route.query;
    if (query.space && query.space > '0' && query.space < '3') { this.spaceCount = Number(query.space); }
    if (query.pass && this.eventOptions.pricePass !== '0' && query.pass > '0' && query.pass < '3') {
      const passCount = Number(query.pass);
      this.passCount = passCount;
      if (this.spaceCount < passCount) {
        this.hasPassError = true;
        this.passCount = this.spaceCount;
      }
    }
    if (query.chair && this.eventOptions.priceChair !== '0' && query.chair > '0' && query.chair < '3') {
      const chairCount = Number(query.chair);
      this.chairCount = chairCount;
      if (this.spaceCount < chairCount) {
        this.hasChairError = true;
        this.chairCount = this.spaceCount;
      }
    }
    if (query.name) { this.circleName = decodeURI(query.name); }
    if (query.id) { this.circleID = query.id; }
    if (query.email) { this.email = query.email; }
    if (query.code) { this.formPromoCode = query.code; }
    if (query.confirmed === 'true') { this.confirmed = true; }
  },
  methods: {
    chooseEvent () {
      this.$router.push({
        path: `/payment/${this.selectEvent}`,
      });
    },
    confirmPayment () {
      this.hasError = false;
      this.errorMessage = '';
      const errors = [];
      if (this.spaceCount < this.passCount) {
        errors.push('通行証は1スペースあたり1名分まで追加可能です');
      }
      if (this.spaceCount < this.chairCount) {
        errors.push('追加椅子は1スペースあたり1脚まで追加可能です');
      }
      if (!this.circleName) {
        errors.push('サークル名が入力されていません');
      }
      // 後処理
      this.errorMessage = errors.join('<br>');
      if (errors.length !== 0) {
        this.hasError = true;
      } else {
        // エラーがなければ確認済フラグを立てる
        this.confirmed = true;
        this.hasPassError = false;
        this.hasChairError = false;
      }
    },
    cancelPayment () {
      this.confirmed = false;
    },
    async checkout () {
      // 参加費データをitemにいれる
      const items = [];
      if (this.eventOptions.eventID !== 'options') {
        items.push(
          new Item({
            price   : this.eventOptions.priceIdSpace,
            quantity: this.spaceCount,
          }),
        );
      }
      const discounts = [];
      // 通行証
      if (this.eventOptions.priceIdPass && this.passCount !== '0') {
        // item追加
        items.push(new Item({
          price   : this.eventOptions.priceIdPass,
          quantity: this.passCount,
        }));
      }
      // 追加椅子
      if (this.eventOptions.priceIdChair && this.chairCount !== '0') {
        // item追加
        items.push(new Item({
          price   : this.eventOptions.priceIdChair,
          quantity: this.chairCount,
        }));
      }
      // 優待コード
      if (this.promoAttached.isValid === true) {
        // item追加
        discounts.push({
          coupon: this.promoAttached.priceID,
        });
      }

      const metadata = {
        evID      : this.eventOptions.eventID,
        event     : this.eventOptions.name,
        circleName: this.circleName,
        circleID  : this.circleID,
        email     : this.email.replace(/\s/g, ''),
      };

      const stripe = await stripePromise;
      const response = await this.$axios.post(
        `${window.location.origin}/api/checkout`,
        {
          items    : JSON.stringify(items),
          metadata : JSON.stringify(metadata),
          discounts: JSON.stringify(discounts),
        })
        .catch((err) => {
          throw new Error(err);
        });
      const session = await response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        this.errorMessage = result.error.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(#000, .2);
  box-sizing: border-box;
  margin: 100px auto 10px;
  padding: 40px;
  overflow: hidden;
  &.procedure {
    .form-visual {
      img {
        height: auto;
      }
    }
  }
  @media screen and (min-width: 851px) {
    &.procedure {
      .procedure-content {
        display: flex;
        margin-top: 30px;
      }
      .form-visual {
        width: 40%;
        padding-top: 10px;
        img {
          width: 100%;
        }
      }
      .form-content {
        margin-left: 20px;
      }
    }
  }
  @media screen and (max-width: 850px) {
    &.procedure {
      .form-visual {
        margin-top: 30px;
        text-align: center;
        h3 {
          margin-bottom: 40px;
        }
        img {
          width: 80%;
        }
      }
      .form-content {
        margin-top: 40px;
      }
    }
  }
}
h3 {
  font-size: 28px;
  text-align: center;
}
.headLead {
  font-size: 16px;
  text-align: center;
  margin-top: 1em;
}
.errorMessage {
  margin-top: 30px;
  text-align: center;
  font-size: 24px;
  color: $red;
}
.errorOnConfirm {
  font-size: 15px;
  line-height: 1.5em;
  color: $red;
}
.payment {
  margin: 90px auto 0;
  max-width: 900px;
}
.lead {
  font-size: 18px;
  color: $blue;
  +.form-item {
    margin-top: 10px;
  }
}
.form-text {
  margin: 30px 0 0;
  text-align: center;
  p {
    font-size: 20px;
  }
}
.form-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 30px 0 0;
  &:first-child {
    margin-top: 0;
  }
  &.next {
    margin-top: 50px;
    &.hasError {
      margin-top: 10px;
    }
  }

  label {
    display: block;
    margin: 0 0 10px;
    color: $gray;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
  }

  input {
    outline: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    color: $dark-gray;
    background-color: rgba($dark-gray, 0.1);
    transition: 0.1s ease;
    border: 1px solid $black;
    border-radius: 4px;
    line-height: 60px;
    font-size: 28px;
    padding: 0 15px;
    &:focus {
      color: $black;
      background: $white;
    }
  }
}

button {
  outline: none;
  background: $blue;
  border: 0;
  box-sizing: border-box;
  border-radius: 4px;
  color: $white;
  font-family: inherit;
  font-size: 28px;
  line-height: 60px;
  cursor: pointer;
  margin: 2px;
  flex: 1;
  &.prev {
    background: $light-gray;
    border: 1px solid $black;
    color: $black;
  }
  &.next {
    background: $black;
  }
}
.radio-group {
  background: #fff;
  display: flex;
  width: 100%;
  border: 1px solid $light-gray;
  border-radius: 4px;
  font-size: 28px;
  padding: 2px;
  line-height: 60px;
  label {
    flex: 1;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 2px;
    display: block;
    margin: 2px;
    padding: 0 15px;
    text-align: center;
    transition: .2s all ease-in-out;
    border: 1px solid $dark-gray;
  }
  input[type="radio"] {
    display: none;
    &:checked + label {
      background: $blue;
      color: $white;
      border: 1px solid $blue;
    }
  }
}
.sctl {
  margin-top: 100px;
  text-align: center;
}
@media screen and (min-width: 751px) {
  .payment {
    margin-top: 90px;
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

.chooseEvent {
  flex-wrap: wrap;
  label {
    flex: auto;
    max-width: 33%;
  }
}
</style>
