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
      <base-btn :to="{ name: 'Home' }">
        Sácame de aquí
      </base-btn>
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
