<template lang="pug">
  .page-wrapper
    PageHeader
    .payment
      h2 Nilgiri Tea 主催各イベント参加費のお支払い

      .selectEvent(v-if="!eventID")
        .lead お支払いを行うイベントを選択してください。
        select(v-model="selectEvent")
          option(disabled, value="") こちらより選択
          option(value="vggc-1st") VGGC
          option(value="holokle-2nd") ホロクル 2nd
        button.button(@click="chooseEvent", v-if="selectEvent") このイベントの支払いへ進む

      .procedure(v-else-if="!confirmed")
        |{{eventOptions.name}}の参加費お支払いを行います
        .formWrapper.spaceCount
          .lead 申込時のサークル名を入力してください
          input(name="circleName", value="", v-model="circleName")

        .formWrapper.spaceCount
          .lead スペース数を選択してください
          dl
            dt: input#space-1(type="radio" name="space", value="1", v-model="spaceCount")
            dd: label(for="space-1") 1スペース
          dl
            dt: input#space-2(type="radio" name="space", value="2", v-model="spaceCount")
            dd: label(for="space-2") 2スペース

        .formWrapper.passCount
          .lead 追加する通行証はありますか？
          dl
            dt: input#pass-0(type="radio" name="pass", value="0", v-model="passCount")
            dd: label(for="pass-0") なし
          dl(v-if="eventOptions.price_pass !== 0")
            dt: input#pass-1(type="radio" name="pass", value="1", v-model="passCount")
            dd: label(for="pass-1") 1枚
          dl(v-if="eventOptions.price_pass !== 0")
            dt: input#pass-2(type="radio" name="pass", value="2", v-model="passCount")
            dd: label(for="pass-2") 2枚

        .formWrapper.chairCount
          .lead 追加する椅子はありますか？
          dl
            dt: input#chair-0(type="radio" name="chair", value="0", v-model="chairCount")
            dd: label(for="chair-0") なし
          dl(v-if="eventOptions.price_chair !== 0")
            dt: input#chair-1(type="radio" name="chair", value="1", v-model="chairCount")
            dd: label(for="chair-1") 1脚
          dl(v-if="eventOptions.price_chair !== 0")
            dt: input#chair-2(type="radio" name="chair", value="2", v-model="chairCount")
            dd: label(for="chair-2") 2脚
        button.button(@click="confirmPayment") 内容の確認へ
      .price(v-else)
        p
          |サークル名は{{ circleName }}
          br
          |合計金額は{{ fee.total }}円です。
        .buttonWrapper
          button.button(@click="cancelPayment") 内容を修正する
          button.button(@click="checkout") 支払いを行う
        p
          |お支払い金額内訳
          br
          |参加費 {{ spaceCount }}SP: {{ fee.space }}円
          span(v-if="passCount !== '0'")
            br
            |追加サークル通行証 {{ passCount }}枚: {{ fee.pass }}円
          span(v-if="chairCount !== '0'")
            br
            |追加椅子 {{ chairCount }}脚: {{ fee.chair }}円

</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.STRIPE_KEY);

class Item {
  constructor (options) {
    return {
      price_data: {
        currency    : 'jpy',
        product_data: {
          name  : options.name,
          images: [options.image],
        },
        unit_amount: options.price,
      },
      quantity: options.quantity,
    };
  }
}
export default {
  data () {
    return {
      selectEvent: '',
      circleName : '',
      spaceCount : '1',
      passCount  : '0',
      chairCount : '0',
      confirmed  : false,
      events     : {
        'holokle-2nd': {
          name           : 'ホロクル 2nd',
          url            : 'https://holokle.info/',
          price_space_1sp: 5000,
          price_space_2sp: 10000,
          price_pass     : 500,
          price_chair    : 0,
          image          : 'https://i.imgur.com/EHyR2nP.png',
        },
        'vggc-1st': {
          name           : 'VGGC',
          url            : 'https://vggc.info/',
          price_space_1sp: 4000,
          price_space_2sp: 8000,
          price_pass     : 500,
          price_chair    : 0,
          image          : 'https://i.imgur.com/EHyR2nP.png',
        },
      },
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
      return this.events[this.eventID];
    },
    fee () {
      const space = this.eventOptions[`price_space_${this.spaceCount - 1}sp`];
      const pass = this.eventOptions.price_pass * this.passCount;
      const chair = this.eventOptions.price_chair * this.chairCount;
      return {
        total: space + pass + chair,
        space,
        pass,
        chair,
      };
    },
  },
  methods: {
    chooseEvent () {
      this.$router.push({
        path: `/payment/${this.selectEvent}`,
      });
    },
    confirmPayment () {
      this.confirmed = true;
    },
    cancelPayment () {
      this.confirmed = false;
    },
    async checkout () {
      const items = [];
      // item追加
      items.push(new Item({
        name    : `サークル参加費(${this.spaceCount}SP)`,
        image   : this.eventOptions.image,
        price   : this.fee.space,
        quantity: 1,
      }));
      // 通行証
      if (this.passCount !== '0') {
        // item追加
        items.push(new Item({
          name    : '追加通行証',
          image   : 'https://nilgiri-tea.net/img/pass.png',
          price   : this.eventOptions.price_pass,
          quantity: this.passCount,
        }));
      }
      // 追加椅子
      if (this.chairCount !== '0') {
        // item追加
        items.push(new Item({
          name    : '追加通行証',
          image   : 'https://nilgiri-tea.net/img/chair.png',
          price   : this.eventOptions.price_chair,
          quantity: this.chairCount,
        }));
      }

      const stripe = await stripePromise;
      const response = await this.$axios.post(
        '/api/checkout',
        { items: JSON.stringify(items) })
        .catch((err) => {
          throw new Error(err);
        });
      const session = await response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      }
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
