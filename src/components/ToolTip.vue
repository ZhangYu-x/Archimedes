<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon class="ml-1" color="grey" small v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
    </template>
    <div class="d-flex flex-column">
      <slot></slot>
    </div>
  </v-tooltip>
</template>

<script>
export default {
  name: "ToolTip",
}
</script>

<style>
 .v-application .v-tooltip__content {
  background: #41e1ad !important;
}
</style>