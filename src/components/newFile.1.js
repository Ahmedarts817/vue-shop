/* __placeholder__ */
export default (await import("vue")).defineComponent({
  name: "ErrorView",
  data() {
    return {
      error: null,
    };
  },
  methods: {
    close() {
      this.error = null;
    },
  },
});
