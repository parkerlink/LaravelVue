<script>
  export default {
    name: 'BaseTableColumn',
    props: {
      sortable: Boolean,
      label: String,
      align: String,
      prop: String,
      minWidth: [String, Number],
      maxWidth: [String, Number],
    },
    data() {
      return {
        sortDirection: '',
      }
    },
    inject: ['addColumn', 'removeColumn'],
    mounted() {
      this.addColumn(this);
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.removeColumn(this);
    },
    render(h) {
      return h(null)
    },
    methods: {
      toggleSort() {
        if (this.sortDirection === 'asc') {
          this.sortDirection = 'desc'
        } else if (this.sortDirection === 'desc') {
          this.sortDirection = ''
        } else {
          this.sortDirection = 'asc'
        }
      },
      parseStyleProperty(property) {
        let result = ''

        if (typeof property === 'number') {
          result = `${property}px`
        } else {
          result = property
        }
        return result
      },
      getStyles() {
        const styles = {}
        if (this.minWidth) {
          styles.minWidth = this.parseStyleProperty(this.minWidth)
        }
        if (this.maxWidth) {
          styles.maxWidth = this.parseStyleProperty(this.maxWidth)
        }
        return styles
      }
    }
  }
</script>
<style>
</style>
