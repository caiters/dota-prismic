const routes = [
  { path: "/", component: guildWrapper, props: (route) => ({ rank: route.query.rank || '' }) }
];

const router = new VueRouter({
  routes: routes
});

const app = new Vue({
  el: '#dotaRoster',
  router,
  store,
  mounted: () => store.dispatch("load"),
  computed: {
  },
  methods: {
  },
}).$mount('#dotaRoster');
