import { MapDispatchToPropsParam, connect as ConnectRedux } from 'react-redux'

function connect<TDispatchProps = {}, TOwnProps = any>(
  mapStateToProps?: ( ownProps?: TOwnProps) => any,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): any {
  return ConnectRedux(mapStateToProps, mapDispatchToProps)
}

export { connect }