<template lang="pug">
  .page-wrapper
    PageHeader
    .form
      h3 お支払い完了
      .headLead
        |お支払い手続きありがとうございました。
        br
        |準備会にて確認後、お支払い確認のご連絡をいたします。
      .headLead
        |一週間程度経ってもご連絡のない場合、
        br
        |お手数ではございますが、準備会へお問い合わせください。
      .headLead
        |また、サークルカットのご提出がお済みでない場合は、
        br
        |お早めの提出をお願いいたします。

</template>

<script>
export default {
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
  max-width: 900px;
}

h3 {
  font-size: 28px;
  text-align: center;
}
.headLead {
  margin-top: 1em;
  font-size: 16px;
  text-align: center;
  line-height: 2em;
}
</style>
