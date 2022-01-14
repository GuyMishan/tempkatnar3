import React, { Component } from "react";
import { connect } from "react-redux";
import { postActions } from "../actions/postActions";
import Post from "../components/Post/Post";
import Messages from "../components/Messages";

class PostPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newpost: undefined,
      bool: false
    };
  }

  componentDidMount = () => {
    const { match, dispatch } = this.props;
    dispatch(postActions.getPost(match.params.postId));
  };

  async componentDidUpdate() {
    if (this.state.bool === false) {
      let newpost;
      const { post } = this.props;
        newpost = post;
        newpost.photourl = await this.downloadPostPicture(post);
        this.setState({ ...this.state, bool: true, newpost: newpost })
    }
  }

  async downloadPostPicture(posts) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ posts }),
    };
    return fetch("/api/post/downloadPostPicture", requestOptions)
      .then(async (response) => {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      })
  }

  render() {
    const { alert } = this.props;
      // <Post key={post._id} post={{ ...post, feed: true }} />
    if (alert.type) {
      return (
        <div className="container">
          <Messages alert={alert} />
        </div>
      );
    } else {
      return (
        <div className="container">
        {this.state.bool===true&&this.state.newpost.fetching!==true?<Post post={this.state.newpost} />:null}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  post: state.post.post,
  loadingUser: state.user.loadingUser,
  alert: state.alert
});

const connectedHomePage = connect(mapStateToProps)(PostPage);
export { connectedHomePage as default };
