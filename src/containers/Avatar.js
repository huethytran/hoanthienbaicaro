import { connect } from 'react-redux';
import Avatar from '../components/Avatar';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  loading: state.avatar.loading,
  imageUrl: state.user.imageUrl
});
const mapDispatchToProps = dispatch => {
  return {
    switchLoading: () => {
      dispatch(actions.switchLoading());
    },
    setImageUrl: data => {
      dispatch(actions.beforeSetImageUrl(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
