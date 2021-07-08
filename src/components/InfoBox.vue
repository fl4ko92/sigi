<template>
  <v-row>
    <v-col
      v-for="(stat, index) in stats"
      :key="index"
      md="4"
      sm="6"
      cols="12"
    >
      <v-card
        :class="stat.bgColor"
        dark
        elevation="4"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon
              :class="[stat.iconClass]"
              v-text="stat.icon"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="stat.title" />
            <br>
            <v-list-item-title>
              <b v-text="stat.data" />
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action v-if="more">
            <v-btn icon>
              <v-icon color="grey lighten-3">
                mdi-information
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'InfoBox',
    props: {
      stats: {
        type: Array,
        default: () => [],
      },
      more: {
        type: Boolean,
        default: false,
      },
    },

  }
</script>
