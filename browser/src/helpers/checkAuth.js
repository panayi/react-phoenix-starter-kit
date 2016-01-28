const redirect = (value, props, path) => {
  const { goTo, isAuthenticated } = props
  if (isAuthenticated === value) {
    goTo(path)
  }
}

const redirectWhenAuthenticatedIs = value => path => Component =>
  class extends Component {
    componentWillMount() {
      redirect(value, this.props, path)
    }

    componentWillReceiveProps(nextProps) {
      redirect(value, nextProps, path)
    }
  }

export const needsUser = redirectWhenAuthenticatedIs(false)
export const needsVisitor = redirectWhenAuthenticatedIs(true)
