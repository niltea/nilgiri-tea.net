<template lang="pug">
  .page-wrapper.privacy
    PageHeader
    nuxt-content(:document="page")
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('sctl').fetch();
    return {
      page,
    };
  },
  head () {
    return {
      title: '特定商取引法に基づく表記',
      meta : [
        { hid: 'og:description', property: 'og:description', content: 'Nilgiri Tea のプライバシーポリシーです' },
      ],
    };
  },
};
</script>

<style lang="scss">
.privacy .nuxt-content {
  h3 {
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 15px;
    &:first-child {
      margin-top: 0;
    }
  }
  ul {
    margin-top: 10px;
    li {
      list-style: circle inside;
      font-size: 12px;
      a {
        margin: 0;
      }
      +li {
        margin-top: 0.5em;
      }
    }
    + p {
      margin-top: 20px;
    }
  }
}
</style>
