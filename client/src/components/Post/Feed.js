import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { postActions } from "../../actions/postActions";
import { Dimmer, Loader, Divider, Header, Icon } from "semantic-ui-react";

class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newposts: [],
      bool: false
    };
  }

  componentDidMount() {
    const { dispatch, posts } = this.props;
    if (!posts.length) {
      dispatch(postActions.fetchPosts({ initialFetch: true }));
    }
  }

  async componentDidUpdate() {
    if (this.state.bool === false) {
      let newposts = [];
      const { posts } = this.props;
      if (posts.length>0) {
        newposts = posts;
        for (let i = 0; i < posts.length; i++) {
          newposts[i].photourl = await this.downloadPostPicture(posts[i]);
        }
        this.setState({ ...this.state, bool: true, newposts: newposts })
      }
    }
  }

  fetchData = () => {
    const { dispatch, posts } = this.props;
    dispatch(
      postActions.fetchPosts({
        initialFetch: false,
        lastId: posts[posts.length - 1]._id,
      })
    );
  };

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
    const { loadingUser, posts, totalPosts } = this.props;
    const hasMore = posts.length === totalPosts ? false : true;
    const feedPosts = this.state.newposts.map((post) => (
      <Post key={post._id} post={{ ...post, feed: true }} />
    ));

    return loadingUser ? (
      <Dimmer active>
        <Loader />
      </Dimmer>
    ) : (
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={this.fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <Divider horizontal>
            <Header as="h4">
              <Icon name="eye" />
              Yay! You have seen it all
            </Header>
          </Divider>
        }
      >
        {feedPosts}
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  totalPosts: state.post.totalPosts,
  loadingUser: state.user.loadingUser,
});

export default connect(mapStateToProps)(Feed);
