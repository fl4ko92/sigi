<template>
  <base-section id="404">
    <base-heading title="404" />

    <base-subheading
      class="primary--text"
      title="Oh! Página no encontrada"
    />

    <base-img
      :src="require('@/assets/icon.png')"
      class="mx-auto"
      contain
      height="350"
      width="250"
    />

    <div class="text-center">
      <router-link :to="{name: 'Control'}">
        <base-btn>
          Sácame de aquí
        </base-btn>
      </router-link>
    </div>
  </base-section>
</template>

<script>
  export default {
    name: 'FourOhFour',

    provide: {
      heading: { align: 'center' },
    },
  }
</script>
